import React, { useEffect } from 'react';
import type { Coordinates } from '../types';

interface LocationHandlerProps {
  onLocationSuccess: (coords: Coordinates) => void;
  onLocationError: (message: string) => void;
}

export const LocationHandler: React.FC<LocationHandlerProps> = ({ onLocationSuccess, onLocationError }) => {
  useEffect(() => {
    if (!navigator.geolocation) {
      onLocationError('Geolocation is not supported by your browser.');
      return;
    }

    const successCallback = (position: GeolocationPosition) => {
      onLocationSuccess({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };

    const errorCallback = (error: GeolocationPositionError) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          onLocationError('Location access was denied. Please enable it in your browser settings to use this feature.');
          break;
        case error.POSITION_UNAVAILABLE:
          onLocationError('Location information is unavailable.');
          break;
        case error.TIMEOUT:
          onLocationError('The request to get user location timed out.');
          break;
        default:
          onLocationError('An unknown error occurred while trying to get your location.');
          break;
      }
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null; // This component does not render anything
};
