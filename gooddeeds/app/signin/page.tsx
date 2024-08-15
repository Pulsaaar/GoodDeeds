"use client"

import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { NextPage } from 'next';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values: LoginFormValues) => {
    setLoading(true);
    console.log('Success:', values);
    signIn("credentials", { 
      email: values.email,
      password: values.password,
    });
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: '50px 0' }}>
      <h2 style={{ textAlign: 'center' }}>Вход</h2>
      <Form
        name="login"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Введите ваш Email!' },
            { type: 'email', message: 'Введите корректный Email!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Введите ваш пароль!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Войти
          </Button>
        </Form.Item>
      </Form>

      <Link href="/register">Регистрация</Link>
    </div>
  );
};

export default Login;
