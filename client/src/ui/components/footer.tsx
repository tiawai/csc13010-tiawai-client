'use client';
import { Collapse, CollapseProps, Flex, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@public/logo.svg';
import {
    ClockCircleOutlined,
    EnvironmentOutlined,
    MailOutlined,
    PhoneOutlined,
} from '@ant-design/icons';
const { Title } = Typography;

const featureItems: (
    panelStyle: React.CSSProperties,
) => CollapseProps['items'] = (panelStyle) => [
    {
        key: '1',
        label: 'Kỹ Năng IELTS',
        children: <div className="-mt-4">Something</div>,
        style: panelStyle,
    },
    {
        key: '2',
        label: 'Ôn Thi THPTQG',
        children: <div className="-mt-4">Something</div>,
        style: panelStyle,
    },
    {
        key: '3',
        label: 'Flashcard',
        children: <div className="-mt-4">Something</div>,
        style: panelStyle,
    },
    {
        key: '4',
        label: 'Challenge',
        children: <div className="-mt-4">Something</div>,
        style: panelStyle,
    },
    {
        key: '5',
        label: 'Lớp học',
        children: <div className="-mt-4">Something</div>,
        style: panelStyle,
    },
];

const Footer = () => {
    const panelStyle: React.CSSProperties = {
        marginBottom: '-10px',
        fontSize: '16px',
        fontFamily: 'Montserrat',
        fontWeight: '200',
    };
    return (
        <footer className="-mx-4 flex h-[360px] flex-col justify-between bg-primary px-20 pb-6 pt-10">
            <Flex justify="space-evenly">
                <Flex vertical gap={12}>
                    <Flex>
                        <Link
                            href="/"
                            className="no-highlight flex items-center gap-2"
                        >
                            <div className="min-h-max min-w-max items-center rounded-full bg-[#5369A1] px-[9px] py-[3px]">
                                <Image
                                    className="h-auto w-auto"
                                    src={logo}
                                    alt="logo"
                                    priority
                                />
                            </div>
                            <Title
                                className="pt-4 !font-chango !font-normal"
                                level={4}
                            >
                                tiawai
                            </Title>
                        </Link>
                    </Flex>
                    <Title level={4}>Nền tảng học Tiếng Anh với AI</Title>
                </Flex>
                <Flex vertical>
                    <Title level={4}>Dịch vụ của chúng tôi</Title>
                    <Collapse
                        className="font-montserrat"
                        items={featureItems(panelStyle)}
                        ghost
                        accordion
                    />
                </Flex>
                <Flex vertical className="font-montserrat" gap={12}>
                    <Title level={4}>Liên hệ với chúng tôi</Title>
                    <Flex gap={8} align="center">
                        <EnvironmentOutlined className="text-xl" />
                        <span className="text-lg font-extralight">
                            222 Nguyễn Văn Cừ, Quận 5, Hồ Chí Minh
                        </span>
                    </Flex>
                    <Flex gap={8} align="center">
                        <PhoneOutlined className="text-xl" />
                        <span className="text-lg font-extralight">
                            0912982282
                        </span>
                    </Flex>
                    <Flex gap={8} align="center">
                        <MailOutlined className="text-xl" />
                        <span className="text-lg font-extralight">
                            tiawai.co@gmail.com
                        </span>
                    </Flex>
                    <Flex gap={8} align="center">
                        <ClockCircleOutlined className="text-xl" />
                        <span className="text-lg font-extralight">
                            Thứ 2 - Chủ Nhật / 10:00 AM - 8:00 PM
                        </span>
                    </Flex>
                </Flex>
            </Flex>
            <span className="text-center text-sm font-normal">
                © 2025 Tiawai
            </span>
        </footer>
    );
};

export default Footer;
