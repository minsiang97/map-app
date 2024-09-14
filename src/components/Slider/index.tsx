import React from 'react';
import { Col, Flex, InputNumber, Slider as ReactSlider, Row } from 'antd';
import { SliderProps } from '@components/Slider/types';
import './index.css';

const Slider: React.FC<SliderProps> = ({ drivers, onChange }) => {
  return (
    <div className="slider-container">
      <Flex align="center" vertical gap={'small'} justify="center">
        <ReactSlider
          defaultValue={1}
          onChange={onChange}
          min={1}
          max={50}
          value={typeof drivers === 'number' ? drivers : 0}
          className="slider"
        />
        <Row align={'middle'} gutter={[16, 16]} wrap={false}>
          <Col flex="none">
            <h4 className="count">Driver's Count: </h4>
          </Col>
          <Col flex={'auto'}>
            <InputNumber
              min={1}
              max={50}
              value={drivers}
              onChange={onChange}
              className="inputNumber"
            />
          </Col>
        </Row>
      </Flex>
    </div>
  );
};

export default Slider;
