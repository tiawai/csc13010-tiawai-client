import React from "react";
import { Preview } from "@storybook/react";
import { theme } from "../src/app/theme";
import { ConfigProvider } from "antd";

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [
        (Story) => (
            <ConfigProvider theme={theme}>
                <Story />
            </ConfigProvider>
        ),
    ],
};

export default preview;
