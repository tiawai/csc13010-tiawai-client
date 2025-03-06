'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Flex, Menu, Space, Button, Typography, Avatar, Dropdown } from 'antd';
import { MenuProps } from 'antd';
import {
    DownOutlined,
    UserOutlined,
    HistoryOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import logo from '@public/logo.svg';
const { Title, Paragraph } = Typography;
import { signOut } from 'next-auth/react';
import { useAppSelector } from '@/lib/hooks/hook';
import { useDisableSessionMutation } from '@/services/chat';

type MenuItem = Required<MenuProps>['items'][number];

const adminItems: MenuItem[] = [
    {
        label: <Link href="/admin">Thống kê</Link>,
        key: 'dashboard',
    },
    {
        label: <Link href="/admin/users">Quản lý người dùng</Link>,
        key: 'users',
    },
    {
        label: <Link href="/admin/exams">Quản lý đề thi</Link>,
        key: 'exams',
    },
];

const userItems: MenuItem[] = [
    {
        label: <Link href="/">Trang chủ</Link>,
        key: 'home',
    },
    {
        label: <Link href="/exam">Đề thi</Link>,
        key: 'exam',
    },
    {
        label: <Link href="/practice">Chuyên đề</Link>,
        key: 'practice',
    },
    {
        label: <Link href="/flashcard">Flashcard</Link>,
        key: 'flashcard',
    },
    {
        label: <Link href="/paraphrase">Paraphrase</Link>,
        key: 'paraphrase',
    },
    {
        label: <Link href="/contact">Liên hệ</Link>,
        key: 'contact',
    },
];

const itemsDropdown: MenuProps['items'] = [
    {
        key: 'profile',
        label: <Link href="/profile">Hồ sơ cá nhân</Link>,
        icon: <UserOutlined className="!text-base" />,
    },
    {
        key: 'history',
        label: <Link href="/study-history">Lịch sử học tập</Link>,
        icon: <HistoryOutlined className="!text-base" />,
    },
    {
        key: 'signout',
        label: 'Đăng xuất',
        icon: <LogoutOutlined className="!text-base" />,
    },
];

const Header = () => {
    const [disableChatSession] = useDisableSessionMutation();
    const chatSessionId = useAppSelector((state) => state.auth.chatSessionId);
    const pathname = usePathname();
    const router = useRouter();
    const user = useAppSelector((state) => state.auth.user);
    const menuItems = user?.role === 'administrator' ? adminItems : userItems;

    const currentPath =
        pathname === '/'
            ? user?.role === 'administrator'
                ? 'dashboard'
                : 'home'
            : pathname?.split('/')[1];
    const [current, setCurrent] = useState(currentPath);

    useEffect(() => {
        setCurrent(currentPath);
    }, [currentPath]);

    const onClick: MenuProps['onClick'] = ({ key }) => {
        setCurrent(key);
    };

    const handleDropdownClick: MenuProps['onClick'] = async ({ key }) => {
        if (key === 'signout') {
            if (chatSessionId) {
                await disableChatSession(chatSessionId);
            }
            await signOut({ redirect: false });
            router.push('/sign-in');
        }
    };

    return (
        <header className="fixed left-0 right-0 top-0 z-50 flex w-full select-none items-center justify-between px-8 pt-4 backdrop-blur-md">
            <div className="flex items-center gap-2">
                <Link href="/" className="no-highlight flex items-center gap-2">
                    <div className="min-h-max min-w-max items-center rounded-full bg-[#5369A1] px-[9px] py-[3px]">
                        <Image
                            className="h-auto w-auto"
                            src={logo}
                            alt="logo"
                            priority
                        />
                    </div>
                    <Title className="!font-chango !font-normal" level={4}>
                        tiawai
                    </Title>
                </Link>
            </div>

            <Menu
                className="!border-none !bg-transparent"
                items={menuItems}
                mode="horizontal"
                onSelect={onClick}
                selectedKeys={[current]}
                disabledOverflow={true}
                style={{
                    fontSize: 16,
                    fontWeight: 600,
                    display: 'flex',
                    gap: '1rem',
                }}
            />

            {user ? (
                <Dropdown
                    className="!cursor-pointer"
                    menu={{
                        items: itemsDropdown,
                        onClick: handleDropdownClick,
                    }}
                    trigger={['click']}
                >
                    <Flex justify="center" align="center" gap={8}>
                        <Avatar
                            size="large"
                            icon={<UserOutlined />}
                            style={{
                                backgroundColor: '#4D2C5E',
                                cursor: 'pointer',
                            }}
                        />
                        <Flex className="!mr-4" vertical>
                            <Title className="!m-0" level={5}>
                                {user?.username}
                            </Title>
                            <Paragraph className="!m-0">
                                {user?.role && user?.role === 'administrator'
                                    ? 'Quản trị viên'
                                    : 'Người dùng'}
                            </Paragraph>
                        </Flex>
                        <DownOutlined />
                    </Flex>
                </Dropdown>
            ) : (
                <Space size="large">
                    <Button
                        type="primary"
                        size="large"
                        shape="round"
                        onClick={() => router.push('/sign-in')}
                    >
                        Đăng nhập
                    </Button>
                    <Button
                        size="large"
                        shape="round"
                        onClick={() => router.push('/sign-up')}
                    >
                        Đăng ký
                    </Button>
                </Space>
            )}
        </header>
    );
};

export default Header;
