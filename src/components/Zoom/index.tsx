import { Button, Flex } from 'antd';
import React from 'react';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import './index.css';
import { ZoomProps } from './types';

const Zoom: React.FC<ZoomProps> = ({ handleZoomIn, handleZoomOut }) => {
  return (
    <Flex align="flex-start" vertical className="zoom-button-container">
      <Button
        icon={<PlusOutlined />}
        className="zoom-button"
        onClick={handleZoomIn}
      ></Button>
      <Button
        icon={<MinusOutlined />}
        className="zoom-button"
        onClick={handleZoomOut}
      ></Button>
    </Flex>
  );
};

export default Zoom;
