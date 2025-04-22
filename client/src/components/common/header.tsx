'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
    Flex,
    Menu,
    MenuProps,
    Space,
    Button,
    Typography,
    Avatar,
    Dropdown,
} from 'antd';
import {
    DownOutlined,
    UserOutlined,
    HistoryOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import logo from '@public/logo.svg';
import { signOut } from 'next-auth/react';
import { selectUser } from '@/lib/slices/auth.slice';
import { useAppSelector } from '@/lib/hooks/hook';
import { useSignOutMutation } from '@/services/auth.service';
import { useDisableSessionMutation } from '@/services/chat';
import { Role, UserUtils } from '@/types/user.type';
import { TestType } from '@/types/test.type';
import { YoutubeOutlined, DollarOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

// prettier-ignore
const guestItems: MenuProps["items"] = [
    { label: <Link href="/student">Học sinh</Link>, key: "student" },
    { label: <Link href="/teacher">Giáo viên</Link>, key: "teacher" },
];

// prettier-ignore
const studentItems: MenuProps["items"] = [
    { label: <Link href="/student/">Trang chủ</Link>, key: "home" },
    { label: <Dropdown menu={{ items: [
        { key: '1', label: <Link href={`/student/test?type=${encodeURIComponent(TestType.TOEIC_LISTENING)}`}>Đề thi TOEIC Listening</Link> },
        { key: '2', label: <Link href={`/student/test?type=${encodeURIComponent(TestType.TOEIC_READING)}`}>Đề thi TOEIC Reading</Link> }
      ]}}><span>Kỹ năng TOEIC<DownOutlined /></span></Dropdown>, key: "toeic"
    },
    { label: <Link href={`/student/test?type=${encodeURIComponent(TestType.NATIONAL_TEST)}`}>Ôn thi THPTQG</Link>, key: "thptqg" },
    { label: <Link href="/student/flashcard">Flashcard</Link>, key: "flashcard" },
    { label: <Link href="/student/class">Lớp học</Link>, key: "class" },
    { label: <Link href="/contact">Liên hệ</Link>, key: "contact" },
    // { label: <Link href="/student/exam">Đề thi</Link>, key: "exam" },
    // { label: <Link href="/student/practice">Chuyên đề</Link>, key: "practice" },
    // { label: <Link href="/student/paraphrase">Paraphrase</Link>, key: "paraphrase" },
];

// prettier-ignore
const teacherItems: MenuProps["items"] = [
    { label: <Link href="/teacher/">Trang chủ</Link>, key: "home" },
    { label: <Link href="/teacher/classroom">Quản lý lớp học</Link>, key: "class" },
    { label: <Link href="/teacher/exam">Quản lý bài học / đề thi</Link>, key: "exam" },
    { label: <Link href="/contact">Liên hệ</Link>, key: "contact" },
];

// prettier-ignore
const adminItems: MenuProps["items"] = [
    { label: <Link href="/admin">Thống kê</Link>, key: "dashboard" },
    { label: <Link href="/admin/users">Quản lý người dùng</Link>, key: "users" },
    { label: <Link href="/admin/classrooms">Quản lý lớp học</Link>, key: "classrooms" },
    { label: <Link href="/admin/tests">Quản lý đề thi</Link>, key: "tests" },
    { label: <Link href="/admin/reports">Quản lý báo cáo</Link>, key: "reports" },
    { label: <Link href="/admin/payments">Quản lý giao dịch</Link>, key: "payments" },
];

// prettier-ignore
const dropdownItemsStudent: MenuProps["items"] = [
    { key: "profile", label: <Link href="/profile">Hồ sơ cá nhân</Link>, icon: <UserOutlined /> },
    { key: "study-history", label: <Link href="/student/study-history">Lịch sử học tập</Link>, icon: <HistoryOutlined /> },
    { key: "my-class", label: <Link href="/student/class/me">Lớp học của tôi</Link>, icon: <YoutubeOutlined /> },
    { key: "payment-history", label: <Link href="/payment-history">Lịch sử giao dịch</Link>, icon: <DollarOutlined /> },
    { key: "signout", label: "Đăng xuất", icon: <LogoutOutlined /> },
];

// prettier-ignore
const dropdownItemsTA: MenuProps["items"] = [
    { key: "profile", label: <Link href="/profile">Hồ sơ cá nhân</Link>, icon: <UserOutlined /> },
    { key: "payment-history", label: <Link href="/payment-history">Lịch sử giao dịch</Link>, icon: <DollarOutlined /> },
    { key: "signout", label: "Đăng xuất", icon: <LogoutOutlined /> },
];

const Header = () => {
    const router = useRouter();
    const [signOutClient] = useSignOutMutation();
    const [disableChatSession] = useDisableSessionMutation();
    const chatSessionId = useAppSelector((state) => state.auth.chatSessionId);
    const user = useAppSelector(selectUser);
    const dropdownItems =
        user.role === Role.STUDENT ? dropdownItemsStudent : dropdownItemsTA;

    const handleDropdownClick: MenuProps['onClick'] = async ({ key }) => {
        if (key === 'signout') {
            if (chatSessionId) await disableChatSession(chatSessionId);
            await signOut({ redirect: false });
            await signOutClient();
            router.push('/auth/sign-in');
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
                onClick={() => router.push('/auth/sign-in')}
            >
                Đăng nhập
            </Button>
            <Button
                size="large"
                shape="round"
                onClick={() => router.push('/auth/sign-up')}
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
                        {user.username}
                    </Title>
                    <Paragraph className="!m-0">
                        {UserUtils.getRoleName(user)}
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
            {!UserUtils.isAdmin(user) && <HeaderMenu />}
            {user.role != Role.GUEST ? (
                <HeaderUserAction />
            ) : (
                <HeaderAuthentication />
            )}
        </HeaderLayout>
    );
};

export default Header;

const userItems = {
    Guest: guestItems,
    Student: studentItems,
    Teacher: teacherItems,
    Admin: adminItems,
};

export const HeaderMenu = () => {
    const pathname = usePathname();
    const user = useAppSelector(selectUser);

    const [current, setCurrent] = useState(pathname);
    const onClick: MenuProps['onClick'] = ({ key }) => setCurrent(key);

    const isAdmin = UserUtils.isAdmin(user);
    const menuItems = userItems[user.role];
    const mode = isAdmin ? 'vertical' : 'horizontal';
    const flexDirection = isAdmin ? 'column' : 'row';

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
                flexDirection: flexDirection,
                gap: '1rem',
            }}
        />
    );
};
