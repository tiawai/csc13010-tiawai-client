'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/lib/hooks/hook';
import { useGetMyClassroomsQuery } from '@/services/classroom.service';
import { selectUser } from '@/lib/slices/auth.slice';
import { Button, Flex, Typography, Spin, Empty, Row, Col } from 'antd';
import ClassFrame from '@/ui/home/class-frame';

const { Title, Text } = Typography;

export default function MyClassesPage() {
    const user = useAppSelector(selectUser);
    const {
        data: classrooms,
        isLoading,
        error,
    } = useGetMyClassroomsQuery(user.id);
    console.log('classrooms', classrooms);
    const sortedClassrooms = useMemo(() => {
        if (!classrooms) return [];
        return [...classrooms].sort(
            (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime(),
        );
    }, [classrooms]);

    if (isLoading) {
        return (
            <Flex
                className="h-[calc(100vh-200px)]"
                align="center"
                justify="center"
            >
                <Spin size="large" tip="Đang tải lớp học..." />
            </Flex>
        );
    }

    if (error) {
        return (
            <Flex
                className="h-[calc(100vh-200px)]"
                vertical
                align="center"
                justify="center"
            >
                <Title level={3} className="text-red-500">
                    Đã xảy ra lỗi khi tải lớp học
                </Title>
                <Text className="text-gray-500">Vui lòng thử lại sau</Text>
            </Flex>
        );
    }

    if (!sortedClassrooms || sortedClassrooms.length === 0) {
        return (
            <Flex
                className="h-[calc(100vh-200px)]"
                vertical
                align="center"
                justify="center"
            >
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                        <Flex vertical align="center" gap={8}>
                            <Title level={4}>
                                Bạn chưa tham gia lớp học nào
                            </Title>
                            <Text className="text-gray-500">
                                Hãy khám phá các lớp học có sẵn để bắt đầu học
                            </Text>
                        </Flex>
                    }
                >
                    <Link href="/student/class">
                        <Button type="primary" size="large" className="mt-4">
                            Khám phá lớp học
                        </Button>
                    </Link>
                </Empty>
            </Flex>
        );
    }

    return (
        <div className="container py-8">
            <Title level={2} className="mb-8">
                Lớp học của tôi
            </Title>

            <Row gutter={[40, 64]} className="mb-10">
                {sortedClassrooms.map((classroom) => (
                    <Col xs={24} md={12} lg={8} key={classroom.id}>
                        <ClassFrame isMine={true} class={classroom} />
                    </Col>
                ))}
            </Row>
        </div>
    );
}
