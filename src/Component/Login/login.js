import { Button, Form, Input, Card } from "antd";
import React, { useState, useEffect } from "react";
import { loginUser } from "../../service/Appservice";
import { useNavigate } from "react-router-dom";
function Login() {
  const onFinish = async (values) => {
    const client_id = "vimc";
    const username = values.username;
    const password = values.password;
    const grant_type = "password";
    const scope = "openid";
    let res = await loginUser(client_id, username, password, grant_type, scope);
    localStorage.setItem("item", res.access_token);
    // console.log("Success:", res);
    navigate("/home");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Đăng nhập";
  }, []);

  return (
    <>
      <div className="site-card-border-less-wrapper">
        <Card
          title="Đăng Nhập"
          bordered={false}
          style={{
            width: 800,
            margin: "0 auto",
            marginTop: "15%",
            backgroundColor: "#EEEEEE",
          }}
        >
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            style={{
              width: 600,
              margin: "0",
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}

export default Login;
