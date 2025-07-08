import { useState, useEffect } from "react";
import { Card, Tabs, Form, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type FormMode = "login" | "register";

export default function Login() {
  const [activeKey, setActiveKey] = useState<FormMode>("login");
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const { login, role } = useAuth();
  const navigate = useNavigate();

  /** 登录 / 注册统一提交 */
  const submit = async (mode: FormMode) => {
    setLoading(true);
    try {
      // 根据模式获取对应的表单值
      const values = mode === "login"
        ? await loginForm.validateFields()
        : await registerForm.validateFields();

      if (mode === "register") {
        await axios.post("http://localhost:8000/api/register", {
          username: values.username,
          password: values.password,
        });
        message.success("注册成功！");
      }

      // 注册后也需要登录
      const formData = new URLSearchParams();
      formData.append("username", values.username);
      formData.append("password", values.password);

      const res = await axios.post("http://localhost:8000/api/login", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      // 缓存并全局设置 token
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", res.data.role);
      axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.access_token;
      login(res.data.role);

    } catch (e: any) {
      console.error("认证失败", e);
      const msg = axios.isAxiosError(e) && e.response?.data?.detail
        ? e.response.data.detail
        : "操作失败";
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  /* 角色切换后自动跳转 */
  useEffect(() => {
    if (role) navigate(role === "admin" ? "/admin" : "/user");
  }, [role, navigate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f0f2f5",
      }}
    >
      <Card style={{ width: 400 }}>
        <Tabs
          activeKey={activeKey}
          onChange={(key) => {
            setActiveKey(key as FormMode);
            // 重置两个表单
            loginForm.resetFields();
            registerForm.resetFields();
          }}
          items={[
            {
              key: "login",
              label: "登录",
              children: (
                <Form form={loginForm} layout="vertical">
                  <Form.Item
                    name="username"
                    rules={[{ required: true, message: "请输入用户名" }]}
                  >
                    <Input placeholder="用户名" autoComplete="username" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: "请输入密码" }]}
                  >
                    <Input.Password
                      placeholder="密码"
                      autoComplete="current-password"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      block
                      loading={loading && activeKey === "login"}
                      onClick={() => submit("login")}
                    >
                      普通用户登录
                    </Button>
                    <Button
                      type="link"
                      block
                      onClick={() => navigate("/admin-login")}
                    >
                      管理员登录
                    </Button>
                  </Form.Item>
                </Form>
              ),
            },
            {
              key: "register",
              label: "注册",
              children: (
                <Form form={registerForm} layout="vertical">
                  <Form.Item
                    name="username"
                    rules={[{ required: true, message: "请输入用户名" }]}
                  >
                    <Input placeholder="用户名" autoComplete="username" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: "请输入密码" },
                      { min: 6, message: "密码至少需要6位字符" }
                    ]}
                  >
                    <Input.Password
                      placeholder="密码"
                      autoComplete="new-password"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      block
                      loading={loading && activeKey === "register"}
                      onClick={() => submit("register")}
                    >
                      注册并登录
                    </Button>
                  </Form.Item>
                </Form>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
}