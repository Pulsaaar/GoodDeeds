"use client"

import React, { useState } from "react"
import { BookOutlined, TeamOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Link from 'next/link';

type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
{
    label: (
    <Link href="/">Profile</Link>
    ),
    key: 'profile',
    icon: <SettingOutlined />,
},
{
    label: (
    <Link href="/friend">Friends</Link>
    ),
    key: 'friends',
    icon: <TeamOutlined />,
},
{
    key: 'deeds',
    label: (
        <Link href="/deeds">List of deeds</Link>
    ),
    icon: <BookOutlined />,
},
];

const Navbar: React.FC = () => {
    const [current, setCurrent] = useState('profile');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <div>
            <Menu onClick={onClick} selectedKeys={[current]}  mode="horizontal" items={items} />
        </div>   
    );
};

export default Navbar;