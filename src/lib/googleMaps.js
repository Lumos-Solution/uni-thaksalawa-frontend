/*
 * Loads the Google Maps JavaScript API once per page and hands back the
 * `google.maps` namespace. The key lives in the environment so it is never
 * committed - see .env.example.
 *
 * Only the core Maps API and its Geocoder are used (no Places library), so the
 * key needs just "Maps JavaScript API" and "Geocoding API" enabled.
 */
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

/** True when a key has been configured; the UI degrades gracefully without one. */
export const isMapsConfigured = () => Boolean(API_KEY);

let loadPromise = null;

export const loadGoogleMaps = () => {
    if (!API_KEY) {
        return Promise.reject(new Error('VITE_GOOGLE_MAPS_API_KEY is not set.'));
    }
    if (window.google?.maps) {
        return Promise.resolve(window.google.maps);
    }
    if (loadPromise) {
        return loadPromise;
    }

    loadPromise = new Promise((resolve, reject) => {
        const callbackName = '__uniThaksalawaMapsReady';
        window[callbackName] = () => {
            delete window[callbackName];
            resolve(window.google.maps);
        };

        const script = document.createElement('script');
        script.src =
            `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(API_KEY)}` +
            `&loading=async&callback=${callbackName}`;
        script.async = true;
        script.onerror = () => {
            loadPromise = null;
            delete window[callbackName];
            reject(new Error('Failed to load Google Maps. Check the API key and its restrictions.'));
        };
        document.head.appendChild(script);
    });

    return loadPromise;
};

/*
 * Picks the most town-like component out of a Google geocoder result.
 * In Sri Lanka `locality` is usually the town; the others are fallbacks for
 * rural spots where no locality is returned.
 */
export const extractTown = (result) => {
    if (!result) return '';
    const byType = (type) =>
        result.address_components?.find((c) => c.types.includes(type))?.long_name;

    return (
        byType('locality') ||
        byType('sublocality') ||
        byType('administrative_area_level_3') ||
        byType('administrative_area_level_2') ||
        result.formatted_address ||
        ''
    );
};
