import { Col, InputNumberProps, Row, Slider } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import './index.css';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { Coordinates, Markers } from '@components/Map/types';
import { useDebounce } from '@hooks/useDebounce';
import Map from '@components/Map';

const Home: React.FC = () => {
  const defaultCoordinates: Coordinates = useMemo(() => {
    return { lng: 127.11, lat: 37.394 };
  }, []);
  const maxZoom = 22;
  const minZoom = 0;
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
    setDrivers(newValue as number);
  };

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const CORS_URL = process.env.REACT_APP_CORS_URL;
  const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY ?? '';

  const getDrivers = async () => {
    try {
      const params = {
        latitude: selectedCenter.lat,
        longitude: selectedCenter.lng,
        count: drivers,
      };
      const response = await axios.get(`${CORS_URL}/${BASE_URL}/drivers`, {
        params,
      });
      console.log(response);
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
        } else {
          toast.error(error.message);
        }
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Internal server error, please try again');
      }
    }
  };

  const debouncedGetDrivers = useDebounce(getDrivers, 300);

  useEffect(() => {
    debouncedGetDrivers();
  }, [drivers, selectedCenter]);

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

  const handleDefaultCenter = () => {
    setCenter(selectedCenter);
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
          />
        </Col>
        <Col xs={24} lg={12}>
          <div className="slider-container">
            <Slider defaultValue={1} onChange={onChange} min={1} max={50} />
            <h3>Driver's count: {drivers}</h3>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
