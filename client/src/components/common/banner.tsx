import { Flex } from 'antd';
import { twJoin } from 'tailwind-merge';
import Title from 'antd/es/typography/Title';

const BannerBackground = () => (
    <div className="absolute bottom-0 left-0 right-0 top-0 z-[-1] rounded-2xl bg-gradient-to-br from-[#BAEEF1] to-[#EFDBEE] blur-xl"></div>
);

const BannerLayout = ({
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

const BannerTitle = ({ title }: { title: string }) => (
    <Title className="!text-5xl !font-bold !leading-snug">{title}</Title>
);

const BannerSubTitle = ({ title }: { title: string }) => (
    <Title className="!text-2xl !font-light !leading-snug">{title}</Title>
);

export { BannerBackground, BannerLayout, BannerTitle, BannerSubTitle };
