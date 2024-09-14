import { Flex } from 'antd';
import React from 'react';
import { CustomMapControlProps } from '@components/MapControl/types';
import Zoom from '@components/Zoom';
import Center from '@components/Center';

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
