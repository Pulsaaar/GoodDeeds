"use client"

import GoodDeedCard from '../components/DeedCard';
import { Row, Col } from 'antd';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const ListDeed: React.FC<{refreshDeeds: boolean}> = ({ refreshDeeds }) => {
    const [deeds, setDeeds] = useState([]);
    const { data: session, status } = useSession();

    const handleDeleteDeed = (id: number) => {
        setDeeds(deeds.filter(deed => deed.id !== id));
    };

    const handleEdit = (id: number, title: string, description: string) => {
        setDeeds(deeds.map(deed =>
            deed.id === id ? { ...deed, title, description } : deed
        ));
    };

    useEffect(() => {
      if (status === 'authenticated') {
          const fetchDeeds = async () => {
              try {
                  const response = await fetch(`${apiUrl}/deeds/user/${session?.user.id}`, {
                      method: 'GET',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                  });
                  const data = await response.json();
                  setDeeds(data);
              } catch (error) {
                  console.error('There was a problem with the fetch operation:', error);
              }
          };

          fetchDeeds();
      }
  }, [session, refreshDeeds]); 

  return (
    <div style={{ padding: '20px' }}>
        <Row justify="start" gutter={[24, 24]}>
            {deeds.map((deed) => (
            <Col key={deed.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                <GoodDeedCard id={deed.id} title={deed.title} description={deed.description} onDelete={handleDeleteDeed} onEdit={handleEdit}/>
            </Col>
        ))}
    </Row>
  </div>
    )
}

export default ListDeed;