import { Flex } from 'antd';
import { twJoin } from 'tailwind-merge';
import Title from 'antd/es/typography/Title';
import adminTiawai from '@public/admin/admin-tiawai.webp';
import Image from 'next/image';

export const BannerBackground = () => (
    <div className="absolute bottom-0 left-0 right-0 top-0 z-[-1] rounded-2xl bg-gradient-to-br from-[#BAEEF1] to-[#EFDBEE] blur-xl"></div>
);

export const BannerLayout = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => (
    <Flex
        align="center"
        justify="center"
        style={{
            position: 'relative',
            padding: '2rem',
            borderRadius: '1.5rem',
            gap: '2rem',
        }}
        className={twJoin('', className)}
    >
        {children}
    </Flex>
);

export const BannerTitle = ({ title }: { title: string }) => (
    <Title className="!text-5xl !font-bold !leading-snug">{title}</Title>
);

export const BannerSubTitle = ({ title }: { title: string }) => (
    <Title className="!text-2xl !font-light !leading-snug">{title}</Title>
);

export const AdminBanner = ({ text }: { text: string }) => {
    return (
        <Flex className="relative items-center justify-center">
            <div className="h-[383px] w-[1413px] rounded-full bg-[#ff7426]/10 blur-[127px]" />
            <Flex className="absolute top-0" align="center">
                <Image
                    src={adminTiawai}
                    alt="admin tiawai"
                    width={200}
                    priority
                />
                <div className="mt-16 font-roboto text-5xl font-bold leading-snug">
                    {text}
                </div>
            </Flex>
        </Flex>
    );
};
