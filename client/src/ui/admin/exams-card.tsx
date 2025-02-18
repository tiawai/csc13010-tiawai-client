import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Flex } from "antd";
import Link from "next/link";
import React from "react";

const exams = [
    {
        name: "Đề thi minh họa THPT Quốc Gia 2023",
        pracitce: "Đề luyện tập số 1",
        category: "Phát âm",
        time: "60 phút",
        attempts: 100,
        uploadedAt: "22/12/2024",
        by: "admin",
    },
    {
        name: "Đề thi minh họa THPT Quốc Gia 2023",
        pracitce: "Đề luyện tập số 1",
        category: "Phát âm",
        time: "60 phút",
        attempts: 100,
        uploadedAt: "22/12/2024",
        by: "admin",
    },
    {
        name: "Đề thi minh họa THPT Quốc Gia 2023",
        pracitce: "Đề luyện tập số 1",
        category: "Phát âm",
        time: "60 phút",
        attempts: 100,
        uploadedAt: "22/12/2024",
        by: "admin",
    },
    {
        name: "Đề thi minh họa THPT Quốc Gia 2023",
        pracitce: "Đề luyện tập số 1",
        category: "Phát âm",
        time: "60 phút",
        attempts: 100,
        uploadedAt: "22/12/2024",
        by: "admin",
    },
    {
        name: "Đề thi minh họa THPT Quốc Gia 2023",
        pracitce: "Đề luyện tập số 1",
        category: "Phát âm",
        time: "60 phút",
        attempts: 100,
        uploadedAt: "22/12/2024",
        by: "admin",
    },
    {
        name: "Đề thi minh họa THPT Quốc Gia 2023",
        pracitce: "Đề luyện tập số 1",
        category: "Phát âm",
        time: "60 phút",
        attempts: 100,
        uploadedAt: "22/12/2024",
        by: "admin",
    },
];

const ExamsCard = ({
    type = "default",
}: Readonly<{ type?: "default" | "practice" }>) => {
    return (
        <Card
            className="font-roboto"
            style={{
                borderRadius: "32px",
                borderWidth: "2px",
                borderColor: "black",
                paddingLeft: "16px",
                paddingRight: "16px",
                paddingTop: "10px",
            }}
            bordered={true}
            title="Kho đề thi"
            extra={
                <Link
                    className="rounded-full bg-[#383A68] px-8 py-2 font-roboto text-base font-medium text-white transition-all duration-300 hover:text-white hover:brightness-150"
                    href="#"
                >
                    Xem thêm
                </Link>
            }
            styles={{
                header: {
                    border: "none",
                    fontSize: "24px",
                },
            }}
        >
            <Flex vertical gap={20}>
                {exams.map((exam, index) => (
                    <Flex
                        key={index}
                        align="center"
                        justify="space-between"
                        gap={20}
                    >
                        <div className="font-roboto text-base font-medium">
                            {type === "practice" ? exam.pracitce : exam.name}
                        </div>
                        {type === "practice" && (
                            <div className="font-roboto text-base font-medium">
                                {exam.category}
                            </div>
                        )}
                        <div className="font-roboto text-base font-medium">
                            {exam.time}
                        </div>
                        <div className="font-roboto text-base font-medium">
                            {exam.attempts.toLocaleString()} lượt thi
                        </div>
                        <div className="font-roboto text-base font-medium">
                            {exam.uploadedAt}
                        </div>
                        <Avatar icon={<UserOutlined />} />
                    </Flex>
                ))}
            </Flex>
        </Card>
    );
};

export default ExamsCard;
