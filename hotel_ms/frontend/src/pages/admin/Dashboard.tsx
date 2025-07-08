import { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic, message } from 'antd';
import { HomeOutlined, TeamOutlined, UserOutlined, BookOutlined } from '@ant-design/icons';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    rooms: 0,
    employees: 0,
    guests: 0,
    reservations: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [roomsRes, employeesRes, guestsRes, reservationsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/rooms`),
          axios.get(`${API_BASE_URL}/employees`),
          axios.get(`${API_BASE_URL}/guests`),
          axios.get(`${API_BASE_URL}/reservations`),
        ]);

        setStats({
          rooms: roomsRes.data.length,
          employees: employeesRes.data.length,
          guests: guestsRes.data.length,
          reservations: reservationsRes.data.length,
        });
      } catch (error) {
        message.error('获取统计数据失败');
      }
    };

    fetchStats();
  }, []);

  return (
    <div style={{ padding: '24px' }}>
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={12} lg={6}>
                <Card>
                    <Statistic
                        title="总房间数"
                        value={stats.rooms}
                        prefix={<HomeOutlined />}
                        valueStyle={{ color: '#3f8600' }}
                    />
                </Card>
            </Col>
            <Col xs={24} sm={12} md={12} lg={6}>
                <Card>
                    <Statistic
                        title="总员工数"
                        value={stats.employees}
                        prefix={<TeamOutlined />}
                        valueStyle={{ color: '#cf1322' }}
                    />
                </Card>
            </Col>
            <Col xs={24} sm={12} md={12} lg={6}>
                <Card>
                    <Statistic
                        title="总旅客数"
                        value={stats.guests}
                        prefix={<UserOutlined />}
                        valueStyle={{ color: '#1890ff' }}
                    />
                </Card>
            </Col>
            <Col xs={24} sm={12} md={12} lg={6}>
                <Card>
                    <Statistic
                        title="总预订数"
                        value={stats.reservations}
                        prefix={<BookOutlined />}
                        valueStyle={{ color: '#faad14' }}
                    />
                </Card>
            </Col>
        </Row>
    </div>
  );
}
