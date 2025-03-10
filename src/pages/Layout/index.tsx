import { Outlet } from "react-router-dom";
import PageHeader from "./PageHeader";

import React from "react";
import { Layout, theme } from "antd";

const { Content } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100%" }}>
      <PageHeader />
      <Content>
        <div
          className="layout-content"
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default App;
