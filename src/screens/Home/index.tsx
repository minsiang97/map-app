import { Col, InputNumberProps, Row, Slider } from 'antd';
import Map from '../../components/Map';
import { useEffect, useMemo, useState } from 'react';
import { Coordinates, Markers } from '../../components/Map/types';
import './index.css';
import axios from 'axios';
import { useDebounce } from '../../hooks/useDebounce';

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

  const onChange: InputNumberProps['onChange'] = (newValue) => {
    setDrivers(newValue as number);
  };

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const CORS_URL = process.env.REACT_APP_CORS_URL;
  const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

  const getDrivers = async () => {
    try {
      const params = {
        latitude: defaultCoordinates.lat,
        longitude: defaultCoordinates.lng,
        count: drivers,
      };
      const response = await axios.get(`${CORS_URL}/${BASE_URL}/drivers`, {
        params,
      });
      console.log(response);
      if (response.status === 200) {
        const data = response.data;
        setMarkers(data.drivers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedGetDrivers = useDebounce(getDrivers, 300);

  useEffect(() => {
    debouncedGetDrivers();
  }, [drivers]);

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

  const handleDefaultCenter = () => setCenter(defaultCoordinates);

  return (
    <div>
      <h2>Welcome to my Map App</h2>
      <Row gutter={[16, 30]} justify={'center'}>
        <Col xs={24}>
          <Map
            markers={markers}
            apiKey={API_KEY!}
            zoom={zoom}
            handleZoomIn={handleZoomIn}
            handleZoomOut={handleZoomOut}
            onZoomChanged={onZoomChanged}
            onCenterChanged={onCenterChanged}
            center={center}
            handleDefaultCenter={handleDefaultCenter}
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
