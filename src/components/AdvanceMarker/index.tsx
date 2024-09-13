import { MarkerProps, Marker, useMarkerRef } from '@vis.gl/react-google-maps';

const AdvancedMarkerWithRef = (
  props: MarkerProps & {
    onMouseEnter: (marker: google.maps.Marker) => void;
  },
) => {
  const { onMouseEnter, ...advancedMarkerProps } = props;
  const [markerRef, marker] = useMarkerRef();

  return (
    <Marker
      ref={markerRef}
      onMouseOver={() => {
        if (marker) {
          onMouseEnter(marker);
        }
      }}
      {...advancedMarkerProps}
    />
  );
};

export default AdvancedMarkerWithRef;
