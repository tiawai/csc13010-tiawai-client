'use client';
import { ArrowRightOutlined, CheckCircleFilled } from '@ant-design/icons';
import { Flex, Typography, Empty, Row, Col, Button, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import FeaturesBox from '@/ui/home/features-box';
import ClassFrame from '@/ui/home/class-frame';
import homeMainImg from '@public/home/home-main-img.svg';
import bigTiawai from '@public/home/big-tiawai.png';
import homeCircle1 from '@public/home/home-circle-1.svg';
import homeDots from '@public/home/home-dots.png';
import { HOME_TITLE, HOME_HEADERS, HOME_FIRST_FEATURES } from '@/strings/home';
import { useGetClassroomsQuery } from '@/services/classroom';
import { useGetTestsAnyoneQuery } from '@/services/test.service';
import { Classroom } from '@/types/classroom.type';
import { Exam } from '@/types/exam';
import { TestType } from '@/types/test.type';
import { TestFrame } from '@/components/test/test-ui';

const { Title, Paragraph } = Typography;

export interface ExamData {
    key: string;
    type: string;
    tests: Exam[];
}

const examData: ExamData[] = [
    {
        key: `/student/test?type=${encodeURIComponent(TestType.TOEIC_READING)}`,
        type: 'TOEIC Reading',
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
        key: `/student/test?type=${encodeURIComponent(TestType.TOEIC_LISTENING)}`,
        type: 'TOEIC Listening',
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
    {
        key: `/student/test?type=${encodeURIComponent(TestType.NATIONAL_TEST)}`,
        type: 'Bộ đề thi THPTQG',
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

const Heading: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className,
}) => {
    return (
        <Title
            className={twMerge(
                'font-montserrat !text-5xl !font-black capitalize !leading-[1.17] !text-[#0E2A46]',
                className,
            )}
        >
            {children}
        </Title>
    );
};

const Description: React.FC<{
    children: React.ReactNode;
    className?: string;
}> = ({ children, className }) => {
    return (
        <Paragraph
            className={twMerge(
                'color-[#333931] font-montserrat text-2xl',
                className,
            )}
        >
            {children}
        </Paragraph>
    );
};

export default function Home() {
    const { data: toeicReadingTests } = useGetTestsAnyoneQuery(
        TestType.TOEIC_READING,
    );
    const { data: toeicListeningTests } = useGetTestsAnyoneQuery(
        TestType.TOEIC_LISTENING,
    );
    const { data: nationalTests } = useGetTestsAnyoneQuery(
        TestType.NATIONAL_TEST,
    );
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
    const [popularClassrooms, setPopularClassrooms] = useState<Classroom[]>([]);
    const { data: classData = [], isLoading: isLoadingClassrooms } =
        useGetClassroomsQuery();
    const router = useRouter();

    useEffect(() => {
        if (classData.length > 0) {
            const topClasses = [...classData]
                .sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0))
                .slice(0, 3);
            setPopularClassrooms(topClasses);
        }
    }, [classData]);

    return (
        <main className="flex select-none flex-col items-center justify-center">
            <div
                className="absolute inset-0 -z-50 h-[800px] blur-[77px]"
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

            <Flex className="mx-auto mb-40 w-full" justify="space-between">
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
                            loading="lazy"
                        />
                    </Flex>

                    <Heading>{HOME_HEADERS[0].title}</Heading>

                    <Image
                        src={homeCircle1}
                        alt="home circle 1"
                        className="absolute right-12 top-10 scale-95"
                        loading="lazy"
                    />

                    <Flex vertical className="pr-20">
                        <Description>{HOME_HEADERS[0].description}</Description>
                        <Row
                            gutter={[16, 16]}
                            className="pr-3 font-montserrat text-base font-semibold capitalize text-[#0E2A46]"
                        >
                            {HOME_FIRST_FEATURES.map((feature, index) => (
                                <Col
                                    key={index}
                                    lg={12}
                                    md={24}
                                    className="h-[120px]"
                                >
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
                <Flex className="relative flex-[0.6] justify-center">
                    <Image
                        width={300}
                        height={442}
                        className="relative z-10 scale-90 self-center"
                        src={bigTiawai}
                        alt="big tiawai"
                        loading="lazy"
                    />
                    <Image
                        src={homeDots}
                        alt="home dots"
                        className="absolute bottom-1/2 right-0 scale-75"
                        loading="lazy"
                    />
                    <div
                        id="circle-1"
                        className="absolute left-1/2 top-1/2 h-[650px] w-[700px] -translate-x-1/2 -translate-y-1/2 scale-75 rounded-full border border-black"
                    />
                    <div
                        id="circle-2"
                        className="absolute left-2/3 top-2/3 size-[250px] rounded-full border border-black"
                    />
                    <div
                        id="bg"
                        className="absolute left-16 top-40 -z-10 h-[459px] w-[528px] scale-90 rounded-full bg-[#269dff]/30 blur-[100px]"
                    />
                </Flex>
            </Flex>

            <div className="relative mb-40 w-[calc(100vw-2rem)]">
                <div className="absolute inset-0 -z-10 h-full bg-gradient-to-bl from-[#b9edf1]/50 to-[#efdbee]/50 opacity-90 blur-[77px]" />
                <Flex
                    vertical
                    className="mx-auto max-w-[1320px]"
                    align="center"
                >
                    <Heading className="relative !text-[2.7rem]">
                        {HOME_HEADERS[1].title}
                    </Heading>
                    <Flex justify="space-between" className="mb-2" gap={70}>
                        <div className="flex-1">
                            <Description>
                                {HOME_HEADERS[1].description}
                            </Description>
                        </div>{' '}
                        <Button
                            variant="solid"
                            size="middle"
                            className="group relative flex-[0.4] self-start !rounded-[40px] !bg-secondary-button !font-montserrat !font-bold !text-white"
                            onClick={() => router.push('/student/class')}
                        >
                            Khám phá thêm lớp học
                            <div className="absolute -right-1 top-0 aspect-square h-full content-center justify-center rounded-full bg-[#DAE3E9] transition-all duration-300 group-hover:translate-x-4 group-hover:opacity-0">
                                <ArrowRightOutlined className="!text-black" />
                            </div>
                        </Button>
                    </Flex>
                    {isLoadingClassrooms ? (
                        <div className="flex justify-center">
                            <Spin size="large" />
                        </div>
                    ) : (
                        <Row gutter={[40, 24]} className="mb-10">
                            {popularClassrooms.map((classItem) => (
                                <Col xs={24} md={12} lg={8} key={classItem.id}>
                                    <ClassFrame class={classItem} />
                                </Col>
                            ))}
                        </Row>
                    )}
                </Flex>
            </div>

            <Flex className="mb-40 !w-full" vertical>
                <Flex vertical align="center">
                    <Heading className="relative !text-[2.7rem]">
                        {HOME_HEADERS[2].title}
                    </Heading>
                    <Description className="!px-20 text-center">
                        {HOME_HEADERS[2].description}
                    </Description>
                </Flex>

                <Flex justify="space-between" align="center">
                    <Title className="!m-0 leading-none">
                        {examData[2].type}
                    </Title>
                    <Link
                        href={`${examData[0].key}`}
                        className="h-max rounded-full px-4 py-2 font-roboto text-xl font-medium leading-none text-black transition duration-500 ease-in-out hover:bg-slate-300 hover:text-black"
                    >
                        Xem thêm &gt;
                    </Link>
                </Flex>

                {toeicReadingTests && toeicReadingTests?.length > 0 ? (
                    <Row className="mt-8" gutter={[24, 24]}>
                        {toeicReadingTests.map((test, index) => (
                            <Col xs={24} md={12} lg={6} key={index}>
                                <TestFrame
                                    key={index}
                                    theme={'pink'}
                                    test={test}
                                />
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="Không có dữ liệu"
                        imageStyle={{
                            height: 100,
                        }}
                    />
                )}

                <Flex className="!mt-10" justify="space-between" align="center">
                    <Title className="!m-0 capitalize leading-none">
                        {examData[1].type}
                    </Title>
                    <Link
                        href={`${examData[1].key}`}
                        className="h-max rounded-full px-4 py-2 font-roboto text-xl font-medium leading-none text-black transition duration-500 ease-in-out hover:bg-slate-300 hover:text-black"
                    >
                        Xem thêm &gt;
                    </Link>
                </Flex>

                {toeicListeningTests && toeicListeningTests?.length > 0 ? (
                    <Row className="mt-8" gutter={[24, 24]}>
                        {toeicListeningTests.map((test, index) => (
                            <Col xs={24} md={12} lg={6} key={index}>
                                <TestFrame
                                    key={index}
                                    theme={'pink'}
                                    test={test}
                                />
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="Không có dữ liệu"
                        imageStyle={{
                            height: 100,
                        }}
                    />
                )}
            </Flex>

            <Flex vertical className="mb-40">
                <Flex vertical align="center">
                    <Heading className="relative !text-[2.7rem]">
                        {HOME_HEADERS[3].title}
                    </Heading>
                    <Description className="!px-20 text-center">
                        {HOME_HEADERS[3].description}
                    </Description>
                </Flex>
                <Flex justify="space-between" align="center">
                    <Title className="!m-0 capitalize leading-none">
                        {examData[2].type}
                    </Title>
                    <Link
                        href={`${examData[2].key}`}
                        className="h-max rounded-full px-4 py-2 font-roboto text-xl font-medium leading-none text-black transition duration-500 ease-in-out hover:bg-slate-300 hover:text-black"
                    >
                        Xem thêm &gt;
                    </Link>
                </Flex>
                {nationalTests && nationalTests.length > 0 ? (
                    <Row className="mt-8" gutter={[24, 24]}>
                        {nationalTests.map((test, index) => (
                            <Col xs={24} md={12} lg={6} key={index}>
                                <TestFrame
                                    key={index}
                                    theme={'blue'}
                                    test={test}
                                />
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="Không có dữ liệu"
                        imageStyle={{
                            height: 100,
                        }}
                    />
                )}
            </Flex>
        </main>
    );
}
