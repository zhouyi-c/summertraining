import { useEffect, useState } from "react";
import { Table, Button, Form, Input, DatePicker, Modal, message, Space, Card, Divider, InputNumber } from "antd";
import axios from "axios";
import dayjs from 'dayjs'; // 引入 dayjs 用于日期处理

const API_URL = "http://localhost:8000/api/reservations";

export default function ReservationAdmin() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [editingReservation, setEditingReservation] = useState<any | null>(null);
  const [form] = Form.useForm();

  const fetchReservations = async () => {
    try {
      const res = await axios.get(API_URL);
      setReservations(res.data.reverse());
    } catch (error) {
      message.error("获取预订列表失败");
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleFinish = async (values: any) => {
    const payload = {
        ...values,
        check_in: values.check_in.format('YYYY-MM-DD HH:mm:ss'),
        check_out: values.check_out.format('YYYY-MM-DD HH:mm:ss'),
    };

    try {
      if (editingReservation) {
        await axios.put(`${API_URL}/${editingReservation.id}`, payload);
        message.success("预订信息更新成功");
      } else {
        await axios.post(API_URL, payload);
        message.success("预订新增成功");
      }
      form.resetFields();
      setEditingReservation(null);
      fetchReservations();
    } catch (error) {
      message.error("操作失败");
    }
  };

  const handleEdit = (reservation: any) => {
    setEditingReservation(reservation);
    form.setFieldsValue({
        ...reservation,
        check_in: dayjs(reservation.check_in),
        check_out: dayjs(reservation.check_out),
    });
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: '确认删除',
      content: '您确定要删除这条预订吗？此操作不可撤销。',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          await axios.delete(`${API_URL}/${id}`);
          message.success("预订删除成功");
          fetchReservations();
        } catch (error) {
          message.error("删除失败");
        }
      },
    });
  };

  const cancelEdit = () => {
    setEditingReservation(null);
    form.resetFields();
  };

  const columns = [
    { title: "房间ID", dataIndex: "room_id", key: "room_id" },
    { title: "旅客ID", dataIndex: "guest_id", key: "guest_id" },
    { title: "入住时间", dataIndex: "check_in", key: "check_in" },
    { title: "离店时间", dataIndex: "check_out", key: "check_out" },
    {
      title: "操作",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>编辑</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>删除</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card title={editingReservation ? "编辑预订" : "新增预订"} style={{ marginBottom: 24 }}>
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Form.Item name="room_id" label="房间ID" rules={[{ required: true, message: '请输入房间ID' }]}> 
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="guest_id" label="旅客ID" rules={[{ required: true, message: '请输入旅客ID' }]}> 
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="check_in" label="入住时间" rules={[{ required: true, message: '请选择入住时间' }]}> 
            <DatePicker showTime style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="check_out" label="离店时间" rules={[{ required: true, message: '请选择离店时间' }]}> 
            <DatePicker showTime style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">{editingReservation ? "更新" : "创建"}</Button>
              {editingReservation && <Button onClick={cancelEdit}>取消</Button>}
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Divider />

      <Table
        dataSource={reservations}
        columns={columns}
        rowKey="id"
        bordered
        title={() => '预订列表'}
      />
    </div>
  );
} 