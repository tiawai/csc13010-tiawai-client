import { Flex } from 'antd';
import { Banner, BannerDescription, BannerTitle } from './banner';
import Image, { StaticImageData } from 'next/image';
import bigTiawai from '@public/big-tiawai-2.svg';

interface LeftTextBannerProps {
    title: string;
    description: string;
    src?: string | StaticImageData;
}

const LeftTextBanner = ({
    title,
    description,
    src = bigTiawai,
}: LeftTextBannerProps) => {
    return (
        <Banner className="mb-28">
            <Flex vertical className="mt-10">
                <BannerTitle>{title}</BannerTitle>
                <BannerDescription>{description}</BannerDescription>
            </Flex>
            <Image src={src} className="h-auto w-[70%]" alt="big tiawai" />
        </Banner>
    );
};

export default LeftTextBanner;
