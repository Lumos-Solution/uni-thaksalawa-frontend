import { useEffect, useRef, useState } from "react";
import { extractTown, isMapsConfigured, loadGoogleMaps } from "../lib/googleMaps";

// Centre of Sri Lanka, so the map opens on the whole island.
const SRI_LANKA_CENTER = { lat: 7.8731, lng: 80.7718 };
const COUNTRY = "LK";

/**
 * Lets a teacher choose where a physical class is held, either by dropping a pin
 * on the map (preferred) or by typing a town name as a fallback.
 *
 * Calls onChange({ location, coordinates }) - `coordinates` is null when the
 * town was typed by hand rather than picked on the map.
 */
function LocationPicker({ location, coordinates, onChange }) {
    const mapNode = useRef(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const geocoderRef = useRef(null);

    const [status, setStatus] = useState("loading");
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    // Drops/moves the pin and reports the town back to the form.
    const placePin = (position, town) => {
        if (markerRef.current) {
            markerRef.current.setPosition(position);
        }
        mapRef.current?.panTo(position);
        onChange({
            location: town,
            coordinates: { lat: position.lat, lng: position.lng },
        });
    };

    const reverseGeocode = (position) => {
        geocoderRef.current?.geocode({ location: position }, (results, geocodeStatus) => {
            const town = geocodeStatus === "OK" ? extractTown(results[0]) : "";
            placePin(position, town);
            if (!town) {
                setError("Could not name that spot - type the town below.");
            } else {
                setError("");
            }
        });
    };

    useEffect(() => {
        if (!isMapsConfigured()) {
            setStatus("unconfigured");
            return;
        }

        let cancelled = false;

        loadGoogleMaps()
            .then((maps) => {
                if (cancelled || !mapNode.current) return;

                const start = coordinates ?? SRI_LANKA_CENTER;
                const map = new maps.Map(mapNode.current, {
                    center: start,
                    zoom: coordinates ? 14 : 7,
                    mapTypeControl: false,
                    streetViewControl: false,
                });

                const marker = new maps.Marker({
                    map,
                    position: start,
                    draggable: true,
                    visible: Boolean(coordinates),
                });

                mapRef.current = map;
                markerRef.current = marker;
                geocoderRef.current = new maps.Geocoder();

                map.addListener("click", (e) => {
                    marker.setVisible(true);
                    reverseGeocode({ lat: e.latLng.lat(), lng: e.latLng.lng() });
                });

                marker.addListener("dragend", (e) => {
                    reverseGeocode({ lat: e.latLng.lat(), lng: e.latLng.lng() });
                });

                setStatus("ready");
            })
            .catch((err) => {
                if (cancelled) return;
                setStatus("error");
                setError(err.message);
            });

        return () => {
            cancelled = true;
        };
        // Set up the map once; later prop changes are driven through the map itself.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Forward geocoding for the search box - no Places library needed.
    const runSearch = () => {
        const query = search.trim();
        if (!query || !geocoderRef.current) return;

        geocoderRef.current.geocode(
            { address: query, componentRestrictions: { country: COUNTRY } },
            (results, geocodeStatus) => {
                if (geocodeStatus !== "OK" || !results.length) {
                    setError(`No place in Sri Lanka matched "${query}".`);
                    return;
                }
                setError("");
                const found = results[0];
                markerRef.current?.setVisible(true);
                mapRef.current?.setZoom(14);
                placePin(
                    { lat: found.geometry.location.lat(), lng: found.geometry.location.lng() },
                    extractTown(found)
                );
            }
        );
    };

    return (
        <div className="w-full">
            {status === "unconfigured" && (
                <p className="mb-2 rounded border border-amber-300 bg-amber-50 p-2 text-sm text-amber-800">
                    Map picker is off: set <code>VITE_GOOGLE_MAPS_API_KEY</code> in the
                    frontend <code>.env</code> and restart the dev server. You can still
                    type a town below.
                </p>
            )}

            {status !== "unconfigured" && (
                <div className="mb-2 flex gap-2">
                    <input
                        type="text"
                        placeholder="Search a place in Sri Lanka..."
                        className="w-full rounded border p-2"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        // The picker sits inside a form; Enter must search, not submit.
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                runSearch();
                            }
                        }}
                    />
                    <button
                        type="button"
                        onClick={runSearch}
                        className="rounded bg-blue-500 px-3 py-2 text-white hover:bg-blue-600"
                    >
                        Find
                    </button>
                </div>
            )}

            {status !== "unconfigured" && (
                <div
                    ref={mapNode}
                    className="h-56 w-full rounded border bg-gray-100"
                    aria-label="Click the map to set the class location"
                />
            )}

            {status === "loading" && (
                <p className="mt-1 text-sm text-gray-500">Loading map...</p>
            )}

            <label className="mt-2 block text-sm text-gray-600">
                Town
                <input
                    type="text"
                    placeholder="e.g. Matara"
                    className="mt-1 w-full rounded border p-2"
                    value={location}
                    // Typing by hand clears the pin: the text no longer describes it.
                    onChange={(e) => onChange({ location: e.target.value, coordinates: null })}
                />
            </label>

            {coordinates && (
                <p className="mt-1 text-xs text-gray-500">
                    Pinned at {coordinates.lat.toFixed(5)}, {coordinates.lng.toFixed(5)}
                </p>
            )}

            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}

export default LocationPicker;
