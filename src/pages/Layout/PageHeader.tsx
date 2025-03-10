import { useNavigate } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout, setActiveMenu } from "@/store/modules/common";
import { RootState } from "@/store";
const { Header } = Layout;

function PageHeader() {
  const menuItems = [
    {
      key: "/home",
      label: "首页",
    },
    {
      key: "/about",
      label: "关于",
    },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeMenu = useSelector((state: RootState) => state.common.activeMenu);
  const defaultSelectedKeys = [activeMenu as string];

  const handleMenuClick = ({ key }: { key: string }) => {
    dispatch(setActiveMenu(key));
    navigate(key);
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      <div className="logo"></div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={defaultSelectedKeys} items={menuItems} style={{ flex: 1, minWidth: 0 }} onClick={handleMenuClick} />
      <div className="user-info">
        <Button type="link" onClick={handleLogout}>
          退出
        </Button>
      </div>
    </Header>
  );
}

export default PageHeader;
