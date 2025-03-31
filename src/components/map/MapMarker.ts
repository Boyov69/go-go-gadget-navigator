
import { useState, useEffect } from 'react';

export interface MarkerProps {
  position: { lat: number; lng: number };
  icon?: string;
  title?: string;
  animation?: google.maps.Animation;
}

export const useMapMarkers = (
  map: google.maps.Map | null,
  markers: MarkerProps[] = []
) => {
  const [mapMarkers, setMapMarkers] = useState<google.maps.Marker[]>([]);

  useEffect(() => {
    if (!map || !window.google) return;
    
    // Clear previous markers
    mapMarkers.forEach(marker => marker.setMap(null));
    
    // Add new markers
    const newMapMarkers = markers.map(marker => {
      return new window.google.maps.Marker({
        position: marker.position,
        map,
        title: marker.title,
        icon: marker.icon,
        animation: marker.animation
      });
    });
    
    setMapMarkers(newMapMarkers);
    
    // Cleanup markers when component unmounts
    return () => {
      newMapMarkers.forEach(marker => marker.setMap(null));
    };
  }, [map, markers]);

  return { mapMarkers };
};

export const useMovingMarker = (
  map: google.maps.Map | null,
  movingMarker?: MarkerProps
) => {
  const [movingMapMarker, setMovingMapMarker] = useState<google.maps.Marker | null>(null);

  useEffect(() => {
    if (!map || !movingMarker || !window.google) return;
    
    if (movingMapMarker) {
      movingMapMarker.setPosition(movingMarker.position);
    } else {
      const newMarker = new window.google.maps.Marker({
        position: movingMarker.position,
        map,
        title: movingMarker.title,
        icon: movingMarker.icon,
        animation: window.google.maps.Animation.DROP
      });
      setMovingMapMarker(newMarker);
    }
    
    return () => {
      if (movingMapMarker) {
        movingMapMarker.setMap(null);
      }
    };
  }, [map, movingMarker]);

  return { movingMapMarker };
};
