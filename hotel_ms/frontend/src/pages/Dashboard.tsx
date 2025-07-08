import { useEffect, useState } from "react";
import { Card, Statistic, Row, Col } from "antd";
import axios from "axios";

export default function Dashboard() {
  const [stats, setStats] = useState<any>({});
  useEffect(() => {
    axios.get("http://localhost:8000/api/stats").then(res => setStats(res.data));
  }, []);
  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic title="房间总数" value={stats.rooms ?? 0} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="员工总数" value={stats.employees ?? 0} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="旅客总数" value={stats.guests ?? 0} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="预订总数" value={stats.reservations ?? 0} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
