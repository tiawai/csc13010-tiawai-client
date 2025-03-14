import { Banner, BannerTitle } from '@/ui/components/banner';
import { Col, Flex, Row, Space } from 'antd';
import Image from 'next/image';
import React from 'react';
import profileTiawai from '@public/profile-tiawai.webp';
import ClassFrame from '@/ui/home/class-frame';

const classData = [
    {
        image: '',
        rating: 4.8,
        price: 500000,
        title: 'Lớp học 2',
        lessons: 15,
        students: 150,
        duration: 150,
        teacher: {
            name: 'Teacher 2',
            image: '',
        },
    },
    {
        image: '',
        rating: 4.8,
        price: 500000,
        title: 'Lớp học 2',
        lessons: 15,
        students: 150,
        duration: 150,
        teacher: {
            name: 'Teacher 2',
            image: '',
        },
    },
    {
        image: '',
        rating: 4.8,
        price: 500000,
        title: 'Lớp học 2',
        lessons: 15,
        students: 150,
        duration: 150,
        teacher: {
            name: 'Teacher 2',
            image: '',
        },
    },
];

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
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
            <Row gutter={[40, 64]} className="mb-10">
                {classData.map((classItem, index) => (
                    <Col xs={24} md={12} lg={8} key={index}>
                        <ClassFrame class={classItem} />
                    </Col>
                ))}
            </Row>
        </Flex>
    );
};

export default Page;
