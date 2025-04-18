'use client';
import { Banner, BannerTitle } from '@/ui/components/banner';
import { Col, Flex, Row, Space, Spin } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import profileTiawai from '@public/profile-tiawai.webp';
import ClassFrame from '@/ui/home/class-frame';
import { Classroom } from '@/types/classroom.type';
import { useGetClassroomsQuery } from '@/services/classroom';

const Page = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const { data: classrooms = [], isLoading } = useGetClassroomsQuery();
    const [filteredClassrooms, setFilteredClassrooms] = useState<Classroom[]>(
        [],
    );

    useEffect(() => {
        if (classrooms.length > 0) {
            // Filter or get related classrooms logic here
            // For now, just show all classrooms
            setFilteredClassrooms(classrooms);
        }
    }, [classrooms, id]);

    return (
        <Flex vertical>
            <Banner className="mb-28">
                <Space size={64}>
                    <Image src={profileTiawai} alt="profile tiawai" priority />
                    <BannerTitle className="capitalize">
                        Lớp học của tôi
                    </BannerTitle>
                </Space>
            </Banner>
            {isLoading ? (
                <div className="flex justify-center">
                    <Spin size="large" />
                </div>
            ) : (
                <Row gutter={[40, 64]} className="mb-10">
                    {filteredClassrooms.map((classItem) => (
                        <Col xs={24} md={12} lg={8} key={classItem.id}>
                            <ClassFrame class={classItem} />
                        </Col>
                    ))}
                </Row>
            )}
        </Flex>
    );
};

export default Page;
