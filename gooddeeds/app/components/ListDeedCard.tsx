"use client"

import GoodDeedCard from '../components/DeedCard';
import { Row, Col } from 'antd';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

const ListDeed = () => {
    const [deeds, setDeeds] = useState([]);
    const { data: session, status } = useSession();

    const handleDeleteTask = (id: number) => {
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
                  const response = await fetch(`http://localhost:5000/deeds/user/${session?.user.id}`, {
                      method: 'GET',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                  });

                  if (!response.ok) {
                      return (
                          <div>У вас нет добрых дел </div>
                      )
                  }
                  const data = await response.json();
                  setDeeds(data);
              } catch (error) {
                  console.error('There was a problem with the fetch operation:', error);
              }
          };

          fetchDeeds();
      }
  }, [session]); 

  return (
    <div style={{ padding: '20px' }}>
        <Row justify="start" gutter={[24, 24]}>
            {deeds.map((deed) => (
            <Col key={deed.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                <GoodDeedCard id={deed.id} title={deed.title} description={deed.description} onDelete={handleDeleteTask} onEdit={handleEdit}/>
            </Col>
        ))}
    </Row>
  </div>
    )
}

export default ListDeed;