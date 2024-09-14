import {
  APIProvider,
  ControlPosition,
  InfoWindow,
  MapControl,
  Map as ReactMap,
} from '@vis.gl/react-google-maps';
import React, { useCallback, useState } from 'react';
import './index.css';
import { MapProps, Markers } from '@components/Map/types';
import AdvancedMarkerWithRef from '@components/AdvanceMarker';
import CustomMapControl from '@components/MapControl';

const Map: React.FC<MapProps> = ({
  markers,
  apiKey,
  zoom,
  handleZoomIn,
  handleZoomOut,
  onZoomChanged,
  onCenterChanged,
  center,
  handleDefaultCenter,
}) => {
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [selectedMarker, setSelectedMarker] =
    useState<google.maps.Marker | null>(null);

  const onMouseEnter = useCallback(
    (id: string | null, marker: google.maps.Marker) => {
      setSelectedMarker(marker);
      setHoverId(id);
    },
    [],
  );
  const onMouseLeave = useCallback(() => setHoverId(null), []);

  const Z_INDEX_HOVER = (markers?.length ?? 1) + 1;
  const MAP_ID = process.env.REACT_APP_MAP_ID ?? 'test1234';

  return (
    <APIProvider apiKey={apiKey}>
      <ReactMap
        className="map"
        center={center}
        zoom={zoom}
        mapId={MAP_ID}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        clickableIcons={false}
        onZoomChanged={(ev) => onZoomChanged(ev.detail.zoom)}
        onCenterChanged={(ev) => onCenterChanged(ev.detail.center)}
      >
        {markers && markers.length > 0 ? (
          <>
            {markers.map((marker: Markers) => {
              let zIndex = 1;
              if (hoverId === marker.driver_id) {
                zIndex = Z_INDEX_HOVER;
              }

              return (
                <>
                  <AdvancedMarkerWithRef
                    key={marker.driver_id}
                    position={{
                      lat: marker.location.latitude,
                      lng: marker.location.longitude,
                    }}
                    zIndex={zIndex}
                    onMouseEnter={(markerRef: google.maps.Marker) =>
                      onMouseEnter(marker.driver_id, markerRef)
                    }
                    onMouseOut={onMouseLeave}
                  ></AdvancedMarkerWithRef>
                  {hoverId === marker.driver_id ? (
                    <InfoWindow anchor={selectedMarker}>
                      <h2>Driver: {marker.driver_id}</h2>
                      <h3>Bearing: {marker.location.bearing}</h3>
                    </InfoWindow>
                  ) : null}
                </>
              );
            })}
          </>
        ) : null}
        <MapControl position={ControlPosition.RIGHT_BOTTOM}>
          <CustomMapControl
            handleZoomIn={handleZoomIn}
            handleZoomOut={handleZoomOut}
            handleDefaultCenter={handleDefaultCenter}
          />
        </MapControl>
      </ReactMap>
    </APIProvider>
  );
};

export default Map;
