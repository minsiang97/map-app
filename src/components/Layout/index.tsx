import React, { PropsWithChildren } from 'react';
import { Layout as ReactLayout } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import './index.css';

const { Header, Content, Footer } = ReactLayout;

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ReactLayout>
      <Header className="header">
        <AntDesignOutlined className="header-icon" />
        <h2 className="header-title">My Map</h2>
      </Header>
      <Content className="content">{children}</Content>
      <Footer>
        <div>My Map ©{new Date().getFullYear()} Created by Min Siang</div>
      </Footer>
    </ReactLayout>
  );
};

export default Layout;
