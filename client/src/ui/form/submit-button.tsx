"use client";
import { Button } from "antd";
import { backgroundGradient } from "./btn-bg-gradient";
import { RightOutlined } from "@ant-design/icons";

export const ButtonGradient = ({ loading }: { loading?: boolean }) => {
    const { styles } = backgroundGradient();

    return (
        <Button
            className={`${styles.linearGradientButton} !m-auto !flex !min-h-14 !min-w-14 !items-center`}
            type="primary"
            shape="circle"
            htmlType="submit"
            loading={loading}
            icon={
                <RightOutlined className="aspect-square min-h-max min-w-max text-3xl" />
            }
        />
    );
};
