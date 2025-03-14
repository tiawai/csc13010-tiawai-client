'use client';
import { Typography } from 'antd';
const { Title } = Typography;

export const FormTitle = ({ children }: { children: React.ReactNode }) => (
    <Title className="!text-center !font-instrument !font-normal">
        {children}
    </Title>
);
