import { useEffect, useState } from "react";
import { Table, Button, Form, Input, InputNumber, Switch, Modal, message, Space, Card, Divider } from "antd";
import axios from "axios";

const API_URL = "http://localhost:8000/api/rooms";

export default function RoomAdmin() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [editingRoom, setEditingRoom] = useState<any | null>(null);
  const [form] = Form.useForm();

  const fetchRooms = async () => {
    try {
      const res = await axios.get(API_URL);
      // 后端返回的数据默认按 id 升序，我们将其反转以实现最新数据在最前
      setRooms(res.data.reverse());
    } catch (error) {
      message.error("获取房间列表失败");
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleFinish = async (values: any) => {
    try {
      if (editingRoom) {
        // 更新模式
        await axios.put(`${API_URL}/${editingRoom.id}`, values);
        message.success("房间更新成功");
      } else {
        // 创建模式
        await axios.post(API_URL, values);
        message.success("房间新增成功");
      }
      form.resetFields();
      setEditingRoom(null);
      fetchRooms(); // 重新获取列表
    } catch (error) {
      message.error("操作失败");
    }
  };

  const handleEdit = (room: any) => {
    setEditingRoom(room);
    form.setFieldsValue(room);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: '确认删除',
      content: '您确定要删除这个房间吗？此操作不可撤销。',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          await axios.delete(`${API_URL}/${id}`);
          message.success("房间删除成功");
          fetchRooms(); // 重新获取列表
        } catch (error) {
          message.error("删除失败");
        }
      },
    });
  };

  const cancelEdit = () => {
    setEditingRoom(null);
    form.resetFields();
  };

  const columns = [
    { title: "房号", dataIndex: "number", key: "number" },
    { title: "类型", dataIndex: "type", key: "type" },
    { title: "价格", dataIndex: "price", key: "price" },
    { title: "可用", dataIndex: "is_available", key: "is_available", render: (isAvailable: boolean) => (isAvailable ? "是" : "否") },
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
      <Card title={editingRoom ? "编辑房间" : "新增房间"} style={{ marginBottom: 24 }}>
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Form.Item name="number" label="房号" rules={[{ required: true, message: '请输入房号' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="类型" rules={[{ required: true, message: '请输入房间类型' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="价格" rules={[{ required: true, message: '请输入价格' }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="is_available" label="是否可用" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">{editingRoom ? "更新" : "创建"}</Button>
              {editingRoom && <Button onClick={cancelEdit}>取消</Button>}
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Divider />

      <Table
        dataSource={rooms}
        columns={columns}
        rowKey="id"
        bordered
        title={() => '房间列表'}
      />
    </div>
  );
} 