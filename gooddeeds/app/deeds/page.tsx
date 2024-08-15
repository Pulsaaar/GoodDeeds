"use client"

import ListDeed from "../components/ListDeedCard"
import { FormOutlined} from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useSession } from "next-auth/react";
import { useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;


const Deeds: React.FC = () => {
  const [form] = Form.useForm();
  const [formVisible, setFormVisible] = useState(false);
  const { data: session, status } = useSession();

  const toggleForm = () => {
    setFormVisible(!formVisible);
  };

  const handleFinish = (values: any) => {
    fetch(`${apiUrl}/deeds`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: values.title,
        description: values.description,
        author: {
          connect: {
            id: session?.user?.id, 
          }
        } 
      }),
    });
      
    form.resetFields();
    toggleForm();
    };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Список добрых дел <Button type="default" onClick={toggleForm}><FormOutlined/></Button></h1>
      {formVisible && (
        <div style={{width: '40%', margin: '0 auto' }}>
          <Form
            form={form}
            name="basic"
            style={{ textAlign: 'center' }} 
            onFinish={handleFinish}
            onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please input title!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: false}]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Form>
          </div>)}

      <ListDeed/>
    </div>
  )

}

export default Deeds;