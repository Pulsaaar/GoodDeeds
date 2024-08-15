import React, { useState } from 'react';
import { Card, Button, Form, Input } from 'antd';
import { DeleteOutlined, EditOutlined} from '@ant-design/icons';

const { Meta } = Card;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface GoodDeedCardProps {
  id: number;
  title: string;
  description: string;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string, description: string) => void;
}

const GoodDeedCard: React.FC<GoodDeedCardProps> = ({ id, title, description, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const handleEditClick = () => {
    setIsEditing(true);
    form.setFieldsValue({ title, description });
  };
  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSubmit = (values: any) => {
    setIsEditing(false);
    fetch(`${apiUrl}/deeds/${id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
  });
    onEdit(id, values.title, values.description);
};

  const deleteDeed = () => {
    fetch(`${apiUrl}/deeds/${id}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
    }});
    onDelete(id);
  };
  return (
    <Card
      hoverable
      style={{ width: '100%', margin: '10px auto' }}
      actions={[
        <Button style={{overflow: 'hidden', width: '30%', color: "green" }} type="text" onClick={handleEditClick}>
            <EditOutlined/>
        </Button>,                
        <Button style={{overflow: 'hidden', width: '30%', color: "red" }} type="text" onClick={deleteDeed}>
            <DeleteOutlined/>
        </Button>,
            ]}>
          {isEditing ? (
          <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{ title, description }}>
              <Form.Item
                  name="title"
                  label="Title"
                  rules={[{ required: true, message: 'Please input the title!' }]}>
                  <Input />
              </Form.Item>
              <Form.Item
                  name="description"
                  label="Description"
                  rules={[{ required: false, message: 'Description!' }]}>
                  <Input.TextArea />
              </Form.Item>
              <Form.Item style={{ textAlign: 'center' }}>
                  <Button type="primary" htmlType="submit">
                      Save
                  </Button>
                  <Button onClick={handleCancel}>
                      Cancel
                  </Button>
              </Form.Item>
          </Form>
      ) : (
          <Meta title={title} description={description} />
      )}
    </Card>
  );
};

export default GoodDeedCard;