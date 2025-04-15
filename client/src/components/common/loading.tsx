import { Spin } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';

export const Loading = () => {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-2">
            <Spin size="large" tip="Loading..." />
            <Paragraph>Loading...</Paragraph>
        </div>
    );
};
