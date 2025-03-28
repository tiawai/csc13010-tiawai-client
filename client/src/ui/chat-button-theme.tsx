'use client';
import { ConfigProvider } from 'antd';

export const ChatButtonTheme = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#5369A1',
                    fontSizeIcon: 48,
                    controlHeight: 56.8,
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
};
