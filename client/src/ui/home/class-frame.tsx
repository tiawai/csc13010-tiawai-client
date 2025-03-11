'use client';
import {
    ClockCircleFilled,
    FileTextFilled,
    StarFilled,
    UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Flex } from 'antd';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { Typography } from 'antd';
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
    class: {
        image: string;
        rating: number;
        price: number;
        title: string;
        lessons: number;
        students: number;
        duration: number;
        teacher: {
            name: string;
            image?: string;
        };
    };
}> = ({ className, class: classData }) => {
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
                src={classData.image}
                width={412}
                height={250}
                alt="cover image"
                className="min-h-[250px] rounded-xl"
            />
            <Flex justify="space-between" align="center">
                <Flex align="center" gap={4}>
                    <span>
                        <StarFilled style={{ color: '#FF3000' }} />
                        <StarFilled style={{ color: '#FF3000' }} />
                        <StarFilled style={{ color: '#FF3000' }} />
                        <StarFilled style={{ color: '#FF3000' }} />
                        <StarFilled style={{ color: '#FF3000' }} />
                    </span>
                    <span className="text-xs font-medium">
                        {classData.rating}
                    </span>
                </Flex>
                <span className="font-bold text-secondary">
                    {priceFormatter(classData.price)}
                </span>
            </Flex>
            <Title className="uppercase" level={4}>
                {classData.title}
            </Title>
            <Flex
                className="rounded-md bg-white p-5 text-secondary"
                align="center"
                justify="space-between"
            >
                <Flex align="center" gap={4}>
                    <FileTextFilled />
                    <span>{classData.lessons} bài học</span>
                </Flex>
                <Flex align="center" gap={4}>
                    <ClockCircleFilled />
                    <span>{durationFormatter(classData.duration)}</span>
                </Flex>
                <Flex align="baseline" gap={4}>
                    <UserOutlined />
                    <span>{userFormatter(classData.students)}</span>
                </Flex>
            </Flex>
            <Flex justify="space-between">
                <Flex align="center" gap={10}>
                    <Avatar
                        className="border-2 border-secondary-button bg-secondary-button"
                        src={classData.teacher.image}
                        alt="teacher avatar"
                        icon={<UserOutlined />}
                    />
                    <span className="font-medium text-secondary">
                        {classData.teacher.name}
                    </span>
                </Flex>
                <Button
                    variant="solid"
                    className="rounded-[40px] bg-secondary-button text-white"
                >
                    Tham gia
                </Button>
            </Flex>
        </Flex>
    );
};

export default ClassFrame;
