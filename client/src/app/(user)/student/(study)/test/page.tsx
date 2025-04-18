'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input, Radio, Typography, Button, Flex, Space, Empty } from 'antd';
import { ClockCircleOutlined, DownloadOutlined } from '@ant-design/icons';
import bigTiawai2 from '@public/big-tiawai-2.svg';
import { CardBorder } from '@/components/common/card';
import { PageTitle } from '@/components/common/page';
import { Test, TestType } from '@/types/test.type';
import IconFrame from '@/ui/icon-frame';
import { useState, useMemo } from 'react';

const { Text, Title } = Typography;

const testContent: Record<
    TestType,
    { title: string; description: string; vnName: string }
> = {
    [TestType.NATIONAL_TEST]: {
        title: 'Luyện thi THPTQG – Ôn đúng trọng tâm, đạt điểm cao! 🎯📚',
        description:
            'Hệ thống đề thi chuẩn, cập nhật liên tục, giải thích đáp án chi tiết. Luyện tập mỗi ngày để tự tin bước vào kỳ thi quan trọng! 🚀✨',
        vnName: 'THPTQG',
    },
    [TestType.TOEIC_LISTENING]: {
        title: 'Luyện Listening – Nghe tốt, hiểu nhanh, nắm chắc điểm số! 🎧📖 ',
        description:
            'Làm bài nghe sát đề thi thật, cải thiện kỹ năng bắt keywords, luyện phản xạ và làm quen với mọi dạng câu hỏi! 🚀📚',
        vnName: 'Listening',
    },
    [TestType.TOEIC_READING]: {
        title: 'Luyện Reading – Đọc hiểu sâu, nắm chắc đáp án! 📖✨',
        description:
            'Rèn kỹ năng đọc hiểu với bài tập chuẩn TOEIC, cải thiện từ vựng & tốc độ làm bài, kèm phân tích chi tiết để tối ưu điểm số! 🚀📚',
        vnName: 'Reading',
    },
    [TestType.ASSIGNMENT]: {
        title: '',
        description: '',
        vnName: 'Bài tập',
    },
};

const mockData: Test[] = [
    {
        id: '586fc810-8149-4c4d-acb0-4d84b104d1b8',
        title: 'toeic listening',
        timeLength: 45,
        author: '',
        type: TestType.TOEIC_LISTENING,
        startDate: new Date(),
        endDate: new Date(),
        totalQuestions: 100,
        isGenerated: false,
    },
    {
        id: '79fc17e9-8097-4666-b753-545a009551c9',
        title: 'national',
        timeLength: 120,
        author: '',
        type: TestType.NATIONAL_TEST,
        startDate: new Date(),
        endDate: new Date(),
        totalQuestions: 50,
        isGenerated: false,
    },
    {
        id: '379a593b-972e-4f9e-9be3-709f0d88b479',
        title: 'national',
        timeLength: 120,
        author: '',
        type: TestType.NATIONAL_TEST,
        startDate: new Date(),
        endDate: new Date(),
        totalQuestions: 50,
        isGenerated: false,
    },
    {
        id: '4799f8b0-4746-4705-959a-9d7a50dbcd89',
        title: 'toeic reading',
        timeLength: 75,
        author: '',
        type: TestType.TOEIC_READING,
        startDate: new Date(),
        endDate: new Date(),
        totalQuestions: 100,
        isGenerated: false,
    },
    {
        id: '4bc840dc-79b1-428d-8dc9-db6c848bca1e',
        title: 'toeic reading',
        timeLength: 75,
        author: '',
        type: TestType.TOEIC_READING,
        startDate: new Date(),
        endDate: new Date(),
        totalQuestions: 100,
        isGenerated: false,
    },
    {
        id: '58487806-67c3-4cd4-af5f-4a5939609729',
        title: 'TOEIC Listening',
        timeLength: 45,
        author: '',
        type: TestType.TOEIC_LISTENING,
        startDate: new Date(),
        endDate: new Date(),
        totalQuestions: 100,
        isGenerated: false,
    },
];

export default function TestPage() {
    const params = useSearchParams();
    const type = (params.get('type') as TestType) || TestType.NATIONAL_TEST;
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTests = useMemo(() => {
        return mockData.filter((test) => {
            const matchesType = test.type === type;
            const matchesSearch =
                searchQuery === '' ||
                test.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesType && matchesSearch;
        });
    }, [type, searchQuery]);

    return (
        <div className="space-y-8">
            <PageTitle
                title={testContent[type].title}
                description={testContent[type].description}
                imageSrc={bigTiawai2}
                imageAlt="big tiawai 2"
                imagePosition="right"
            />

            <Title level={2} className="!font-roboto">
                Kho đề thi {testContent[type].vnName}
            </Title>

            <div className="flex gap-8">
                <div className="flex-[1] space-y-4">
                    <CardBorder className="!rounded-3xl !p-2">
                        <Title level={4}>Tìm kiếm</Title>
                        <Input.Search
                            placeholder="Tìm kiếm đề thi..."
                            onSearch={(value) => {
                                setSearchQuery(value);
                            }}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            value={searchQuery}
                            allowClear
                            size="large"
                        />
                    </CardBorder>
                    <CardBorder className="!rounded-3xl !p-2">
                        <Title level={4}>Bộ lọc</Title>
                        <Radio.Group
                            className="!flex !flex-col gap-1"
                            defaultValue="all"
                            buttonStyle="solid"
                            onChange={(e) => {
                                const filterType = e.target.value;
                                console.log('Filter selected:', filterType);
                                // Lọc danh sách đề dựa trên filterType
                            }}
                        >
                            <Radio value="all">Tất cả</Radio>
                            <Radio value="minh_hoa">Minh họa</Radio>
                            <Radio value="chinh_thuc">Chính thức</Radio>
                            <Radio value="truong">Các trường</Radio>
                        </Radio.Group>
                    </CardBorder>
                </div>
                <div className="grid flex-[4] auto-rows-min grid-cols-3 gap-4">
                    {filteredTests.length > 0 ? (
                        filteredTests.map((test, index) => (
                            <TestFrame
                                key={index}
                                theme={
                                    type === TestType.TOEIC_LISTENING
                                        ? 'blue'
                                        : 'pink'
                                }
                                test={test}
                            />
                        ))
                    ) : (
                        <Empty description="Không tìm thấy đề thi phù hợp" />
                    )}
                </div>
            </div>
        </div>
    );
}

const testInfo: {
    unit: string;
    icon: React.ReactNode;
}[] = [
    {
        unit: 'phút',
        icon: <ClockCircleOutlined />,
    },
    {
        unit: 'lượt làm',
        icon: <DownloadOutlined />,
    },
];

const TestFrame = ({
    theme = 'pink',
    test,
}: Readonly<{
    theme?: 'pink' | 'blue';
    test: Test;
}>) => {
    const router = useRouter();
    const iconSrc =
        theme === 'pink'
            ? '/home/home-8.svg'
            : 'https://tiawai-storage.sgp1.cdn.digitaloceanspaces.com/client/home/home-4.png';
    const iconAlt = theme === 'pink' ? 'home icon 8' : 'home icon 4';
    const bgColor = theme === 'pink' ? '#E9DAE9' : '#DAE3E9';
    const objColor = theme === 'pink' ? '#4D2C5E' : '#2C2F5E';
    const size = theme === 'pink' ? 100 : 62;

    return (
        <Flex
            className="!w-full !gap-3 !rounded-xl !py-4 px-3"
            style={{
                backgroundColor: bgColor,
                boxShadow: '0px 4px 25px 0px rgba(0,0,0,0.10)',
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
                    {test.title}
                </Title>
                <Flex justify="space-between">
                    <Space size="large">
                        {testInfo.map((info, index) => (
                            <Flex align="center" key={index} gap={4}>
                                {info.icon}
                                <Text className="!text-nowrap !font-roboto !font-medium !text-[#ACACAC]">
                                    {info.unit === 'phút'
                                        ? `${test.timeLength} phút`
                                        : `${test.timeLength} lượt làm`}
                                </Text>
                            </Flex>
                        ))}
                    </Space>
                </Flex>
                <div>
                    <Button
                        shape="round"
                        type="primary"
                        className={`${theme === 'pink' ? 'bg-primary-button' : 'bg-secondary-button'}`}
                        size="small"
                        onClick={() => router.push(`test/${test.id}`)}
                    >
                        Xem đề thi
                    </Button>
                </div>
            </Flex>
        </Flex>
    );
};
