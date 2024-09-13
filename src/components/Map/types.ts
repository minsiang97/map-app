export interface MapProps {
  defaultCoordinates: Coordinates;
  markers?: Coordinates[];
}

export interface Coordinates {
  lat: number;
  lng: number;
}
