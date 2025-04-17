import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Flex } from 'antd';
import Link from 'next/link';
import React from 'react';

const users = [
    {
        username: '@admin',
    },
    {
        username: '@admin',
    },
    {
        username: '@admin',
    },
    {
        username: '@admin',
    },
    {
        username: '@admin',
    },
    {
        username: '@admin',
    },
    {
        username: '@admin',
    },
    {
        username: '@admin',
    },
    {
        username: '@admin',
    },
    {
        username: '@admin',
    },
    {
        username: '@admin',
    },
    {
        username: '@admin',
    },
];

const UsersCard = () => {
    return (
        <Card
            className="font-roboto"
            style={{
                width: 375,
                borderRadius: '32px',
                borderWidth: '2px',
                borderColor: 'black',
                paddingLeft: '16px',
                paddingRight: '16px',
                paddingTop: '10px',
            }}
            bordered={true}
            title="Người dùng"
            extra={
                <Link
                    className="rounded-full bg-[#383A68] px-4 py-2 font-roboto text-base font-medium text-white transition-all duration-300 hover:text-white hover:brightness-150"
                    href="#"
                >
                    Xem thêm
                </Link>
            }
            styles={{
                header: {
                    border: 'none',
                    fontSize: '24px',
                },
            }}
        >
            <Flex vertical gap={20}>
                {users.map((user, index) => (
                    <Flex key={index} align="center" justify="space-between">
                        <Flex align="center" gap={8}>
                            <Avatar
                                size={42}
                                icon={<UserOutlined />}
                                style={{
                                    borderRadius: '19px',
                                }}
                            />
                            <div className="font-roboto text-base font-bold">
                                {user.username}
                            </div>
                        </Flex>
                        <button className="mr-5 rounded-full bg-[#DAE3E9] px-4 py-1 text-center text-base font-medium transition-all duration-100 hover:scale-110">
                            Xem
                        </button>
                    </Flex>
                ))}
            </Flex>
        </Card>
    );
};

export default UsersCard;
