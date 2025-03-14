'use client';
import Image from 'next/image';
import {
    Card,
    Flex,
    Input,
    Space,
    Button as AntdButton,
    Typography,
    Empty,
} from 'antd';
import { Banner, BannerTitle } from '@/ui/components/banner';
import profileTiawai from '@public/profile-tiawai.webp';
import { useState, useEffect } from 'react';
import { useGetHistoryExamsQuery } from '@/services/user';
import { SearchOutlined } from '@ant-design/icons';
import { FilterIcon } from '@/ui/admin/icons';
import { UserHistoryExam } from '@/types/exam';
import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/navigation';
import IconFrame from '@/ui/icon-frame';
import { ReloadOutlined, EyeOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

interface History {
    title: string;
    buttonName: string;
    data: UserHistoryExam[];
    onClick?: () => void;
}

const History = () => {
    const { data, isLoading } = useGetHistoryExamsQuery();
    const [filteredData, setFilteredData] = useState<UserHistoryExam[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);

    useEffect(() => {
        setFilteredData(data || []);
    }, [data]);

    if (isLoading) return null;

    console.log(data);

    const history: History[] = [
        {
            title: 'Danh sách đề thi',
            buttonName: 'Lịch sử làm đề thi',
            data: data?.filter((item) => !item.isGenerated) || [],
        },
        {
            title: 'Danh sách đề luyện tập',
            buttonName: 'Lịch sử làm luyện tập',
            data: data?.filter((item) => item.isGenerated) || [],
        },
    ];

    const handleChangePage = (page: number) => {
        setCurrentPage(page);
        setFilteredData(history[page].data);
    };

    const handleSearch = (value: string) => {
        const filtered = history[currentPage].data.filter((item) => {
            const title = item.testTitle.toLowerCase() || '';
            return title.includes(value.toLowerCase());
        });
        setFilteredData(filtered);
    };

    return (
        <div className="mb-9">
            <Banner className="mb-28">
                <Space size={64}>
                    <Image src={profileTiawai} alt="profile tiawai" priority />
                    <BannerTitle>Lịch sử học tập</BannerTitle>
                </Space>
            </Banner>

            <Flex justify="space-between" gap={100}>
                <Card
                    bordered
                    style={{
                        width: 350,
                        height: 'fit-content',
                        borderRadius: '50px',
                        border: '2px solid black',
                        padding: '20px 16px',
                    }}
                >
                    <Flex
                        className="font-roboto"
                        align="center"
                        vertical
                        gap={10}
                    >
                        {history.map((info, index) => (
                            <Button
                                key={index}
                                isCurrentPage={index === currentPage}
                                onClick={() => handleChangePage(index)}
                            >
                                {info.buttonName}
                            </Button>
                        ))}
                    </Flex>
                </Card>

                <Card
                    className="grow font-roboto"
                    bordered
                    style={{
                        width: 700,
                        borderRadius: '50px',
                        border: '2px solid black',
                        padding: '10px 16px 0 16px',
                    }}
                >
                    <Title level={4}>{history[currentPage].title}</Title>

                    <Flex
                        justify="space-between"
                        align="center"
                        gap={20}
                        className="!mb-8"
                    >
                        <Input
                            size="large"
                            variant="filled"
                            placeholder="Tìm kiếm"
                            prefix={<SearchOutlined />}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="!bg-[#DAE3E9] font-roboto text-black"
                        />
                        <AntdButton
                            icon={<FilterIcon width={18} />}
                            size="large"
                            style={{ background: '#DAE3E9' }}
                            className="font-roboto font-medium"
                        >
                            Bộ lọc
                        </AntdButton>
                    </Flex>

                    {filteredData.length > 0 ? (
                        <div className="grid max-w-full grid-cols-2 gap-5">
                            {filteredData.map((exam, index) => (
                                <ExamFrame key={index} examData={exam} />
                            ))}
                        </div>
                    ) : (
                        <Empty
                            description="Không có dữ liệu"
                            imageStyle={{ height: 118 }}
                        />
                    )}
                </Card>
            </Flex>
        </div>
    );
};

const Button = ({
    isCurrentPage,
    onClick,
    children,
}: {
    isCurrentPage: boolean;
    onClick: () => void;
    children?: React.ReactNode;
}) => {
    return (
        <button
            className={twMerge(
                'w-full rounded-full transition-all duration-150 hover:scale-105',
                isCurrentPage
                    ? 'bg-[#E9DAE9] py-[6px] font-bold text-[#AF3FAF]'
                    : 'border-2 border-black py-1',
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

const ExamFrame = ({
    theme = 'pink',
    examData,
}: Readonly<{
    theme?: 'pink' | 'blue';
    examData: UserHistoryExam;
}>) => {
    const router = useRouter();
    const iconSrc = theme === 'pink' ? '/home/home-8.svg' : '/home/home-4.png';
    const iconAlt = theme === 'pink' ? 'home icon 8' : 'home icon 4';
    const objColor = theme === 'pink' ? '#4D2C5E' : '#2C2F5E';
    const size = theme === 'pink' ? 100 : 62;

    return (
        <Card className="!w-full border-2 border-black">
            <Flex gap={20}>
                <IconFrame
                    className="aspect-square min-h-max min-w-max"
                    bgColor={objColor}
                    src={iconSrc}
                    alt={iconAlt}
                    width={size}
                    height={size}
                />

                <Flex className="grow gap-2" vertical>
                    <Title
                        className="!m-0 !max-w-[220px] !truncate !font-roboto"
                        level={5}
                    >
                        {examData.testTitle}
                    </Title>

                    <Flex
                        justify="space-between"
                        className="!m-0 !max-w-[220px] !rounded-full !bg-[#E9DAE9] !px-4 !py-1 !font-roboto"
                    >
                        <Text strong>Điểm số tốt nhất</Text>
                        <Text strong>
                            {examData.cntCorrect}/{examData.totalQuestions}
                        </Text>
                        <Text strong>{examData.pts.toPrecision(2)}</Text>
                    </Flex>

                    <Flex justify="space-between" className="!w-full !gap-2">
                        <AntdButton
                            shape="round"
                            variant="outlined"
                            size="small"
                            icon={<ReloadOutlined />}
                            onClick={() =>
                                router.push(`/exam/${examData.testId}`)
                            }
                        >
                            Làm lại
                        </AntdButton>

                        <AntdButton
                            shape="round"
                            variant="outlined"
                            size="small"
                            icon={<EyeOutlined />}
                            onClick={() =>
                                router.push(
                                    `/exam/${examData.testId}/result/${examData.submissionId}`,
                                )
                            }
                        >
                            Review
                        </AntdButton>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    );
};

export default History;
