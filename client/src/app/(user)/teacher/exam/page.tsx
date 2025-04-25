'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { BannerTitle, BannerSubTitle } from '@/components/common/banner';
import Banner from '@/app/(user)/student/(study)/_ui/banner';
import bigTiawai2 from '@public/big-tiawai-2.svg';
import SearchForm from '@/components/teacher/common/searchform';
import { Space, Row, Col, Spin, Empty } from 'antd';
import ClassDropdown from '@/components/teacher/exam/classdropdown';
import TestCard from '@/components/teacher/exam/testCard';
import LessonCard from '@/components/teacher/exam/lessonCard';
import {
    useGetTeacherClassroomsQuery,
    useGetLessonsQuery,
    useGetTestByClassroomIdQuery,
    useGetTestClassoomQuery,
} from '@/services/classroom.service';
import { Test } from '@/types/test.type';

const ExamPage = () => {
    const [selectedClassId, setSelectedClassId] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const { data: classrooms, isLoading: isClassroomsLoading } =
        useGetTeacherClassroomsQuery();
    const [tests, setTests] = useState<Test[]>([]);

    const {
        data: lessons,
        isLoading: isLessonsLoading,
        error: lessonsError,
    } = useGetLessonsQuery({
        classId: selectedClassId,
    });
    const {
        data: testsByClassroomId,
        isLoading: isTestsLoading,
        error: testsError,
    } = useGetTestByClassroomIdQuery(selectedClassId, {
        skip: selectedClassId === '',
    });

    const { data: allTestInClass } = useGetTestClassoomQuery(undefined, {
        skip: selectedClassId !== '',
    });

    useEffect(() => {
        if (selectedClassId === '' && allTestInClass) {
            setTests(allTestInClass);
        } else if (testsByClassroomId) {
            setTests(testsByClassroomId);
        }
    }, [selectedClassId, allTestInClass, testsByClassroomId]);

    const handleClassSelect = (classId: string | undefined) => {
        setSelectedClassId(classId || '');
    };

    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };

    const filteredLessons = lessons?.filter((lesson) =>
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const filteredTests = tests?.filter((test) =>
        test.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div className="select-none space-y-20">
            <Banner>
                <div>
                    <BannerTitle title="Quản lý Đề thi & Bài học – Tổ chức khoa học, giảng dạy hiệu quả! 📚📝" />
                    <BannerSubTitle
                        title="Dễ dàng tạo, sắp xếp và chỉnh sửa bài giảng, đề thi theo lộ trình giảng dạy.
            Upload slide, soạn bài trực tiếp hoặc sử dụng AI Tia để tạo nội dung nhanh chóng! 🚀✨"
                    />
                </div>
                <Image
                    src={bigTiawai2}
                    alt="big tiawai 2"
                    height={400}
                    className="max-h-[400px] w-auto"
                    priority
                />
            </Banner>

            <div>
                <div className="mb-6 text-3xl font-bold">Quản lý lớp học</div>
                <Space size="large">
                    <SearchForm
                        onSearch={handleSearch}
                        title="Tìm kiếm bài học & đề thi"
                    />
                    <ClassDropdown
                        classrooms={classrooms || []}
                        onSelect={handleClassSelect}
                        loading={isClassroomsLoading}
                    />
                </Space>

                {/* Danh sách đề thi */}
                <div className="mb-6 mt-6 text-2xl font-bold">Đề thi</div>
                {isTestsLoading ? (
                    <Spin size="large" className="flex justify-center" />
                ) : testsError ? (
                    <Empty description="Lỗi khi tải danh sách đề thi" />
                ) : filteredTests && filteredTests.length > 0 ? (
                    <Row gutter={[16, 16]} className="mb-6">
                        {filteredTests.map((test) => (
                            <Col key={test.id} xs={24} sm={12} md={8} lg={6}>
                                <TestCard
                                    id={test.id}
                                    classroomId={
                                        selectedClassId ||
                                        test?.classroomId ||
                                        ''
                                    }
                                    title={test.title}
                                    duration={test.timeLength}
                                    attempts={test?.submissionCount || 0}
                                />
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <Empty description="Không tìm thấy đề thi nào" />
                )}

                <div className="mb-6 text-2xl font-bold">Bài học</div>
                {isLessonsLoading ? (
                    <Spin size="large" className="flex justify-center" />
                ) : lessonsError ? (
                    <Empty description="Lỗi khi tải danh sách bài học" />
                ) : filteredLessons && filteredLessons.length > 0 ? (
                    <Row gutter={[16, 16]} className="mb-6">
                        {filteredLessons.map((lesson) => (
                            <Col key={lesson.id} xs={24} sm={12} md={8} lg={6}>
                                <LessonCard
                                    id={lesson.id}
                                    title={lesson.title}
                                />
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <Empty description="Không tìm thấy bài học nào" />
                )}
            </div>
        </div>
    );
};

export default ExamPage;
