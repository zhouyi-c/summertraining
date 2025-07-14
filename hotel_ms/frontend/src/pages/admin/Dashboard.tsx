// import { useEffect, useState } from 'react';
// import { Card, Col, Row, Statistic, message } from 'antd';
// import { HomeOutlined, TeamOutlined, UserOutlined, BookOutlined } from '@ant-design/icons';
// import axios from 'axios';
//
// const API_BASE_URL = 'http://localhost:8000/api';
//
// export default function Dashboard() {
//   const [stats, setStats] = useState({
//     rooms: 0,
//     employees: 0,
//     guests: 0,
//     reservations: 0,
//   });
//
//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const [roomsRes, employeesRes, guestsRes, reservationsRes] = await Promise.all([
//           axios.get(`${API_BASE_URL}/rooms`),
//           axios.get(`${API_BASE_URL}/employees`),
//           axios.get(`${API_BASE_URL}/guests`),
//           axios.get(`${API_BASE_URL}/reservations`),
//         ]);
//
//         setStats({
//           rooms: roomsRes.data.length,
//           employees: employeesRes.data.length,
//           guests: guestsRes.data.length,
//           reservations: reservationsRes.data.length,
//         });
//       } catch (error) {
//         message.error('获取统计数据失败');
//       }
//     };
//
//     fetchStats();
//   }, []);
//
//   return (
//     <div style={{ padding: '24px' }}>
//         <Row gutter={[16, 16]}>
//             <Col xs={24} sm={12} md={12} lg={6}>
//                 <Card>
//                     <Statistic
//                         title="总房间数"
//                         value={stats.rooms}
//                         prefix={<HomeOutlined />}
//                         valueStyle={{ color: '#3f8600' }}
//                     />
//                 </Card>
//             </Col>
//             <Col xs={24} sm={12} md={12} lg={6}>
//                 <Card>
//                     <Statistic
//                         title="总员工数"
//                         value={stats.employees}
//                         prefix={<TeamOutlined />}
//                         valueStyle={{ color: '#cf1322' }}
//                     />
//                 </Card>
//             </Col>
//             <Col xs={24} sm={12} md={12} lg={6}>
//                 <Card>
//                     <Statistic
//                         title="总旅客数"
//                         value={stats.guests}
//                         prefix={<UserOutlined />}
//                         valueStyle={{ color: '#1890ff' }}
//                     />
//                 </Card>
//             </Col>
//             <Col xs={24} sm={12} md={12} lg={6}>
//                 <Card>
//                     <Statistic
//                         title="总预订数"
//                         value={stats.reservations}
//                         prefix={<BookOutlined />}
//                         valueStyle={{ color: '#faad14' }}
//                     />
//                 </Card>
//             </Col>
//         </Row>
//     </div>
//   );
// }
import { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic, message, Spin } from 'antd';
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
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingChatbot, setLoadingChatbot] = useState(true);

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
        setLoadingStats(false);
      } catch (error) {
        message.error('获取统计数据失败');
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div style={{ padding: '24px' }}>
      {/* 系统概览统计卡片 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card loading={loadingStats}>
            <Statistic
              title="总房间数"
              value={stats.rooms}
              prefix={<HomeOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card loading={loadingStats}>
            <Statistic
              title="总员工数"
              value={stats.employees}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card loading={loadingStats}>
            <Statistic
              title="总旅客数"
              value={stats.guests}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card loading={loadingStats}>
            <Statistic
              title="总预订数"
              value={stats.reservations}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 添加分隔空间 */}
      <div style={{ height: '24px' }} />

      {/* AI助手卡片 */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            title={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>AI助手</span>}
            headStyle={{ fontSize: '16px' }}
          >
            <div style={{ position: 'relative', minHeight: '700px' }}>
              {loadingChatbot && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(255,255,255,0.7)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 10
                }}>
                  <Spin tip="加载AI助手中..." size="large" />
                </div>
              )}

              <iframe
                src="http://localhost/chatbot/0MJacMBBZrnOfYOh"
                style={{
                  width: '100%',
                  height: '700px',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
                frameBorder="0"
                allow="microphone"
                title="Dify AI助手"
                onLoad={() => setLoadingChatbot(false)}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}