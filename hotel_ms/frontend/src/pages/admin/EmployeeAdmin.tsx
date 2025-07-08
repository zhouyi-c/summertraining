import { useEffect, useState } from "react";
import { Table, Button, Form, Input, Modal, message, Space, Card, Divider } from "antd";
import axios from "axios";

const API_URL = "http://localhost:8000/api/employees";

export default function EmployeeAdmin() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [editingEmployee, setEditingEmployee] = useState<any | null>(null);
  const [form] = Form.useForm();

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(API_URL);
      setEmployees(res.data.reverse());
    } catch (error) {
      message.error("获取员工列表失败");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleFinish = async (values: any) => {
    try {
      if (editingEmployee) {
        await axios.put(`${API_URL}/${editingEmployee.id}`, values);
        message.success("员工信息更新成功");
      } else {
        await axios.post(API_URL, values);
        message.success("员工新增成功");
      }
      form.resetFields();
      setEditingEmployee(null);
      fetchEmployees();
    } catch (error) {
      message.error("操作失败");
    }
  };

  const handleEdit = (employee: any) => {
    setEditingEmployee(employee);
    form.setFieldsValue(employee);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: '确认删除',
      content: '您确定要删除这位员工吗？此操作不可撤销。',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          await axios.delete(`${API_URL}/${id}`);
          message.success("员工删除成功");
          fetchEmployees();
        } catch (error) {
          message.error("删除失败");
        }
      },
    });
  };

  const cancelEdit = () => {
    setEditingEmployee(null);
    form.resetFields();
  };

  const columns = [
    { title: "姓名", dataIndex: "name", key: "name" },
    { title: "职位", dataIndex: "role", key: "role" },
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
      <Card title={editingEmployee ? "编辑员工" : "新增员工"} style={{ marginBottom: 24 }}>
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="role" label="职位" rules={[{ required: true, message: '请输入职位' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">{editingEmployee ? "更新" : "创建"}</Button>
              {editingEmployee && <Button onClick={cancelEdit}>取消</Button>}
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Divider />

      <Table
        dataSource={employees}
        columns={columns}
        rowKey="id"
        bordered
        title={() => '员工列表'}
      />
    </div>
  );
} 