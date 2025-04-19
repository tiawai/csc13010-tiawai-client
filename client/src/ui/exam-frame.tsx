'use client';
import { useRouter } from 'next/navigation';
import { Flex, Space, Button, Typography } from 'antd';
import IconFrame from './icon-frame';
import {
    ClockCircleOutlined,
    DownloadOutlined,
    QuestionCircleOutlined,
} from '@ant-design/icons';
import { Exam } from '@/types/exam';
const { Text, Title } = Typography;

const ExamFrame = ({
    theme = 'pink',
    id,
    title,
    duration,
    totalAttempts,
    isTest = false,
    examData,
}: Readonly<{
    theme?: 'pink' | 'blue';
    id?: string | number;
    title?: string;
    duration?: number;
    totalAttempts?: number;
    isTest?: boolean;
    examData?: Exam;
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

    const onExamClick = () => {
        examData?.duration;
        if (isTest) {
            router.push(`/student/test/${id}`);
        } else {
            router.push(`/exam/${id}`);
        }
    };

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
                    {title}
                </Title>
                <Flex justify="space-between">
                    <Space size="large">
                        <Flex align="center" gap={4}>
                            <ClockCircleOutlined />
                            <Text className="!text-nowrap !font-roboto !font-medium !text-[#ACACAC]">
                                {duration} phút
                            </Text>
                        </Flex>
                        {!isTest ? (
                            <Flex align="center" gap={4}>
                                <DownloadOutlined />
                                <Text className="!text-nowrap !font-roboto !font-medium !text-[#ACACAC]">
                                    {totalAttempts} lượt làm
                                </Text>
                            </Flex>
                        ) : (
                            <Flex align="center" gap={4}>
                                <QuestionCircleOutlined />
                                <Text className="!text-nowrap !font-roboto !font-medium !text-[#ACACAC]">
                                    {totalAttempts} câu hỏi
                                </Text>
                            </Flex>
                        )}
                    </Space>
                </Flex>
                <div>
                    <Button
                        shape="round"
                        type="primary"
                        className={`${theme === 'pink' ? '!bg-primary-button' : '!bg-secondary-button'}`}
                        size="small"
                        onClick={onExamClick}
                    >
                        Xem đề thi
                    </Button>
                </div>
            </Flex>
        </Flex>
    );
};

export default ExamFrame;
