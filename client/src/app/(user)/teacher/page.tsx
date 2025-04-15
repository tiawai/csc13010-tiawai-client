'use client';

import Image from 'next/image';
import { Typography } from 'antd';
import homeMainImg from '@public/home/home-main-img.svg';
import Teacher from '@public/tiawai-teacher.png';
import TiaMascot from '@public/mascot/full.webp';

const { Title } = Typography;

const features = [
    { title: 'Tạo Lớp Học', color: 'bg-[#DAE3E9]', link: '#' },
    { title: 'Quản Lý Lớp Học', color: 'bg-[#E9DAE9]', link: '#' },
    { title: 'Tạo Đề Thi/ Bài Học', color: 'bg-[#E9DAE9]', link: '#' },
    { title: 'Quản Lý Đề Thi/ Bài Học', color: 'bg-[#DAE3E9]', link: '#' },
];

const benefits = [
    '✅ Tạo đề thi tự động – Chỉ cần nhập yêu cầu, Tia sẽ lo phần còn lại!',
    '✅ Đề xuất bài tập thông minh – Cá nhân hóa theo trình độ học sinh.',
    '✅ Hỗ trợ nhiều dạng bài – Trắc nghiệm, tự luận, điền khuyết,…',
    '✅ Tiết kiệm thời gian – Giảm tải công việc, tập trung vào giảng dạy.',
    '💰 Tính phí theo gói sử dụng – Đầu tư nhỏ, lợi ích lớn!',
];

export default function Home() {
    return (
        <div className="flex select-none flex-col items-center justify-center">
            <div
                className="absolute inset-0 -z-50 h-[800px] blur-[77px]"
                style={{
                    background:
                        'linear-gradient(247deg, #BAEEF1 0%, #EFDBEE 94%)',
                }}
            />
            <div className="flex flex-col items-center px-6 py-20 md:flex-row">
                <div className="flex-1">
                    <Title className="!text-5xl !font-bold !leading-snug">
                        Tiawai Teacher – Dễ dàng quản lý, truyền cảm hứng mỗi
                        ngày!✨
                    </Title>
                    <Title
                        className="!pr-10 !font-normal !text-[#8A8A8A]"
                        level={5}
                    >
                        <span className="!font-chango text-xl">tiawai</span>{' '}
                        Quản lý lớp học chuyên nghiệp với các công cụ tạo bài
                        giảng, bài tập và đề thi tự động. Thêm học sinh nhanh
                        chóng, theo dõi tiến trình lớp học dễ dàng và mang đến
                        trải nghiệm học tập hiệu quả nhất. Cùng Tiawai xây dựng
                        lớp học thông minh, hiện đại! 🚀📚
                    </Title>
                </div>
                <Image
                    className="h-96 flex-1 object-cover"
                    src={homeMainImg}
                    alt="home main image"
                    priority
                />
            </div>

            <section className="mt-28 flex flex-col items-center justify-center space-y-8 px-0 py-16 lg:flex-row lg:space-x-12 lg:space-y-0">
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl font-extrabold text-[#1D1D1D]">
                        Khám Phá{' '}
                        <span className="text-[#4A4A8A]">Tiawai Teacher</span>
                    </h1>
                    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                        {features.map((item, index) => (
                            <a
                                key={index}
                                href={item.link}
                                className={`flex h-full min-h-[140px] flex-col justify-between rounded-lg ${item.color} px-6 py-4 shadow-md transition hover:scale-105`}
                            >
                                <span className="flex items-center text-lg font-medium text-[#4A4A8A]">
                                    ✔ {item.title}
                                </span>
                                <button className="self-end rounded-full bg-[#4D2C5E] px-4 py-2 text-sm text-white">
                                    Khám Phá
                                </button>
                            </a>
                        ))}
                    </div>
                </div>
                <div className="relative flex justify-center">
                    <Image
                        src={Teacher}
                        alt="Tiawai Mascot"
                        width={700}
                        height={700}
                        className="drop-shadow-lg"
                    />
                </div>
            </section>

            <section className="relative flex min-h-40 w-screen flex-col items-center justify-center rounded-2xl py-12 md:flex-row md:items-center md:gap-1">
                <div
                    className="absolute inset-0 -z-50 h-[800px] blur-[77px]"
                    style={{
                        background:
                            'linear-gradient(247.19deg, #BAEEF1 0.85%, #EFDBEE 89.91%)',
                    }}
                />
                <div className="relative mt-[-70px] h-[300px] w-[300px] md:h-[600px] md:w-[600px]">
                    <Image
                        src={TiaMascot}
                        alt="Mascot Tia AI"
                        layout="fill"
                        objectFit="contain"
                        priority
                    />
                </div>
                <div className="max-w-lg text-left">
                    <Title
                        level={2}
                        className="!text-3xl !font-bold md:!text-4xl"
                    >
                        Tia – Trợ lý AI thông minh cho giáo viên! 🤖✨
                    </Title>
                    <ul className="space-y-2 text-lg">
                        Tia giúp bạn tạo đề thi & bài tập nhanh chóng, chính xác
                        và phù hợp với từng học sinh. Với Tia, bạn có thể:
                        {benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                        ))}
                        <b>
                            Trải nghiệm ngay Tia và nâng cấp cách giảng dạy của
                            bạn!
                        </b>
                    </ul>
                </div>
            </section>
        </div>
    );
}
