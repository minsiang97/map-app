import { CenterProps } from '@components/Center/types';
import { ResetProps } from '@components/Reset/types';
import { SliderProps } from '@components/Slider/types';
import { ZoomProps } from '@components/Zoom/types';

export interface MapProps
  extends ZoomProps,
    CenterProps,
    ResetProps,
    SliderProps {
  markers?: Markers[];
  apiKey: string;
  zoom: number;
  onZoomChanged: (value: number) => void;
  onCenterChanged: (value: Coordinates) => void;
  center: Coordinates;
  setSelectedPlace: (value: google.maps.places.PlaceResult | null) => void;
  selectedCenter: Coordinates;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Markers {
  driver_id: string;
  location: Location;
}

export interface Location {
  bearing: number;
  latitude: number;
  longitude: number;
}
