import { useEffect, useState } from "react";
import { Table, Button, Form, Input, Modal, message, Space, Card, Divider } from "antd";
import axios from "axios";

const API_URL = "http://localhost:8000/api/guests";

export default function GuestAdmin() {
  const [guests, setGuests] = useState<any[]>([]);
  const [editingGuest, setEditingGuest] = useState<any | null>(null);
  const [form] = Form.useForm();

  const fetchGuests = async () => {
    try {
      const res = await axios.get(API_URL);
      setGuests(res.data.reverse());
    } catch (error) {
      message.error("获取旅客列表失败");
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  const handleFinish = async (values: any) => {
    try {
      if (editingGuest) {
        await axios.put(`${API_URL}/${editingGuest.id}`, values);
        message.success("旅客信息更新成功");
      } else {
        await axios.post(API_URL, values);
        message.success("旅客新增成功");
      }
      form.resetFields();
      setEditingGuest(null);
      fetchGuests();
    } catch (error) {
      message.error("操作失败");
    }
  };

  const handleEdit = (guest: any) => {
    setEditingGuest(guest);
    form.setFieldsValue(guest);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: '确认删除',
      content: '您确定要删除这位旅客吗？此操作不可撤销。',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          await axios.delete(`${API_URL}/${id}`);
          message.success("旅客删除成功");
          fetchGuests();
        } catch (error) {
          message.error("删除失败");
        }
      },
    });
  };

  const cancelEdit = () => {
    setEditingGuest(null);
    form.resetFields();
  };

  const columns = [
    { title: "姓名", dataIndex: "name", key: "name" },
    { title: "邮箱", dataIndex: "email", key: "email" },
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
      <Card title={editingGuest ? "编辑旅客" : "新增旅客"} style={{ marginBottom: 24 }}>
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="邮箱" rules={[{ required: true, type: 'email', message: '请输入有效的邮箱地址' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">{editingGuest ? "更新" : "创建"}</Button>
              {editingGuest && <Button onClick={cancelEdit}>取消</Button>}
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Divider />

      <Table
        dataSource={guests}
        columns={columns}
        rowKey="id"
        bordered
        title={() => '旅客列表'}
      />
    </div>
  );
} 