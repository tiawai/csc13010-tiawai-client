'use client';
import { Flex, Typography } from 'antd';
import IconFrame from '../icon-frame';
import Image from 'next/image';
import home7Svg from '@public/home/home-7.svg';
import home7Png from '@public/home/home-7.png';
import { twMerge } from 'tailwind-merge';
import { HOME_FEATURES } from '@/strings/home';
const { Title, Paragraph } = Typography;

const mainFeatures = [
    {
        src: '/home/home-1.png',
        alt: 'home icon 1',
        title: HOME_FEATURES[0].title,
        description: HOME_FEATURES[0].description,
    },
    {
        src: '/home/home-2.svg',
        alt: 'home icon 2',
        title: HOME_FEATURES[1].title,
        description: HOME_FEATURES[1].description,
    },
    {
        src: '/home/home-3.svg',
        alt: 'home icon 3',
        title: HOME_FEATURES[2].title,
        description: HOME_FEATURES[2].description,
    },
    {
        src: '/home/home-4.png',
        alt: 'home icon 4',
        title: HOME_FEATURES[3].title,
        description: HOME_FEATURES[3].description,
    },
    {
        src: '/home/home-5.svg',
        alt: 'home icon 5',
        title: HOME_FEATURES[4].title,
        description: HOME_FEATURES[4].description,
    },
    {
        src: '/home/home-6.svg',
        alt: 'home icon 6',
        title: HOME_FEATURES[5].title,
        description: HOME_FEATURES[5].description,
    },
];

const FeaturesBox = ({ className = '' }: Readonly<{ className?: string }>) => {
    return (
        <Flex
            className={twMerge(
                'relative mb-40 select-none justify-center p-8',
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
                className="absolute -bottom-8 -right-40 h-auto"
            />
            <Image
                src={home7Png}
                alt="home icon 7"
                className="absolute -bottom-8 -left-32 h-auto"
            />
        </Flex>
    );
};

export default FeaturesBox;
