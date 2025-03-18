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
import { signOut } from 'next-auth/react';
import { useAppSelector } from '@/lib/hooks/hook';
import { useDisableSessionMutation } from '@/services/chat';

const { Title, Paragraph } = Typography;

// prettier-ignore
const adminItems: MenuProps["items"] = [
    { label: <Link href="/admin">Thống kê</Link>, key: "dashboard" },
    { label: <Link href="/admin/users">Quản lý người dùng</Link>, key: "users" },
    { label: <Link href="/admin/classrooms">Quản lý lớp học</Link>, key: "classrooms" },
    { label: <Link href="/admin/assignments-tests">Quản lý bài tập & đề thi</Link>, key: "assignments-tests" },
    { label: <Link href="/admin/reports">Quản lý báo cáo</Link>, key: "reports" },
    { label: <Link href="/admin/transactions">Quản lý giao dịch</Link>, key: "transactions" },
    { label: <Link href="/admin/challenges">Quản lý challenge</Link>, key: "challenges" },
];

// prettier-ignore
const studentItems: MenuProps["items"] = [
    { label: <Link href="/">Trang chủ</Link>, key: "home" },
    { label: <Link href="/exam">Đề thi</Link>, key: "exam" },
    { label: <Link href="/practice">Chuyên đề</Link>, key: "practice" },
    { label: <Link href="/flashcard">Flashcard</Link>, key: "flashcard" },
    { label: <Link href="/paraphrase">Paraphrase</Link>, key: "paraphrase" },
    { label: <Link href="/contact">Liên hệ</Link>, key: "contact" },
];

// prettier-ignore
const teacherItems: MenuProps["items"] = [
    { label: <Link href="/teacher/home">Trang chủ</Link>, key: "home" },
    { label: <Link href="/teacher/class">Quản lý lớp học</Link>, key: "class" },
    { label: <Link href="/teacher/exam">Quản lý bài học / đề thi</Link>, key: "exam" },
    { label: <Link href="/contact">Liên hệ</Link>, key: "contact" },
];

// prettier-ignore
const dropdownItems: MenuProps["items"] = [
    { key: "profile", label: <Link href="/profile">Hồ sơ cá nhân</Link>, icon: <UserOutlined /> },
    { key: "history", label: <Link href="/study-history">Lịch sử học tập</Link>, icon: <HistoryOutlined /> },
    { key: "signout", label: "Đăng xuất", icon: <LogoutOutlined /> },
];

const Header = () => {
    const router = useRouter();
    const user = useAppSelector((state) => state.auth.user);
    const isAdmin = user?.role === 'administrator';
    const [disableChatSession] = useDisableSessionMutation();
    const chatSessionId = useAppSelector((state) => state.auth.chatSessionId);

    const handleDropdownClick: MenuProps['onClick'] = async ({ key }) => {
        if (key === 'signout') {
            if (chatSessionId) await disableChatSession(chatSessionId);
            await signOut({ redirect: false });
            router.push('/sign-in');
        }
    };

    const HeaderLogo = () => (
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
                <Title
                    className="!text-nowrap !font-chango !font-normal"
                    level={4}
                >
                    tiawai
                </Title>
            </Link>
        </div>
    );

    const HeaderAuthentication = () => (
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
    );

    const HeaderUserAction = () => (
        <Dropdown
            className="!cursor-pointer"
            menu={{ items: dropdownItems, onClick: handleDropdownClick }}
            trigger={['click']}
        >
            <Flex justify="center" align="center" gap={8}>
                <Avatar
                    size="large"
                    icon={<UserOutlined />}
                    style={{ backgroundColor: '#4D2C5E', cursor: 'pointer' }}
                />
                <Flex className="!mr-4" vertical>
                    <Title className="!m-0" level={5}>
                        {user?.username}
                    </Title>
                    <Paragraph className="!m-0">
                        {user?.role === 'administrator'
                            ? 'Quản trị viên'
                            : 'Người dùng'}
                    </Paragraph>
                </Flex>
                <DownOutlined />
            </Flex>
        </Dropdown>
    );

    const HeaderLayout = ({ children }: { children: React.ReactNode }) => (
        <header className="fixed left-0 right-0 top-0 z-50 flex w-full select-none items-center justify-between px-8 pt-4 backdrop-blur-md">
            {children}
        </header>
    );

    return (
        <HeaderLayout>
            <HeaderLogo />
            {!isAdmin && <HeaderMenu />}
            {user ? <HeaderUserAction /> : <HeaderAuthentication />}
        </HeaderLayout>
    );
};

export default Header;

export const HeaderMenu = () => {
    const pathname = usePathname();
    const user = useAppSelector((state) => state.auth.user);
    const isAdmin = user?.role === 'administrator';
    const menuItems = studentItems;
    const mode = isAdmin ? 'vertical' : 'horizontal';
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

    const onClick: MenuProps['onClick'] = ({ key }) => setCurrent(key);

    return (
        <Menu
            className="!border-none !bg-transparent"
            items={menuItems}
            mode={mode}
            onSelect={onClick}
            selectedKeys={[current]}
            disabledOverflow
            style={{
                fontSize: 16,
                fontWeight: 600,
                display: 'flex',
                flexDirection: isAdmin ? 'column' : 'row',
                gap: '1rem',
            }}
        />
    );
};
