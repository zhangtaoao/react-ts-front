import { createRoot } from "react-dom/client";
import "@/styles/tailwind.css";
import "@/styles/index.scss";
import { BrowserRouter } from "react-router-dom";
import Router from "@/routes";
import { Provider } from "react-redux";
import store from "@/store";
import zhCN from "antd/locale/zh_CN";
import "dayjs/locale/zh-cn";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")!).render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  </ConfigProvider>
);
