'use client';
import { Flex } from 'antd';
import { twJoin } from 'tailwind-merge';
import { Typography } from 'antd';
const { Title, Paragraph } = Typography;

export const Banner = ({
    children,
    className = '',
    gap,
}: Readonly<{
    children: React.ReactNode;
    className?: string;
    gap?: number;
}>) => {
    return (
        <Flex
            align="center"
            justify="center"
            gap={gap}
            style={{
                position: 'relative',
                isolation: 'isolate',
            }}
            className={twJoin('mx-auto p-8', className)}
        >
            <div
                style={{
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background:
                        'linear-gradient(247deg,#BAEEF1 0.85%,#EFDBEE 89.91%)',
                    boxShadow: '0px 4px 154px 0px rgba(44, 21, 73, 0.25)',
                    filter: 'blur(77px)',
                    zIndex: -1,
                }}
            />
            {children}
        </Flex>
    );
};

export const BannerTitle = ({ children }: { children: React.ReactNode }) => (
    <Title className="font-montserrat !text-5xl !font-extrabold !leading-tight">
        {children}
    </Title>
);

export const BannerDescription = ({
    children,
}: {
    children: React.ReactNode;
}) => (
    <Paragraph className="font-montserrat !text-2xl !leading-tight">
        {children}
    </Paragraph>
);
