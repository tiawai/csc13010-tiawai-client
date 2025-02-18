"use client";

import { ConfigProvider, App, notification } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export const theme = {
    token: {
        colorPrimary: "#4d2c5e",
        colorBgContainerDisabled: "#d4d4d8",
    },
};

notification.config({
    placement: "topRight",
    showProgress: true,
    duration: 3,
});

export default function ThemeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AntdRegistry>
            <ConfigProvider theme={theme}>
                <App>{children}</App>
            </ConfigProvider>
        </AntdRegistry>
    );
}
