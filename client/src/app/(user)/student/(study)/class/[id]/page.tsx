'use client';
import {
    useGetClassroomByIdQuery,
    useGetClassroomLessonsQuery,
} from '@/services/classroom';
import ExamFrame from '@/ui/exam-frame';
import LessonFrame from '@/ui/lesson-frame';
import {
    Button,
    Col,
    Empty,
    Flex,
    Input,
    Menu,
    Pagination,
    Row,
    Spin,
    Typography,
} from 'antd';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import {
    SearchOutlined,
    FileTextOutlined,
    ReadOutlined,
    LeftOutlined,
    BookOutlined,
} from '@ant-design/icons';
import { useGetTestByClassroomIdQuery } from '@/services/test.service';
import { twJoin } from 'tailwind-merge';

const { Title } = Typography;

const ClassDetailPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const { data: classroom, isLoading: isLoadingClassroom } =
        useGetClassroomByIdQuery(id);
    const { data: lessons = [], isLoading: isLoadingLessons } =
        useGetClassroomLessonsQuery(id);
    const { data: tests = [], isLoading: isLoadingTests } =
        useGetTestByClassroomIdQuery(id);

    const [activeTab, setActiveTab] = useState<string>('lessons');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 6;

    // Filter lessons based on search query
    const filteredLessons = useMemo(() => {
        return lessons.filter((lesson) =>
            lesson.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    }, [lessons, searchQuery]);

    // Filter tests based on search query
    const filteredTests = useMemo(() => {
        return tests.filter((test) =>
            test.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    }, [tests, searchQuery]);

    // Get the active filtered content based on current tab
    const activeFilteredContent = useMemo(() => {
        return activeTab === 'lessons' ? filteredLessons : filteredTests;
    }, [activeTab, filteredLessons, filteredTests]);

    // Calculate pagination for the active content
    const paginatedContent = useMemo(() => {
        return activeFilteredContent.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize,
        );
    }, [activeFilteredContent, currentPage, pageSize]);

    const handleTabChange = (key: string) => {
        setActiveTab(key);
        setCurrentPage(1);
        setSearchQuery('');
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Check if content is loading based on active tab
    const isContentLoading =
        (activeTab === 'lessons' && isLoadingLessons) ||
        (activeTab === 'exams' && isLoadingTests);

    if (isLoadingClassroom) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    if (!classroom) {
        return (
            <div className="flex h-[50vh] flex-col items-center justify-center">
                <Title level={3}>Không tìm thấy lớp học</Title>
                <Button type="primary" href="/student/class">
                    Quay lại danh sách lớp học
                </Button>
            </div>
        );
    }

    return (
        <Flex vertical className="min-h-screen">
            {/* Go back button - copied from flashcard page */}
            <div className="mb-10 px-8">
                <Link
                    className={twJoin(
                        'flex w-fit items-center gap-2 rounded-full px-4 py-3 text-black',
                        activeTab === 'lessons'
                            ? 'bg-[#E9DAE9]'
                            : 'bg-[#DAE3E9]',
                    )}
                    href="/student/class"
                >
                    <LeftOutlined />
                    <span className="text-xl font-bold">
                        {classroom.className}
                    </span>
                    <div
                        className={
                            activeTab === 'lessons'
                                ? 'bg-[#f4edf4]'
                                : 'bg-white/50'
                        }
                        style={{
                            borderRadius: '999px',
                            padding: '0.25rem 1rem',
                        }}
                    >
                        <BookOutlined />
                    </div>
                </Link>
            </div>

            {/* Main content area with tabs */}
            <Row gutter={64} className="px-8">
                {/* Left sidebar with tabs */}
                <Col span={7}>
                    <Menu
                        className="custom-menu rounded-3xl border-2 !border-r-2 !p-6 !font-montserrat"
                        selectedKeys={[activeTab]}
                        mode="vertical"
                        onClick={(e) => handleTabChange(e.key)}
                        style={{ boxShadow: 'none' }}
                        items={[
                            {
                                key: 'lessons',
                                icon: <FileTextOutlined />,
                                label: 'Bài học',
                                className: '!mb-6',
                            },
                            {
                                key: 'exams',
                                icon: <ReadOutlined />,
                                label: 'Đề thi',
                            },
                        ]}
                    />
                    <style jsx global>{`
                        .custom-menu .ant-menu-item {
                            border-radius: 12px;
                            margin: 4px 0;
                            border: 1px solid black;
                            display: flex;
                            font-size: 16px;
                            justify-content: center;
                        }
                        .custom-menu .ant-menu-item-selected {
                            background-color: #e9dae9 !important;
                            color: #4d2c5e !important;
                            box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
                            border: 0px solid transparent;
                            font-weight: bold;
                        }
                    `}</style>
                </Col>

                {/* Right content area */}
                <Col span={17}>
                    <div className="rounded-3xl border-2 p-8">
                        {/* Search bar inside content container */}
                        <Input
                            placeholder={
                                activeTab === 'lessons'
                                    ? 'Tìm kiếm bài học...'
                                    : 'Tìm kiếm đề thi...'
                            }
                            prefix={<SearchOutlined />}
                            onChange={handleSearch}
                            value={searchQuery}
                            className="mb-6 !border-black"
                        />

                        {/* Content list with 2 columns */}
                        <div className="mb-10 min-h-[400px]">
                            {isContentLoading ? (
                                <div className="flex h-[300px] items-center justify-center">
                                    <Spin size="large" />
                                </div>
                            ) : paginatedContent.length > 0 ? (
                                <Row gutter={[64, 32]}>
                                    {activeTab === 'lessons'
                                        ? // Render lessons
                                          (
                                              paginatedContent as typeof lessons
                                          ).map((lesson) => (
                                              <Col
                                                  xs={24}
                                                  md={12}
                                                  key={lesson.id}
                                              >
                                                  <LessonFrame
                                                      lesson={{
                                                          id: lesson.id,
                                                          title: lesson.title,
                                                      }}
                                                  />
                                              </Col>
                                          ))
                                        : // Render tests
                                          (
                                              paginatedContent as typeof tests
                                          ).map((test) => (
                                              <Col
                                                  xs={24}
                                                  md={12}
                                                  key={test.id}
                                              >
                                                  <ExamFrame
                                                      title={test.title}
                                                      duration={test.timeLength}
                                                      totalAttempts={
                                                          test.totalQuestions
                                                      }
                                                      id={test.id}
                                                      isTest={true}
                                                      theme="blue"
                                                  />
                                              </Col>
                                          ))}
                                </Row>
                            ) : (
                                <div className="flex h-[300px] items-center justify-center">
                                    <Empty
                                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                                        description={
                                            activeTab === 'lessons'
                                                ? 'Chưa có bài học nào trong lớp này'
                                                : 'Chưa có đề thi nào trong lớp này'
                                        }
                                        imageStyle={{
                                            height: 100,
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {activeFilteredContent.length > 0 && (
                            <Pagination
                                current={currentPage}
                                pageSize={pageSize}
                                total={activeFilteredContent.length}
                                onChange={handlePageChange}
                                className="mt-4 justify-end text-right"
                            />
                        )}
                    </div>
                </Col>
            </Row>
        </Flex>
    );
};

export default ClassDetailPage;
