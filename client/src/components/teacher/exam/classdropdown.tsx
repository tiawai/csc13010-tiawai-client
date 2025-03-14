'use client';
import { Dropdown, Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

const ClassDropdown = () => {
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        console.log('Selected class:', e.key);
    };

    const items: MenuProps['items'] = [
        { label: 'Lớp 1', key: '1' },
        { label: 'Lớp 2', key: '2' },
        { label: 'Lớp 3', key: '3', danger: true },
        { label: 'Lớp 4', key: '4', danger: true, disabled: true },
    ];

    return (
        <Dropdown menu={{ items, onClick: handleMenuClick }}>
            <Button
                size="large"
                className="mb-8 w-52 rounded-full border-2 border-black shadow-md"
            >
                <Space size="large">
                    Chọn lớp
                    <DownOutlined />
                </Space>
            </Button>
        </Dropdown>
    );
};

export default ClassDropdown;
