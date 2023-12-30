import React, { useContext } from "react";
import axios from "axios";
import SERVER_URL from "../SERVER_URL";
import { AuthContext } from "../context/AuthContext";
import { Form, Input, Button, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

interface SignInParameters { // req prmtrs.
  usernameOrEmail: string;
  password: string;
}

const SignInPageContext: React.FC = () => {
  const user = useContext(AuthContext);
  const [form] = Form.useForm();

  const handleSignIn = async (values: SignInParameters) => {
    try {
      const response = await axios.post(`${SERVER_URL}/api/signin`, values);

      if (user) {
        user.login(response.data);
      }
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Enter valid username or password!");
    }
  };

  if (!user) {
    return null;
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        // border: "solid white 2px",
        // backgroundColor: "#0f0e",
        alignItems: "center",
      }}
    >

      {/* Old user Registration */}
      <Card title="Sign In" style={{ width: 300 }}>
        <Form form={form} name="signInForm" onFinish={handleSignIn}>
          <Form.Item
            name="usernameOrEmail"
            rules={[
              {
                required: true,
                message: "Enter your username/e-mail",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="E-mail or username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Enter your password" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign In
            </Button>

          </Form.Item>
        </Form>
      </Card>

    </div>
  );
};

export default SignInPageContext;
