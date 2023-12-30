import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
// import { ReactDOM } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import SERVER_URL from "../SERVER_URL";

interface signUpParameters {
  username: string;
  email: string;
  profilephoto?: File[];
  password: string;
}

const SignUpPageContext: React.FC = () => {
  const user = useContext(AuthContext);
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values: signUpParameters = await form.validateFields();
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);

      if (values.profilephoto && values.profilephoto.length > 0) {
        formData.append("profilephoto", values.profilephoto[0]);
      }

      const response = await axios.post(`${SERVER_URL}/api/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (user) {
        user.login(response.data);
      } else {
        console.error("Invalid user context");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert(
        "User already exists"
      );
    }
  };

  return (
    //  New user Registration !!
    <div>
      <h2>Sign Up</h2>
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{ remember: true }}
        encType="multipart/form-data"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Enter your username" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Enter your email" },
            { type: "email", message: "Enter valid email" },
          ]}
        >
          <Input prefix={<MailOutlined />} type="email" placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>

        </Form.Item>
      </Form>
      
    </div>
  );
};

export default SignUpPageContext;
