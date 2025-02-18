"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Flex, Space, Button, Typography } from "antd";
import IconFrame from "./icon-frame";
import { Exam } from "@/types/exam";
const { Text, Title } = Typography;

const examInfo = [
    {
        src: "/clock.svg",
        alt: "clock",
    },
    {
        src: "/download.svg",
        alt: "download",
    },
];

const ExamFrame = ({
    theme = "pink",
    examData,
}: Readonly<{
    theme?: "pink" | "blue";
    examData: Exam;
}>) => {
    const router = useRouter();
    const iconSrc = theme === "pink" ? "/home-8.svg" : "/home-4.png";
    const iconAlt = theme === "pink" ? "home icon 8" : "home icon 4";
    const bgColor = theme === "pink" ? "#E9DAE9" : "#DAE3E9";
    const objColor = theme === "pink" ? "#4D2C5E" : "#2C2F5E";
    const size = theme === "pink" ? 100 : 62;
    const { title, duration, totalAttempts } = examData;

    return (
        <Flex
            className="!w-full !gap-3 !rounded-xl !py-4 px-3"
            style={{
                backgroundColor: bgColor,
                boxShadow: "0px 4px 25px 0px rgba(0,0,0,0.10)",
            }}
            align="center"
        >
            <IconFrame
                className="aspect-square min-h-max min-w-max"
                bgColor={objColor}
                src={iconSrc}
                alt={iconAlt}
                width={size}
                height={size}
            />
            <Flex className="!max-w-full gap-4" vertical>
                <Title
                    className="!m-0 !max-w-[65%] truncate !font-roboto"
                    level={5}
                >
                    {title}
                </Title>
                <Flex justify="space-between">
                    <Space size="large">
                        {examInfo.map((info, index) => (
                            <Flex align="center" key={index}>
                                <Space>
                                    <Image
                                        src={info.src}
                                        alt={info.alt}
                                        width={18}
                                        height={18}
                                    />
                                    <Text className="!text-nowrap !font-roboto !font-medium !text-[#ACACAC]">
                                        {info.alt === "clock"
                                            ? `${duration} phút`
                                            : `${totalAttempts} lượt làm`}
                                    </Text>
                                </Space>
                            </Flex>
                        ))}
                    </Space>
                </Flex>
                <div>
                    <Button
                        shape="round"
                        type="primary"
                        size="small"
                        onClick={() => router.push(`/exam/${examData.id}`)}
                    >
                        Xem đề thi
                    </Button>
                </div>
            </Flex>
        </Flex>
    );
};

export default ExamFrame;
