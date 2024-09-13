import { Flex } from 'antd';
import React from 'react';
import Center from '../Center';
import Zoom from '../Zoom';
import { CustomMapControlProps } from './types';

const CustomMapControl: React.FC<CustomMapControlProps> = ({
  handleZoomIn,
  handleZoomOut,
  handleDefaultCenter,
}) => {
  return (
    <Flex align="flex-start" vertical gap="large">
      <Center handleDefaultCenter={handleDefaultCenter} />
      <Zoom handleZoomIn={handleZoomIn} handleZoomOut={handleZoomOut} />
    </Flex>
  );
};

export default CustomMapControl;
