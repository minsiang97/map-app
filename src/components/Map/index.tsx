import { APIProvider, Map as ReactMap } from '@vis.gl/react-google-maps';
import React from 'react';
import { MapProps } from './types';

const Map: React.FC<MapProps> = ({ defaultCoordinates }) => {
  const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY ?? '';

  return (
    <APIProvider apiKey={API_KEY}>
      <ReactMap
        style={{ width: '100vw', height: '100vh' }}
        defaultCenter={defaultCoordinates}
        defaultZoom={15}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      />
    </APIProvider>
  );
};

export default Map;
