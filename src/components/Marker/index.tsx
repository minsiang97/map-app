import { MarkerProps, Marker, useMarkerRef } from '@vis.gl/react-google-maps';

const MarkerWithRef = (
  props: MarkerProps & {
    onMouseEnter?: (marker: google.maps.Marker) => void;
  },
) => {
  const { onMouseEnter, ...markerProps } = props;
  const [markerRef, marker] = useMarkerRef();

  return (
    <Marker
      ref={markerRef}
      onMouseOver={() => {
        if (marker && onMouseEnter) {
          onMouseEnter(marker);
        }
      }}
      {...markerProps}
    />
  );
};

export default MarkerWithRef;
