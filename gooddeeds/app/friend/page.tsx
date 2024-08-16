"use client"

import { Input, Row, Col, Card } from "antd";
import React, { useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const { Search } = Input;

const People: React.FC  = () => {
    const [deeds, setDeeds] = useState([]);

    const onSearch = async (values: any) => {
        const userid = await fetch(`${apiUrl}/user/getid/${values}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const response = await fetch(`${apiUrl}/deeds/user/${await userid.json()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        setDeeds(data);
    };
    return (
        <div>
            <div style={{margin: '1% auto', width: '30%'}}>
                <Search placeholder="Enter tag tuser" onSearch={onSearch} enterButton />
            </div>
        <div style={{ padding: '20px' }}>
            <Row justify="start" gutter={[24, 24]}>
            {deeds.map((deed) => (
                <Col key={deed.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                    <Card title={deed.title}>{deed.description}</Card>
                </Col>
                ))}
            </Row>
        </div>

        </div>
        
    );
}

export default People;