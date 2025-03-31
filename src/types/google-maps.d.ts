
// Google Maps Type Definitions
declare interface Window {
  initMap: () => void;
  google: any;
}

declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element, options?: MapOptions);
      setCenter(latLng: LatLng | LatLngLiteral): void;
      setZoom(zoom: number): void;
      addListener(eventName: string, handler: Function): MapsEventListener;
      getZoom(): number;
    }
    
    class Marker {
      constructor(opts?: MarkerOptions);
      setPosition(latLng: LatLng | LatLngLiteral): void;
      setMap(map: Map | null): void;
    }
    
    class LatLng {
      constructor(lat: number, lng: number, noWrap?: boolean);
      lat(): number;
      lng(): number;
    }
    
    interface LatLngLiteral {
      lat: number;
      lng: number;
    }
    
    interface MapOptions {
      center?: LatLng | LatLngLiteral;
      zoom?: number;
      disableDefaultUI?: boolean;
      mapTypeControl?: boolean;
      fullscreenControl?: boolean;
      styles?: any[];
    }
    
    interface MarkerOptions {
      position?: LatLng | LatLngLiteral;
      map?: Map | null;
      title?: string;
      icon?: string;
      animation?: Animation;
    }
    
    interface MapMouseEvent {
      latLng?: LatLng;
    }
    
    interface MapsEventListener {
      remove(): void;
    }
    
    enum Animation {
      BOUNCE = 1,
      DROP = 2,
    }
  }
}
