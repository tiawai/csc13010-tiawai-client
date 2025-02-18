"use client";
import { useGetExamPracticesQuery, useGetExamsQuery } from "@/services/exam";
import { Flex, Space, Typography, Empty } from "antd";
import Image from "next/image";
import Link from "next/link";
import IconFrame from "@/ui/icon-frame";
import ExamFrame from "@/ui/exam-frame";
import GenerateButton from "@/ui/generate-button";
import homeMainImg from "@public/home-main-img.svg";
import home7Svg from "@public/home-7.svg";
import bigTiawai from "@public/big-tiawai.svg";
import homeIconBg2 from "@public/home-icon-bg-2.svg";
import home11 from "@public/home-11.png";
import homeGradientBg from "@public/home-gradient-bg.svg";
import FeaturesBox from "@/ui/home/features-box";
import { Exam } from "@/types/exam";
const { Title } = Typography;

const mainHighlights = [
    {
        src: "/home-9.png",
        alt: "home icon 9",
        title: "Dễ dàng sử dụng",
        description: "Thao tác đơn giản",
    },
    {
        src: "/home-10.png",
        alt: "home icon 10",
        title: "Trải nghiệm học vui vẻ",
        description:
            "Các bài tập dưới dạng trò chơi mang lại trải nghiệm khác biệt",
    },
];

export interface ExamData {
    key: string;
    type: string;
    tests: Exam[];
}

export default function Home() {
    const { data, isLoading } = useGetExamsQuery();
    const { data: practiceData } = useGetExamPracticesQuery();

    if (isLoading || !data || !practiceData) return;

    const examData: ExamData[] = [
        {
            key: "exam",
            type: "Đề thi thử theo mẫu THPTQG",
            tests: data,
        },
        {
            key: "practice",
            type: "Bài tập chuyên đề",
            tests: practiceData,
        },
    ];

    return (
        <main
            className={`flex select-none flex-col items-center justify-center`}
        >
            <Image
                className="absolute bottom-0 left-0 right-0 top-0 -z-50 max-h-[3100px] w-svw"
                src={homeGradientBg}
                alt="home gradient bg"
            />

            <div className="!flex bg-[url('/home-icon-bg.svg')] bg-cover py-20">
                <div className="!flex-[1]">
                    <Title className="!text-6xl !font-bold !leading-snug">
                        Nền tảng luyện thi THPTQG môn Tiếng Anh cùng với AI
                    </Title>
                    <Title
                        className="!pr-10 !font-normal !text-[#8A8A8A]"
                        level={5}
                    >
                        <span className="!font-chango text-xl">tiawai</span>{" "}
                        cung cấp đầy đủ nội dung chất lượng gồm các đề luyện thi
                        có sẵn và tạo ra bởi công nghệ AI, các bài luyện tập
                        theo chủ đề, hỗ trợ paraphrase đoạn văn, flashcard mỗi
                        ngày cùng với đó là Tia
                    </Title>
                </div>
                <Image
                    className="h-96 flex-[1] object-cover"
                    src={homeMainImg}
                    alt="home main image"
                    priority
                />
            </div>

            <FeaturesBox />

            <Flex className="!mb-20" vertical>
                <Space size={80} direction="vertical">
                    {examData &&
                        examData.map((exam: ExamData, index) => (
                            <div key={index}>
                                <Flex justify="space-between" align="center">
                                    <Flex align="center" className="!gap-4">
                                        <Title className="!m-0 !font-bold leading-none">
                                            {exam.type}
                                        </Title>
                                        {index == 1 ? <GenerateButton /> : null}
                                    </Flex>
                                    <Link
                                        href={`/${exam.key}`}
                                        className="h-max rounded-full px-4 py-2 font-roboto text-xl font-medium leading-none text-black transition duration-500 ease-in-out hover:bg-slate-300 hover:text-black"
                                    >
                                        Xem thêm &gt;
                                    </Link>
                                </Flex>
                                {exam.tests.length > 0 ? (
                                    <div className="mt-8 grid grid-cols-4 gap-4">
                                        {exam.tests.map((test, index) => (
                                            <ExamFrame
                                                key={index}
                                                examData={test}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <Empty
                                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                                        description="Không có dữ liệu"
                                        imageStyle={{
                                            height: 100,
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                </Space>
            </Flex>

            <div className="relative mb-20 flex items-center">
                <Image
                    className="h-auto max-w-lg"
                    src={bigTiawai}
                    alt="big tiawai"
                    loading="lazy"
                />
                <div className="">
                    <Space direction="vertical" size={46}>
                        <Title className="!m-0 !font-roboto !text-6xl !font-bold">
                            Trải nghiệm học cùng Tia
                        </Title>
                        {mainHighlights.map((highlight, index) => (
                            <Flex align="center" key={index}>
                                <Space size="large">
                                    <IconFrame
                                        bgColor="#0E0314"
                                        src={highlight.src}
                                        alt={highlight.alt}
                                        width={52}
                                        height={52}
                                    />
                                    <Flex vertical>
                                        <Title
                                            className="!m-0 !font-roboto"
                                            level={2}
                                        >
                                            {highlight.title}
                                        </Title>
                                        <Title
                                            className="!m-0 !font-roboto !font-medium !text-[#8A8A8A]"
                                            level={4}
                                        >
                                            {highlight.description}
                                        </Title>
                                    </Flex>
                                </Space>
                            </Flex>
                        ))}
                    </Space>
                </div>
                <Image
                    className="absolute"
                    loading="lazy"
                    src={homeIconBg2}
                    alt="home icon bg 2"
                />
                <Image
                    className="absolute -bottom-48 -left-10 rotate-180"
                    loading="lazy"
                    src={home7Svg}
                    alt="home icon 7"
                />
                <Image
                    className="absolute -bottom-36 -right-10"
                    loading="lazy"
                    src={home11}
                    alt="home icon 11"
                />
            </div>

            <Flex justify="center">
                <Space size={91}>
                    <Flex
                        className="min-w-[450px] rounded-[2rem] bg-[#E9DAE9] py-12"
                        justify="center"
                    >
                        <Space direction="vertical" size="large" align="center">
                            <Title className="!font-roboto" level={2}>
                                Paraphasing
                            </Title>
                            <IconFrame
                                src="/home-3.svg"
                                alt="home icon 3"
                                bgColor="#FFFFFF80"
                                frameSize="125px"
                                lazy={true}
                            ></IconFrame>
                            <Link
                                href="/paraphrase"
                                className="cursor-pointer rounded-full bg-[#4D2C5E] px-4 py-1 font-roboto text-lg font-medium text-white hover:text-white"
                            >
                                Xem thêm
                            </Link>
                        </Space>
                    </Flex>
                    <Flex
                        className="min-w-[450px] rounded-[2rem] bg-[#DAE3E9] py-12"
                        justify="center"
                    >
                        <Space direction="vertical" align="center" size="large">
                            <Title className="!font-roboto" level={2}>
                                Flashcard
                            </Title>
                            <IconFrame
                                src="/home-5.svg"
                                alt="home icon 3"
                                bgColor="#FFFFFF80"
                                frameSize="125px"
                                lazy={true}
                            ></IconFrame>
                            <Link
                                href="/flashcard"
                                className="cursor-pointer rounded-full bg-[#2C2F5E] px-4 py-1 font-roboto text-lg font-medium text-white hover:text-white"
                            >
                                Xem thêm
                            </Link>
                        </Space>
                    </Flex>
                </Space>
            </Flex>
        </main>
    );
}
