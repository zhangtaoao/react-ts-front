import { useRoutes, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import Layout from "@/pages/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";
import { getCookie } from "@/utils/cookie";
// 添加RequireAuth组件
function RequireAuth({ children }: { children: React.ReactNode }) {
  const token = getCookie("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function Router() {
  const routers = useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: (
        <RequireAuth>
          <Layout />
        </RequireAuth>
      ),
      children: [
        {
          index: true,
          element: <Navigate to="/home" replace />,
        },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "about",
          element: <About />,
        },
      ],
    },
    {
      path: "/404",
      element: <NotFound />,
    },
    {
      path: "*",
      element: <Navigate to="/404" />,
    },
  ]);
  return routers;
}
