import { useState, useEffect } from 'react';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}

/**
 * A custom hook to get the user's current geolocation
 */
export function useGeolocation(): GeolocationState {
  const [location, setLocation] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({
        ...location,
        error: 'Geolocation is not supported by your browser',
        loading: false,
      });
      return;
    }

    const successHandler = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
        loading: false,
      });
    };

    const errorHandler = (error: GeolocationPositionError) => {
      setLocation({
        latitude: null,
        longitude: null,
        error: error.message,
        loading: false,
      });
    };

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
    });

    // Clean up function
    return () => {
      // No cleanup needed for geolocation
    };
  }, []);

  return location;
}
