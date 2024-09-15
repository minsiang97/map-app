import { Col, InputNumberProps, Row } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import './index.css';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { Coordinates, Markers } from '@components/Map/types';
import { useDebounce } from '@hooks/useDebounce';
import Map from '@components/Map';

const maxZoom = 22;
const minZoom = 0;
const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY ?? '';

const Home: React.FC = () => {
  const defaultCoordinates: Coordinates = useMemo(() => {
    return { lng: 127.11, lat: 37.394 };
  }, []);
  const [drivers, setDrivers] = useState<number>(1);
  const [markers, setMarkers] = useState<Markers[]>([]);
  const [zoom, setZoom] = useState<number>(15);
  const [center, setCenter] = useState<Coordinates>(defaultCoordinates);
  // Center to display drivers around
  const [selectedCenter, setSelectedCenter] =
    useState<Coordinates>(defaultCoordinates);
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  const onChange: InputNumberProps['onChange'] = (newValue) => {
    if (typeof newValue !== 'number') {
      setDrivers(1);
    } else {
      if (newValue < 1) {
        setDrivers(1);
      } else if (newValue > 50) {
        setDrivers(50);
      } else {
        setDrivers(newValue as number);
      }
    }
  };

  const getDrivers = useCallback(async () => {
    try {
      const params = {
        latitude: selectedCenter.lat,
        longitude: selectedCenter.lng,
        count: drivers,
      };

      const response = await axios.get('/drivers', {
        params,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });

      if (response.status === 200) {
        const data = response.data;
        if (data.drivers && data.drivers.length > 0) {
          setMarkers(data.drivers);
        } else {
          setMarkers([]);
          toast.error('No drivers available nearby');
        }
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error?.response?.data.message) {
          toast.error(error.response.data.message);
        } else if (error?.response?.statusText) {
          toast.error(error?.response?.statusText);
        } else {
          toast.error(error.message);
        }
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Internal server error, please try again');
      }
    }
  }, [drivers, selectedCenter.lat, selectedCenter.lng]);

  const debouncedGetDrivers = useDebounce(getDrivers, 300);

  useEffect(() => {
    debouncedGetDrivers();
  }, [drivers, selectedCenter, debouncedGetDrivers]);

  useEffect(() => {
    if (selectedPlace && selectedPlace.geometry?.location) {
      const lat = selectedPlace.geometry?.location?.lat();
      const lng = selectedPlace.geometry?.location?.lng();
      onCenterChanged({ lat, lng });
      onSelectedCenterChanged({ lat, lng });
    }
  }, [selectedPlace]);

  const handleZoomIn = () => {
    if (zoom < maxZoom) {
      setZoom(zoom + 1);
    }
  };
  const handleZoomOut = () => {
    if (zoom > minZoom) {
      setZoom(zoom - 1);
    }
  };

  const onZoomChanged = (value: number) => setZoom(value);

  const onCenterChanged = (value: Coordinates) => setCenter(value);
  const onSelectedCenterChanged = (value: Coordinates) =>
    setSelectedCenter(value);

  const handleDefaultCenter = () => setCenter(selectedCenter);

  const handleResetCenter = () => {
    setCenter(defaultCoordinates);
    setSelectedCenter(defaultCoordinates);
  };

  return (
    <div className="container">
      <Row gutter={[16, 30]} justify={'center'}>
        <Col xs={24}>
          <Map
            markers={markers}
            apiKey={API_KEY}
            zoom={zoom}
            handleZoomIn={handleZoomIn}
            handleZoomOut={handleZoomOut}
            onZoomChanged={onZoomChanged}
            onCenterChanged={onCenterChanged}
            center={center}
            handleDefaultCenter={handleDefaultCenter}
            setSelectedPlace={setSelectedPlace}
            handleResetCenter={handleResetCenter}
            drivers={drivers}
            onChange={onChange}
            selectedCenter={selectedCenter}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
