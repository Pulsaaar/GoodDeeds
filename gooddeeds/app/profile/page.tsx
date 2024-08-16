"use client"

import { Button, Card } from 'antd';
import { signOut, useSession } from 'next-auth/react';

const User = () => {
  const {data: session, status} = useSession();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
      <Card title="Профиль пользователя" style={{ width: 300 }}>
        <p><strong>Тег:</strong> {session?.user?.tag}</p>
        <p><strong>Email:</strong> {session?.user?.email}</p>
        <p><Button type='link' onClick={() => signOut({ callbackUrl: '/', redirect:true })}>Sign Out</Button></p>
      </Card>
    </div>
  );
}

export default User;
