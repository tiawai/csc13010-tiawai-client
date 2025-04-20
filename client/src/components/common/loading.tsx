import { Spin } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import clsx from 'clsx';

export const Loading = ({ className }: { className?: string }) => {
    return (
        <div
            className={clsx(
                'flex h-full flex-col items-center justify-center gap-2',
                className,
            )}
        >
            <Spin size="large" tip="Loading..." />
            <Paragraph>Loading...</Paragraph>
        </div>
    );
};
