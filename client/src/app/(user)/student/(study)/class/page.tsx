'use client';
import { useGetClassroomsQuery } from '@/services/classroom';
import { CLASS_BANNER, CLASS_HEADER } from '@/strings/class';
import FindClassInput from '@/ui/components/find-class-input';
import LeftTextBanner from '@/ui/components/left-text-banner';
import { CustomTitle } from '@/ui/components/title';
import ClassFrame from '@/ui/home/class-frame';
import { useMemo, useState } from 'react';

import { Col, Empty, Flex, Row, Spin } from 'antd';

const Class = () => {
    const { data: classData = [], isLoading: isLoadingClass } =
        useGetClassroomsQuery();
    const [searchQuery, setSearchQuery] = useState('');

    // Filter classes based on search query and get top rated ones
    const popularClasses = useMemo(() => {
        if (!classData || classData.length === 0) return [];

        return [...classData]
            .sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0))
            .slice(0, 3);
    }, [classData]);

    // Filter classes based on search query
    const filteredClasses = useMemo(() => {
        if (!classData || classData.length === 0) return [];
        if (!searchQuery.trim()) return classData;

        return classData.filter((classItem) =>
            classItem.className
                .toLowerCase()
                .includes(searchQuery.toLowerCase()),
        );
    }, [classData, searchQuery]);

    // Handle search input changes
    const handleSearch = (value: string) => {
        setSearchQuery(value);
    };

    return (
        <Flex vertical>
            <LeftTextBanner {...CLASS_BANNER} />
            <div className="mb-8 px-72 text-center font-montserrat text-xl">
                {CLASS_HEADER}
            </div>
            <FindClassInput className="mb-10 w-[30%]" onSearch={handleSearch} />

            {isLoadingClass ? (
                <div className="flex justify-center">
                    <Spin size="large" />
                </div>
            ) : (
                <>
                    {!searchQuery.trim() && (
                        <>
                            <CustomTitle
                                level={2}
                                className="!mb-10 !font-bold capitalize"
                            >
                                Lớp học phổ biến
                            </CustomTitle>
                            <Row gutter={[40, 64]} className="mb-10">
                                {popularClasses.map((classItem) => (
                                    <Col
                                        xs={24}
                                        md={12}
                                        lg={8}
                                        key={classItem.id}
                                    >
                                        <ClassFrame class={classItem} />
                                    </Col>
                                ))}
                            </Row>
                        </>
                    )}

                    {searchQuery.trim() && (
                        <>
                            <CustomTitle
                                level={2}
                                className="!mb-10 !font-bold capitalize"
                            >
                                Kết quả tìm kiếm
                            </CustomTitle>
                            {filteredClasses.length > 0 ? (
                                <Row gutter={[40, 64]} className="mb-10">
                                    {filteredClasses.map((classItem) => (
                                        <Col
                                            xs={24}
                                            md={12}
                                            lg={8}
                                            key={classItem.id}
                                        >
                                            <ClassFrame class={classItem} />
                                        </Col>
                                    ))}
                                </Row>
                            ) : (
                                <Empty description="Không tìm thấy lớp học phù hợp" />
                            )}
                        </>
                    )}
                </>
            )}
        </Flex>
    );
};

export default Class;
