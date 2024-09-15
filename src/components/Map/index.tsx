import {
  AdvancedMarker,
  APIProvider,
  ControlPosition,
  InfoWindow,
  MapControl,
  Pin,
  Map as ReactMap,
} from '@vis.gl/react-google-maps';
import React, { useCallback, useState } from 'react';
import './index.css';
import { MapProps, Markers } from '@components/Map/types';
import MarkerWithRef from '@components/Marker';
import PlaceAutocomplete from '@components/PlaceAutoComplete';
import { Flex } from 'antd';
import Center from '@components/Center';
import Zoom from '@components/Zoom';
import Reset from '@components/Reset';
import Slider from '@components/Slider';

const MAP_ID = process.env.REACT_APP_MAP_ID ?? 'test1234';

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
  setSelectedPlace,
  handleResetCenter,
  drivers,
  onChange,
  selectedCenter,
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
        <AdvancedMarker position={selectedCenter}>
          <Pin
            background={'#22ccff'}
            borderColor={'#1e89a1'}
            glyphColor={'#0f677a'}
          />
        </AdvancedMarker>
        {markers && markers.length > 0 ? (
          <>
            {markers.map((marker: Markers) => {
              return (
                <div key={marker.driver_id}>
                  <MarkerWithRef
                    position={{
                      lat: marker.location.latitude,
                      lng: marker.location.longitude,
                    }}
                    onMouseEnter={(markerRef: google.maps.Marker) =>
                      onMouseEnter(marker.driver_id, markerRef)
                    }
                    onMouseOut={onMouseLeave}
                  />
                  {hoverId === marker.driver_id ? (
                    <InfoWindow anchor={selectedMarker}>
                      <h2>Driver: {marker.driver_id}</h2>
                      <h3>Bearing: {marker.location.bearing}</h3>
                    </InfoWindow>
                  ) : null}
                </div>
              );
            })}
          </>
        ) : null}
        <MapControl position={ControlPosition.RIGHT_BOTTOM}>
          <Flex align="flex-start" vertical gap="large">
            <Center handleDefaultCenter={handleDefaultCenter} />
            <Zoom handleZoomIn={handleZoomIn} handleZoomOut={handleZoomOut} />
          </Flex>
        </MapControl>
        <MapControl position={ControlPosition.TOP_CENTER}>
          <div className="autocomplete-control">
            <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
          </div>
        </MapControl>
        <MapControl position={ControlPosition.RIGHT_TOP}>
          <Reset handleResetCenter={handleResetCenter} />
        </MapControl>
        <MapControl position={ControlPosition.BOTTOM_CENTER}>
          <Slider drivers={drivers} onChange={onChange} />
        </MapControl>
      </ReactMap>
    </APIProvider>
  );
};

export default Map;
