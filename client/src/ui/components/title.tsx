'use client';
import { Typography } from 'antd';
import { twMerge } from 'tailwind-merge';
const { Title } = Typography;

export const FormTitle = ({ children }: { children: React.ReactNode }) => (
    <Title className="!text-center !font-instrument !font-normal">
        {children}
    </Title>
);

export const CustomTitle = ({
    children,
    className,
    level,
}: {
    children: React.ReactNode;
    className?: string;
    level?: 1 | 2 | 3 | 4 | 5;
}) => (
    <Title level={level} className={twMerge('font-montserrat', className)}>
        {children}
    </Title>
);
