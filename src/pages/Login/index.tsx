import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message } from "antd";
import "./style.scss";

import { useDispatch } from "react-redux";
import { loginAsync } from "@/store/modules/common";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "@/store";

function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      await dispatch(loginAsync(values)).unwrap();
      message.success('登录成功');
      navigate('/home');
    } catch (error: unknown) {
      message.error('登录失败');
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card" title="用户登录">
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item name="username" rules={[{ required: true, message: "请输入用户名!" }]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "请输入密码!" }]}>
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default LoginPage;
