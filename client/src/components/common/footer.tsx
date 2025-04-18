import Link from 'next/link';
import { Row, Col } from 'antd';
import {
    ClockCircleOutlined,
    MailOutlined,
    PhoneOutlined,
    PushpinOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import logo from '@public/logo.svg';

const services = [
    { name: 'Kỹ Năng IELTS', link: '/' },
    { name: 'Ôn Thi THPTQG', link: '/' },
    { name: 'Flashcard', link: '/' },
    { name: 'Lớp Học', link: '/' },
];

const contactInfo = [
    {
        icon: <PushpinOutlined className="text-xl" />,
        text: '222 Nguyễn Văn Cừ, Quận 5',
    },
    {
        icon: <PhoneOutlined className="text-xl" />,
        text: '0912982282',
    },
    {
        icon: <MailOutlined className="text-xl" />,
        text: 'tiawai.co@gmail.com',
    },
    {
        icon: <ClockCircleOutlined className="text-xl" />,
        text: 'Thứ 2 - Chủ Nhật / 10:00 AM - 8:00 PM',
    },
];

const Footer = () => {
    return (
        <footer className="mt-5 cursor-default bg-[#E9DAE9] py-5">
            <div className="mx-auto max-w-[1320px] px-6">
                <Row gutter={[32, 32]}>
                    <Col xs={24} md={8}>
                        <Link href="/" className="flex items-center gap-3">
                            <div className="min-h-max min-w-max items-center rounded-full bg-[#5369A1] px-[9px] py-[3px]">
                                <Image
                                    className="h-auto w-auto"
                                    src={logo}
                                    alt="logo"
                                    priority
                                />
                            </div>
                            <div className="!font-chango text-xl !font-normal text-black">
                                tiawai
                            </div>
                        </Link>
                        <p className="mt-2 text-xl font-bold">
                            Nền tảng học Tiếng Anh với AI
                        </p>
                    </Col>

                    <Col xs={24} md={8}>
                        <h4 className="mb-3 text-2xl font-bold">
                            Dịch vụ của chúng tôi
                        </h4>
                        <ul className="space-y-2 text-xl font-extralight">
                            {services.map((service, index) => (
                                <li key={index}>
                                    <Link
                                        href={service.link}
                                        className="text-black transition hover:text-[#5369A1]"
                                    >
                                        › &nbsp;&nbsp;&nbsp;{service.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Col>

                    <Col xs={24} md={8}>
                        <h4 className="mb-3 text-2xl font-bold">
                            Liên hệ với chúng tôi
                        </h4>
                        <ul className="space-y-4 text-xl font-extralight">
                            {contactInfo.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-2"
                                >
                                    {item.icon}
                                    {item.text}
                                </li>
                            ))}
                        </ul>
                    </Col>
                </Row>

                <p className="mt-6 text-center text-sm text-gray-600">
                    © 2025 tiawai
                </p>
            </div>
        </footer>
    );
};

export default Footer;
