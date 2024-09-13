import { Button } from 'antd';
import React from 'react';
import { AimOutlined } from '@ant-design/icons';
import './index.css';
import { CenterProps } from './types';

const Center: React.FC<CenterProps> = ({ handleDefaultCenter }) => {
  return (
    <Button
      icon={<AimOutlined />}
      className="center-button"
      onClick={handleDefaultCenter}
    />
  );
};

export default Center;
