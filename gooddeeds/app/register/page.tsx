"use client"

import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { NextPage } from 'next';

interface RegisterFormValues {
  tag: string;
  email: string;
  password: string;
}
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const Reg: NextPage = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values: RegisterFormValues) => {
    setLoading(true);
    // Логика для отправки данных на сервер
    fetch(`${apiUrl}/user`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
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
      <h2 style={{ textAlign: 'center' }}>Регистрация</h2>
      <Form
        name="register"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label="Уникальное имя"
          name="tag"
          rules={[{ required: true, message: 'Введите ваше уникальное имя!' }]}
        >
          <Input />
        </Form.Item>

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
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Reg;
