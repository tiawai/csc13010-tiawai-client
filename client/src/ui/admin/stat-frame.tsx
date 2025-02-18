import { Flex } from "antd";
import Image, { StaticImageData } from "next/image";
import React from "react";

const StatFrame = ({
    theme = "pink",
    title,
    value,
    icon,
}: Readonly<{
    theme?: "pink" | "blue";
    title: string;
    value: number;
    icon: StaticImageData;
}>) => {
    const bgColor = theme === "pink" ? "#E9DAE9" : "#DAE3E9";
    const objColor = theme === "pink" ? "#4D2C5E" : "#2C2F5E";
    return (
        <Flex
            gap={20}
            className="rounded-xl px-6 py-4"
            style={{
                backgroundColor: bgColor,
                boxShadow: "0px 4px 25px 0px rgba(0,0,0,0.10)",
            }}
            align="center"
        >
            <Flex vertical gap={8}>
                <div className="max-w-32 font-roboto text-base font-bold capitalize">
                    {title}
                </div>
                <div
                    style={{ color: objColor }}
                    className="font-nunitosans text-3xl font-bold"
                >
                    {value.toLocaleString()}
                </div>
            </Flex>
            <Image src={icon} alt={title} width={80} />
        </Flex>
    );
};

export default StatFrame;
