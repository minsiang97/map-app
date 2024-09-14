import { Button } from 'antd';
import React from 'react';
import { RedoOutlined } from '@ant-design/icons';
import './index.css';
import { ResetProps } from '@components/Reset/types';

const Reset: React.FC<ResetProps> = ({ handleResetCenter }) => {
  return (
    <Button
      icon={<RedoOutlined />}
      className="reset-button"
      onClick={handleResetCenter}
    />
  );
};

export default Reset;
