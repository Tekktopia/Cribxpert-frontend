// hooks/useGeolocation.ts
import { useState, useEffect } from 'react';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}


export function useGeolocation(enabled: boolean): GeolocationState { // Add 'enabled' parameter
  const [location, setLocation] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: false, // Set initial loading to false, it will be true when enabled
  });

  useEffect(() => {
    if (!enabled) { // Only proceed if 'enabled' is true
      setLocation({
        latitude: null,
        longitude: null,
        error: null,
        loading: false,
      });
      return;
    }

    // When enabled, start loading
    setLocation((prev) => ({ ...prev, loading: true, error: null }));

    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        error: 'Geolocation is not supported by your browser',
        loading: false,
      }));
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

    // Use getCurrentPosition as it's a one-time request, suitable for a button click
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
    });

    // No specific cleanup needed for getCurrentPosition itself, as it's not watching.
    // If you were using watchPosition, you'd clear the watch here.
    return () => {};
  }, [enabled]); // Re-run effect only when 'enabled' changes

  return location;
}