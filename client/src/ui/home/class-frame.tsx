'use client';
import {
    ClockCircleFilled,
    FileTextFilled,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Flex, Rate } from 'antd';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { Typography } from 'antd';
import { Classroom } from '@/types/classroom.type';
import { useRouter } from 'next/navigation';
const { Title } = Typography;

const durationFormatter = (duration: number) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    return `${hours}h ${minutes}m`;
};

const userFormatter = (user: number) => {
    if (user > 100 && user < 1000) {
        return `${Math.floor(user / 100) * 100}+`;
    } else if (user <= 100) {
        return user;
    } else {
        return '1000+';
    }
};

const priceFormatter = (price: number) => {
    if (price === 0) {
        return 'FREE';
    } else {
        return price.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
    }
};

const ClassFrame: React.FC<{
    className?: string;
    class: Classroom;
}> = ({ className, class: classData }) => {
    const router = useRouter();

    const handleJoinClass = () => {
        router.push(`/student/class/${classData.id}`);
    };

    return (
        <Flex
            className={twMerge(
                'max-h-[663px] w-full min-w-[300px] max-w-max bg-secondary p-5 font-montserrat',
                className,
            )}
            vertical
            gap={20}
        >
            <Image
                src={classData.backgroundImage || ''}
                width={412}
                height={250}
                alt="cover image"
                className="min-h-[250px] rounded-xl"
            />
            <Flex justify="space-between" align="center">
                <Flex align="center" gap={4}>
                    <Rate
                        value={classData.avgRating || 0}
                        disabled
                        allowHalf
                        style={{ fontSize: 16, color: '#FF3000' }}
                    />
                    <span className="ml-1 text-xs font-medium">
                        {classData.avgRating || '0.0'}
                    </span>
                </Flex>
                <span className="font-bold text-secondary">
                    {priceFormatter(classData.price || 0)}
                </span>
            </Flex>
            <div className="h-[60px] overflow-hidden">
                <Title
                    className="!mb-0 line-clamp-2 uppercase"
                    level={4}
                    ellipsis={{ rows: 2, tooltip: classData.className }}
                >
                    {classData.className}
                </Title>
            </div>
            <Flex
                className="rounded-md bg-white p-5 text-secondary"
                align="center"
                justify="space-between"
            >
                <Flex align="center" gap={4}>
                    <FileTextFilled />
                    <span>{classData.totalLessons || 0} bài học</span>
                </Flex>
                <Flex align="center" gap={4}>
                    <ClockCircleFilled />
                    <span>{durationFormatter(0)}</span>
                </Flex>
                <Flex align="baseline" gap={4}>
                    <UserOutlined />
                    <span>{userFormatter(classData.maxStudent || 0)}</span>
                </Flex>
            </Flex>
            <Button
                variant="solid"
                className="w-full !bg-secondary-button !font-montserrat !text-white"
                onClick={handleJoinClass}
            >
                Tham gia
            </Button>
        </Flex>
    );
};

export default ClassFrame;
