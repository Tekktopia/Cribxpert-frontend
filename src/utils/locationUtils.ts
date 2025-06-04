// Location data with coordinates for Nigerian cities
export interface LocationOption {
  value: string;
  label: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  isNearby?: boolean;
}

// More comprehensive list of Nigerian locations with coordinates
export const nigerianLocations: LocationOption[] = [
  {
    value: 'lagos',
    label: 'Lagos',
    coordinates: { latitude: 6.5244, longitude: 3.3792 },
  },
  {
    value: 'abuja',
    label: 'Abuja',
    coordinates: { latitude: 9.0765, longitude: 7.3986 },
  },
  {
    value: 'portHarcourt',
    label: 'Port Harcourt',
    coordinates: { latitude: 4.8156, longitude: 7.0498 },
  },
  {
    value: 'ibadan',
    label: 'Ibadan',
    coordinates: { latitude: 7.3775, longitude: 3.947 },
  },
  {
    value: 'kano',
    label: 'Kano',
    coordinates: { latitude: 12.0022, longitude: 8.592 },
  },
  {
    value: 'calabar',
    label: 'Calabar',
    coordinates: { latitude: 4.9757, longitude: 8.3417 },
  },
  {
    value: 'warri',
    label: 'Warri',
    coordinates: { latitude: 5.5377, longitude: 5.7493 },
  },
  {
    value: 'enugu',
    label: 'Enugu',
    coordinates: { latitude: 6.4584, longitude: 7.5464 },
  },
  {
    value: 'benin',
    label: 'Benin City',
    coordinates: { latitude: 6.335, longitude: 5.6037 },
  },
  {
    value: 'owerri',
    label: 'Owerri',
    coordinates: { latitude: 5.4827, longitude: 7.035 },
  },
  {
    value: 'uyo',
    label: 'Uyo',
    coordinates: { latitude: 5.0383, longitude: 7.9375 },
  },
  {
    value: 'asaba',
    label: 'Asaba',
    coordinates: { latitude: 6.2003, longitude: 6.7275 },
  },
  {
    value: 'abeokuta',
    label: 'Abeokuta',
    coordinates: { latitude: 7.1475, longitude: 3.3619 },
  },
  {
    value: 'kaduna',
    label: 'Kaduna',
    coordinates: { latitude: 10.5222, longitude: 7.4383 },
  },
  {
    value: 'akure',
    label: 'Akure',
    coordinates: { latitude: 7.2526, longitude: 5.1931 },
  },
  {
    value: 'ilorin',
    label: 'Ilorin',
    coordinates: { latitude: 8.4966, longitude: 4.5469 },
  },
  {
    value: 'jos',
    label: 'Jos',
    coordinates: { latitude: 9.8965, longitude: 8.8583 },
  },
  {
    value: 'aba',
    label: 'Aba',
    coordinates: { latitude: 5.1167, longitude: 7.3667 },
  },
  {
    value: 'onitsha',
    label: 'Onitsha',
    coordinates: { latitude: 6.1667, longitude: 6.7833 },
  },
  {
    value: 'minna',
    label: 'Minna',
    coordinates: { latitude: 9.6139, longitude: 6.5569 },
  },
];

/**
 * Calculate distance between two geographical coordinates using the Haversine formula
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

/**
 * Convert degrees to radians
 */
function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Get nearby locations based on user's current position
 */
export function getNearbyLocations(
  userLatitude: number,
  userLongitude: number,
  count: number = 10
): LocationOption[] {
  // Calculate distance from user to each location
  const locationsWithDistance = nigerianLocations.map((location) => {
    if (!location.coordinates) return { ...location, distance: Infinity };

    const distance = calculateDistance(
      userLatitude,
      userLongitude,
      location.coordinates.latitude,
      location.coordinates.longitude
    );
    return { ...location, distance };
  });

  // Sort by distance and take the closest locations
  return (
    locationsWithDistance
      .sort(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (a: any, b: any) => (a.distance || Infinity) - (b.distance || Infinity)
      )
      .slice(0, count)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((location: any, index: number) => ({
        value: location.value,
        label: location.label + (index < 3 ? ' (Nearby)' : ''),
        isNearby: index < 3,
      }))
  );
}
