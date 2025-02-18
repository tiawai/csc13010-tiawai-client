'use client';
import { Flex, Typography } from 'antd';
import IconFrame from '../icon-frame';
import Image from 'next/image';
import home7Svg from '@public/home-7.svg';
import home7Png from '@public/home-7.png';
import { twMerge } from 'tailwind-merge';
const { Title, Paragraph } = Typography;

const mainFeatures = [
    {
        src: '/home-1.png',
        alt: 'home icon 1',
        title: 'Luyện từng dạng bài tập',
        description:
            'Cung cấp kho bài tập khổng lồ tự các nguồn chính thống và do AI tạo ra',
    },
    {
        src: '/home-2.svg',
        alt: 'home icon 2',
        title: 'Chatbox với Tia',
        description:
            'Tia hỗ trợ giải đáp các câu hỏi liên quan tới Tiếng Anh cùng vô vàn những sự hỗ trợ khác',
    },
    {
        src: '/home-3.svg',
        alt: 'home icon 3',
        title: 'Paraphrase',
        description:
            'Hỗ trợ viết lại câu hoặc đoạn văn bằng từ ngữ, ngữ pháp, và cấu trúc câu khác những vẫn giữ nguyên ý nghĩa câu',
    },
    {
        src: '/home-4.png',
        alt: 'home icon 4',
        title: 'Luyện đề thi',
        description:
            'Đề thi THPTQG với trải nghiệm thi thật và kho đề chính thống và do AI tạo ra kèm giải thích chi tiết',
    },
    {
        src: '/home-5.svg',
        alt: 'home icon 5',
        title: 'Flashcard',
        description:
            'Cung cấp mỗi ngày 10 từ vựng cho bạn bằng phương pháp Flashcard',
    },
    {
        src: '/home-6.svg',
        alt: 'home icon 6',
        title: 'Dịch thuật',
        description:
            'Hỗ trợ dịch ngôn ngữ Anh-Việt, cung cấp đầy đủ loại từ, ví dụ đi kèm,... ',
    },
];

const FeaturesBox = ({ className = '' }: Readonly<{ className?: string }>) => {
    return (
        <Flex
            className={twMerge(
                'relative mb-20 select-none justify-center p-8',
                className,
            )}
        >
            <div className="max-h-[26.75rem] max-w-[89.5rem] rounded-xl bg-[rgba(83,105,161,0.7)] p-8">
                <div className="relative mb-28 content-center text-center text-5xl font-black text-[#050C26]">
                    <div className="absolute left-[61%] top-[1.75rem] h-[3.75rem] w-[3.75rem] content-center rounded-full bg-[rgba(217,217,217,0.3)] text-white">
                        ?
                    </div>
                    <Title className="!absolute !left-[38%]">
                        <span className="!font-chango !font-normal !text-[#F5F6FC]">
                            tiawai
                        </span>{' '}
                        <b>có gì</b>
                    </Title>
                </div>
                <div className="grid grid-cols-3 grid-rows-2 gap-4">
                    {mainFeatures.map((feature, index) => (
                        <div key={index} className="flex gap-4">
                            <div className="content-center">
                                <IconFrame
                                    src={feature.src}
                                    alt={feature.alt}
                                    bgColor="rgba(255,255,255,0.2)"
                                />
                            </div>
                            <div className="content-center">
                                <Title
                                    className="!font-bold !text-white"
                                    level={4}
                                >
                                    {feature.title}
                                </Title>
                                <Paragraph className="!m-0 !text-justify !font-roboto !font-medium !text-white/60">
                                    {feature.description}
                                </Paragraph>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Image
                src={home7Svg}
                alt="home icon 7"
                className="absolute -bottom-8 -right-8 h-auto"
            />
            <Image
                src={home7Png}
                alt="home icon 7"
                className="absolute -bottom-8 left-0 h-auto"
            />
        </Flex>
    );
};

export default FeaturesBox;
