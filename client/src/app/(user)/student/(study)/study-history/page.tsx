'use client';
import { Card, Flex, Input, Button, Typography, Empty } from 'antd';
import profileTiawai from '@public/profile-tiawai.webp';
import { useState, useEffect } from 'react';
import { useGetHistoryExamsQuery } from '@/services/user';
import { SearchOutlined } from '@ant-design/icons';
import { FilterIcon } from '@/ui/admin/icons';
import { UserHistoryExam } from '@/types/exam';
import { useRouter } from 'next/navigation';
import IconFrame from '@/ui/icon-frame';
import { ReloadOutlined, EyeOutlined } from '@ant-design/icons';
import { PageLayout, PageTitle } from '@/components/common/page';
import { Navigation } from '@/components/common/navigation';
import { CardBorder } from '@/components/common/card';
import { Loading } from '@/components/common/loading';

const { Text, Title } = Typography;

interface History {
    data: UserHistoryExam[];
    onClick?: () => void;
}

const History = () => {
    const [navigationIndex, setNavigationIndex] = useState<number>(0);
    const navigationItems = [
        {
            text: 'Danh sách đề TOEIC',
            content: <ToeicTestHistory />,
        },
        {
            text: 'Lịch sử làm đề THPTQG',
            content: <NationalTestHistory />,
        },
        {
            text: 'Lịch sử học flashcard',
            content: <FlashCardHistory />,
        },
    ];

    return (
        <PageLayout>
            <PageTitle
                title="Lịch sử học tập"
                imageSrc={profileTiawai}
                imageAlt="Profile Tiawai"
                imagePosition="left"
            />

            <div className="flex gap-12">
                <CardBorder width={350}>
                    <Navigation
                        navigationItems={navigationItems.map(
                            (item) => item.text,
                        )}
                        currentItem={navigationIndex}
                        onNavigationChange={setNavigationIndex}
                    />
                </CardBorder>

                <CardBorder width={'auto'} className="!grow">
                    <Title level={4}>
                        {navigationItems[navigationIndex].text}
                    </Title>
                    {navigationItems[navigationIndex].content}
                </CardBorder>
            </div>
        </PageLayout>
    );
};

const HistoryInputSearch = ({
    onSearch,
}: {
    onSearch: (value: string) => void;
}) => {
    return (
        <Input
            size="large"
            variant="filled"
            placeholder="Tìm kiếm"
            prefix={<SearchOutlined />}
            onChange={(e) => onSearch(e.target.value)}
            className="!bg-[#DAE3E9] font-roboto text-black"
        />
    );
};

const HistoryFilter = ({ onFilter }: { onFilter: (value: string) => void }) => {
    return (
        <Button
            icon={<FilterIcon width={18} />}
            size="large"
            style={{ background: '#DAE3E9' }}
            className="font-roboto font-medium"
            onClick={() => onFilter('')}
        >
            Bộ lọc
        </Button>
    );
};

const HistoryHeader = ({
    onSearch,
    onFilter,
}: {
    onSearch: (value: string) => void;
    onFilter: (value: string) => void;
}) => {
    return (
        <Flex justify="space-between" align="center" gap={20}>
            <HistoryInputSearch onSearch={onSearch} />
            <HistoryFilter onFilter={onFilter} />
        </Flex>
    );
};

const HistoryContent = ({ history }: { history: UserHistoryExam[] }) => {
    return (
        <>
            {history.length > 0 ? (
                <div className="grid max-w-full grid-cols-2 gap-5">
                    {history.map((exam, index) => (
                        <ExamFrame key={index} examData={exam} />
                    ))}
                </div>
            ) : (
                <Empty
                    description="Không có dữ liệu"
                    imageStyle={{ height: 118 }}
                />
            )}
        </>
    );
};

const ToeicTestHistory = () => {
    const { data, isLoading } = useGetHistoryExamsQuery();
    const [filteredData, setFilteredData] = useState<UserHistoryExam[]>([]);
    const currentPage = 0;

    useEffect(() => {
        setFilteredData(data || []);
    }, [data]);

    const history: History[] = [
        {
            data: data?.filter((item) => !item.isGenerated) || [],
        },
        {
            data: data?.filter((item) => item.isGenerated) || [],
        },
    ];

    const handleSearch = (value: string) => {
        const filtered = history[currentPage].data.filter((item) => {
            const title = item.testTitle.toLowerCase() || '';
            return title.includes(value.toLowerCase());
        });
        setFilteredData(filtered);
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Flex vertical={true} gap={20}>
            <HistoryHeader
                onSearch={handleSearch}
                onFilter={() => setFilteredData(history[currentPage].data)}
            />
            <HistoryContent history={filteredData} />
        </Flex>
    );
};
const NationalTestHistory = () => {
    const { data, isLoading } = useGetHistoryExamsQuery();
    const [filteredData, setFilteredData] = useState<UserHistoryExam[]>([]);
    const currentPage = 0;

    useEffect(() => {
        setFilteredData(data || []);
    }, [data]);

    const history: History[] = [
        {
            data: data?.filter((item) => !item.isGenerated) || [],
        },
        {
            data: data?.filter((item) => item.isGenerated) || [],
        },
    ];

    const handleSearch = (value: string) => {
        const filtered = history[currentPage].data.filter((item) => {
            const title = item.testTitle.toLowerCase() || '';
            return title.includes(value.toLowerCase());
        });
        setFilteredData(filtered);
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Flex vertical={true} gap={20}>
            <HistoryHeader
                onSearch={handleSearch}
                onFilter={() => setFilteredData(history[currentPage].data)}
            />
            <HistoryContent history={filteredData} />
        </Flex>
    );
};
const FlashCardHistory = () => {
    const { data, isLoading } = useGetHistoryExamsQuery();
    const [filteredData, setFilteredData] = useState<UserHistoryExam[]>([]);
    const currentPage = 0;

    useEffect(() => {
        setFilteredData(data || []);
    }, [data]);

    const history: History[] = [
        {
            data: data?.filter((item) => !item.isGenerated) || [],
        },
        {
            data: data?.filter((item) => item.isGenerated) || [],
        },
    ];

    const handleSearch = (value: string) => {
        const filtered = history[currentPage].data.filter((item) => {
            const title = item.testTitle.toLowerCase() || '';
            return title.includes(value.toLowerCase());
        });
        setFilteredData(filtered);
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Flex vertical={true} gap={20}>
            <HistoryHeader
                onSearch={handleSearch}
                onFilter={() => setFilteredData(history[currentPage].data)}
            />
            <HistoryContent history={filteredData} />
        </Flex>
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
                        <Button
                            shape="round"
                            variant="outlined"
                            size="small"
                            icon={<ReloadOutlined />}
                            onClick={() =>
                                router.push(`/exam/${examData.testId}`)
                            }
                        >
                            Làm lại
                        </Button>

                        <Button
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
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    );
};

export default History;
