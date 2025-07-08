import { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const menuItems = [
    { key: 'dashboard', icon: <PieChartOutlined />, label: <Link to="/admin/dashboard">首页</Link> },
    { key: 'rooms', icon: <DesktopOutlined />, label: <Link to="/admin/rooms">房间管理</Link> },
    { key: 'employees', icon: <UserOutlined />, label: <Link to="/admin/employees">员工管理</Link> },
    { key: 'guests', icon: <TeamOutlined />, label: <Link to="/admin/guests">旅客管理</Link> },
    { key: 'reservations', icon: <FileOutlined />, label: <Link to="/admin/reservations">预订管理</Link> },
];

const breadcrumbNameMap: { [key: string]: string } = {
    '/admin': '后台管理',
    '/admin/dashboard': '首页',
    '/admin/rooms': '房间管理',
    '/admin/employees': '员工管理',
    '/admin/guests': '旅客管理',
    '/admin/reservations': '预订管理',
};


const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  if (location.pathname === '/admin' || location.pathname === '/admin/') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const pathSnippets = location.pathname.split('/').filter(i => i);
  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const name = breadcrumbNameMap[url] || pathSnippets[index];
    return (
      <Breadcrumb.Item key={url}>
        {index === pathSnippets.length - 1 ? name : <Link to={url}>{name}</Link>}
      </Breadcrumb.Item>
    );
  });

  const selectedKey = pathSnippets.length > 1 ? pathSnippets[1] : 'dashboard';


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)', textAlign: 'center', lineHeight: '32px', color: 'white', borderRadius: 6 }}>
          尼克城堡
        </div>
        <Menu theme="dark" defaultSelectedKeys={[selectedKey]} mode="inline" items={menuItems} />
      </Sider>
      <Layout>
        <Header style={{ padding: '0 16px', background: '#fff' }}>
            <Breadcrumb>
                {breadcrumbItems}
            </Breadcrumb>
        </Header>
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>尼克的移动城堡 ©2025 Created by AI</Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
