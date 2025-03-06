'use client';
// import { useGetExamPracticesQuery, useGetExamsQuery } from "@/services/exam";
import { Flex, Space, Typography, Empty, Row, Col } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import IconFrame from '@/ui/icon-frame';
import ExamFrame from '@/ui/exam-frame';
import GenerateButton from '@/ui/generate-button';
import homeMainImg from '@public/home/home-main-img.svg';
import bigTiawai from '@public/home/big-tiawai.png';
import FeaturesBox from '@/ui/home/features-box';
import { Exam } from '@/types/exam';
import { HOME_TITLE, HOME_HEADERS, HOME_FIRST_FEATURES } from '@/string/home';
import { CheckCircleFilled } from '@ant-design/icons';
import homeCircle1 from '@public/home/home-circle-1.svg';
const { Title, Paragraph } = Typography;

export interface ExamData {
    key: string;
    type: string;
    tests: Exam[];
}

const examData: ExamData[] = [
    {
        key: 'exam',
        type: 'Đề thi thử theo mẫu THPTQG',
        tests: [
            {
                id: 1,
                title: 'Đề thi thử số 1',
                totalQuestions: 10,
                questions: [],
                duration: 10,
                totalAttempts: 0,
                uploadedAt: '2024-01-01',
            },
            {
                id: 2,
                title: 'Đề thi thử số 2',
                totalQuestions: 10,
                questions: [],
                duration: 10,
                totalAttempts: 0,
                uploadedAt: '2024-01-01',
            },
            {
                id: 3,
                title: 'Đề thi thử số 3',
                totalQuestions: 10,
                questions: [],
                duration: 10,
                totalAttempts: 0,
                uploadedAt: '2024-01-01',
            },
            {
                id: 4,
                title: 'Đề thi thử số 4',
                totalQuestions: 10,
                questions: [],
                duration: 10,
                totalAttempts: 0,
                uploadedAt: '2024-01-01',
            },
        ],
    },
    {
        key: 'practice',
        type: 'Bài tập chuyên đề',
        tests: [
            {
                id: 1,
                title: 'Bài tập chuyên đề số 1',
                totalQuestions: 10,
                questions: [],
                duration: 10,
                totalAttempts: 0,
                uploadedAt: '2024-01-01',
            },
            {
                id: 2,
                title: 'Bài tập chuyên đề số 2',
                totalQuestions: 10,
                questions: [],
                duration: 10,
                totalAttempts: 0,
                uploadedAt: '2024-01-01',
            },
            {
                id: 3,
                title: 'Bài tập chuyên đề số 3',
                totalQuestions: 10,
                questions: [],
                duration: 10,
                totalAttempts: 0,
                uploadedAt: '2024-01-01',
            },
            {
                id: 4,
                title: 'Bài tập chuyên đề số 4',
                totalQuestions: 10,
                questions: [],
                duration: 10,
                totalAttempts: 0,
                uploadedAt: '2024-01-01',
            },
        ],
    },
];

const Heading: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Title className="font-montserrat !text-5xl !font-black capitalize !leading-[1.17] !text-[#0E2A46]">
            {children}
        </Title>
    );
};

const Description: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Paragraph className="color-[#333931] font-montserrat text-2xl">
            {children}
        </Paragraph>
    );
};

export default function Home() {
    // const { data, isLoading } = useGetExamsQuery();
    // const { data: practiceData } = useGetExamPracticesQuery();

    // if (isLoading || !data || !practiceData) return;

    // const examData: ExamData[] = [
    //     {
    //         key: "exam",
    //         type: "Đề thi thử theo mẫu THPTQG",
    //         tests: data,
    //     },
    //     {
    //         key: "practice",
    //         type: "Bài tập chuyên đề",
    //         tests: practiceData,
    //     },
    // ];

    return (
        <main
            className={`flex select-none flex-col items-center justify-center`}
        >
            <div
                className="absolute -left-10 -right-10 -top-10 -z-50 h-[800px] blur-[77px]"
                style={{
                    background:
                        'linear-gradient(247deg, #BAEEF1 0%, #EFDBEE 94%)',
                }}
            />
            <div className="flex items-center gap-8 py-20">
                <div className="flex-[1.1]">
                    <Title className="font-montserrat !text-6xl !font-extrabold !leading-tight">
                        {HOME_TITLE}
                    </Title>
                </div>
                <div className="flex-1">
                    <div className="absolute right-72 top-36 -z-10 size-72 rounded-full border-[40px] border-[#f2c94c]/20" />
                    <Image
                        className="h-auto w-full object-contain"
                        src={homeMainImg}
                        alt="home main image"
                        priority
                    />
                </div>
            </div>

            <FeaturesBox />

            <Flex className="mx-auto mb-20 w-full p-8" justify="space-between">
                <Flex vertical flex="0.7" className="relative">
                    <Flex
                        align="center"
                        justify="space-between"
                        className="mb-4 pr-28"
                    >
                        <span className="rounded-xl bg-primary px-4 py-2 font-montserrat font-bold">
                            <i>Tại sao nên chọn tiawai</i>
                        </span>
                        <Image
                            src="/home/home-waves.png"
                            className="self-center"
                            width={80}
                            height={10}
                            alt="home waves"
                        />
                    </Flex>

                    <Heading>{HOME_HEADERS[0].title}</Heading>

                    <Image
                        src={homeCircle1}
                        alt="home circle 1"
                        className="absolute right-6 top-10 scale-95"
                    />

                    <Flex vertical className="pr-20">
                        <Description>{HOME_HEADERS[0].description}</Description>
                        <Row
                            gutter={[16, 16]}
                            className="pr-3 font-montserrat text-base font-semibold capitalize text-[#0E2A46]"
                        >
                            {HOME_FIRST_FEATURES.map((feature, index) => (
                                <Col key={index} span={12} className="h-2/3">
                                    <Flex
                                        align="center"
                                        className="h-full content-center justify-center rounded-[40px] bg-primary px-6 py-3"
                                        gap={10}
                                    >
                                        <CheckCircleFilled className="!text-primary" />
                                        <div>{feature}</div>
                                    </Flex>
                                </Col>
                            ))}
                        </Row>
                    </Flex>
                </Flex>
                <Flex className="flex-[0.6] justify-center">
                    <Image
                        width={350}
                        height={492}
                        className="self-center"
                        src={bigTiawai}
                        alt="big tiawai"
                        loading="lazy"
                    />
                </Flex>
            </Flex>

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
                                src="/home/home-3.svg"
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
                                src="/home/home-5.svg"
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
