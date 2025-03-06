'use client';
import { Typography } from 'antd';
const { Title } = Typography;

export const FormTitle = ({ children }: { children: React.ReactNode }) => (
    <Title className="!text-center !font-instrument !font-normal">
        {children}
    </Title>
);

export const BannerTitle = ({ children }: { children: React.ReactNode }) => (
    <Title className="!text-5xl !font-bold !leading-snug">{children}</Title>
);
