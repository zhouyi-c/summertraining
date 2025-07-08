import { Layout, Menu, Button } from "antd";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import AdminLogin from "./AdminLogin";
import ProtectedRoute from "../components/ProtectedRoute";
import Admin from "./Admin";

const { Header, Content } = Layout;

import { useAuth } from "../context/AuthContext";

export default function App() {
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getMenuItems = () => {
    if (role === 'user') {
      return [
        { key: "home", label: <Link to="/user">首页</Link> },
        { key: "logout", label: <Button type="link" onClick={handleLogout}>退出登录</Button> },
      ];
    } else if (role === 'admin') {
      return [
        { key: "home", label: <Link to="/admin">后台首页</Link> },
        { key: "logout", label: <Button type="link" onClick={handleLogout}>退出登录</Button> },
      ];
    } else {
      return []; // Or a link to login
    }
  };

  return (
    <Layout>
      {role && (
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            items={getMenuItems()}
            style={{ justifyContent: 'flex-end' }}
          />
        </Header>
      )}
      <Content style={{ padding: 24, minHeight: 'calc(100vh - 64px - 48px)' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/user" element={<ProtectedRoute roleRequired="user" element={<Home />} />} />
          <Route path="/" element={<Login />} />
          <Route path="/admin/*" element={<ProtectedRoute roleRequired="admin" element={<Admin />} />} />
        </Routes>
      </Content>
    </Layout>
  );
}
