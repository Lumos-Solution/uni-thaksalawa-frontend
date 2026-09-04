const EARTH_RADIUS_KM = 6371;

const toRadians = (degrees) => (degrees * Math.PI) / 180;

/**
 * Great-circle distance between two map pins, in kilometres.
 *
 * Sri Lanka is small enough that the haversine formula is well within the
 * accuracy a "classes near me" search needs, and it costs nothing to run in the
 * browser for every class in the list.
 */
export function distanceInKm(from, to) {
  if (!from || !to) return null;

  const dLat = toRadians(to.lat - from.lat);
  const dLng = toRadians(to.lng - from.lng);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(from.lat)) * Math.cos(toRadians(to.lat)) * Math.sin(dLng / 2) ** 2;

  return EARTH_RADIUS_KM * 2 * Math.asin(Math.sqrt(a));
}

/** Radius options offered on the tutor search, in kilometres. */
export const DISTANCE_OPTIONS = [5, 10, 25, 50, 100];

/** Students most often want a class they can reach easily, so start small. */
export const DEFAULT_DISTANCE_KM = 5;
