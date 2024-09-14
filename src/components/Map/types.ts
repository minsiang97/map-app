import { CustomMapControlProps } from '@components/MapControl/types';

export interface MapProps extends CustomMapControlProps {
  markers?: Markers[];
  apiKey: string;
  zoom: number;
  onZoomChanged: (value: number) => void;
  onCenterChanged: (value: Coordinates) => void;
  center: Coordinates;
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
