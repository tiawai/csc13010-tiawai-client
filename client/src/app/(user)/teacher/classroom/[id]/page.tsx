'use client';
import { useParams } from 'next/navigation';
import { DownOutlined } from '@ant-design/icons';
import {
    Table,
    Card,
    Button,
    TableColumnsType,
    Avatar,
    Dropdown,
    Spin,
    Empty,
} from 'antd';
import type { MenuProps } from 'antd';
import {
    DeleteOutlined,
    EyeOutlined,
    FolderOpenOutlined,
    FileTextOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import LessonCard from '@/components/teacher/exam/lessonCard';
import TestCard from '@/components/teacher/exam/testCard';
import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/navigation';
import {
    useGetClassroomByIdQuery,
    useGetLessonsQuery,
} from '@/services/classroom';

interface Student {
    key: string;
    username: string;
    avatar: string;
    email: string;
    phone: string;
}

const examList = [
    { id: 1, title: 'Đề Thi Toán 2023', duration: 90, attempts: 150 },
    { id: 2, title: 'Đề Thi Vật Lý 2023', duration: 60, attempts: 120 },
    { id: 3, title: 'Đề Thi Hóa Học 2023', duration: 75, attempts: 100 },
    { id: 4, title: 'Đề Thi Tiếng Anh 2023', duration: 45, attempts: 80 },
];

const students: Student[] = [
    {
        key: '1',
        username: '@leon_pwrr',
        avatar: 'https://via.placeholder.com/40',
        email: 'leon@gmail.com',
        phone: '0123 456 789',
    },
    {
        key: '2',
        username: '@john_doe',
        avatar: 'https://via.placeholder.com/40',
        email: 'john@gmail.com',
        phone: '0987 654 321',
    },
    {
        key: '3',
        username: '@jane_smith',
        avatar: 'https://via.placeholder.com/40',
        email: 'jane@gmail.com',
        phone: '0345 678 901',
    },
    {
        key: '4',
        username: '@emma_watson',
        avatar: 'https://via.placeholder.com/40',
        email: 'emma@gmail.com',
        phone: '0765 432 109',
    },
];

const columns: TableColumnsType<Student> = [
    {
        title: 'STT',
        dataIndex: 'key',
        key: 'key',
        align: 'center',
    },
    {
        title: 'Người dùng',
        dataIndex: 'username',
        key: 'username',
        align: 'center',
        render: (text: string, record: Student) => (
            <div className="ml-3 flex items-center gap-2">
                <Avatar src={record.avatar} />
                <span>{text}</span>
            </div>
        ),
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        align: 'center',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone',
        key: 'phone',
        align: 'center',
    },
    {
        title: 'Tác vụ',
        key: 'actions',
        align: 'center',
        render: () => (
            <div className="flex items-center justify-center gap-2">
                <Button size="small" className="bg-gray-200">
                    <EyeOutlined /> Xem
                </Button>
                <Button size="small" danger>
                    <DeleteOutlined /> Xoá
                </Button>
            </div>
        ),
    },
];

const ClassManagement = () => {
    const router = useRouter();
    const { id } = useParams(); // Lấy classroomId từ URL
    const [activeTab, setActiveTab] = useState('students');
    const [activeTable, setActiveTable] = useState('lessons');

    const {
        data: classroom,
        isLoading: isClassroomLoading,
        error: classroomError,
    } = useGetClassroomByIdQuery(id as string);

    const {
        data: lessons,
        isLoading: isLessonsLoading,
        error: lessonsError,
    } = useGetLessonsQuery({ classId: id as string });

    const handleMenuClick = (key: string) => {
        if (key === '1') {
            router.push(`/teacher/classroom/${id}/create-lesson`);
        } else if (key === '2') {
            router.push(`/teacher/classroom/${id}/create-exam`);
        }
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: 'Giao bài học',
            icon: <FolderOpenOutlined />,
            onClick: () => handleMenuClick('1'),
        },
        {
            key: '2',
            label: 'Giao đề thi/ bài tập',
            icon: <FileTextOutlined />,
            onClick: () => handleMenuClick('2'),
        },
    ];

    return (
        <div className="p-6">
            {isClassroomLoading ? (
                <div className="flex justify-center">
                    <Spin size="large" />
                </div>
            ) : classroomError ? (
                <Empty description="Lỗi khi tải thông tin lớp học" />
            ) : classroom ? (
                <>
                    <div className="mb-4 inline-block min-w-96 select-none rounded-full bg-[#DAE3E9] px-6 py-2 text-2xl font-bold shadow-sm">
                        <DownOutlined rotate={90} className="mr-4" />
                        {classroom.className}
                    </div>
                    <div className="mb-4">
                        <p className="text-lg">
                            <strong>Mô tả:</strong> {classroom.description}
                        </p>
                        <p className="text-lg">
                            <strong>Số học sinh tối đa:</strong>{' '}
                            {classroom.maxStudent}
                        </p>
                    </div>
                </>
            ) : (
                <Empty description="Không tìm thấy lớp học" />
            )}

            <div className="mb-4 flex justify-end">
                <Dropdown
                    menu={{ items }}
                    trigger={['click']}
                    placement="topLeft"
                    className="flex items-center justify-end !rounded-full !bg-[#DAE3E9] !p-5 !font-montserrat !text-lg"
                >
                    <Button icon={<PlusOutlined />}>Thêm bài mới</Button>
                </Dropdown>
            </div>

            <div className="flex flex-nowrap gap-6">
                <Card className="mt-10 flex h-40 w-80 flex-none items-center justify-center rounded-3xl border-2 border-black font-medium shadow-sm">
                    <button
                        className={twMerge(
                            'mb-4 w-full rounded-full border-2 border-black px-4 py-2 transition-all duration-300 ease-in-out',
                            activeTab === 'students'
                                ? 'border-none bg-[#E9DAE9] font-bold text-[#4D2C5E]'
                                : 'hover:bg-gray-100',
                        )}
                        onClick={() => setActiveTab('students')}
                    >
                        Danh sách học sinh
                    </button>
                    <button
                        className={twMerge(
                            'w-full rounded-full border-2 border-black px-4 py-2 transition-all duration-300 ease-in-out',
                            activeTab === 'tests'
                                ? 'border-none bg-[#E9DAE9] font-bold text-[#4D2C5E]'
                                : 'hover:bg-gray-100',
                        )}
                        onClick={() => setActiveTab('tests')}
                    >
                        Bài học/đề thi
                    </button>
                </Card>

                <div className="flex-grow overflow-hidden rounded-3xl border-2 border-black">
                    <div
                        className={twMerge(
                            'my-2 flex items-center justify-center',
                            activeTab !== 'students'
                                ? 'border-b-2 border-black'
                                : '',
                        )}
                    >
                        {activeTab === 'students' ? (
                            <div className="rounded-full bg-[#E9DAE9] px-5 py-1 text-base font-bold text-[#4D2C5E]">
                                Tất cả học sinh
                            </div>
                        ) : (
                            <div className="relative mb-1 flex w-full items-center justify-around">
                                <button
                                    className={twMerge(
                                        'min-w-[100px] rounded-full px-10 py-1 text-base',
                                        activeTable === 'lessons'
                                            ? 'bg-[#E9DAE9] font-bold text-[#4D2C5E]'
                                            : 'hover:bg-gray-100',
                                    )}
                                    onClick={() => setActiveTable('lessons')}
                                >
                                    Bài học
                                </button>
                                <div className="h-6 w-0 border-l-2 border-black"></div>
                                <button
                                    className={twMerge(
                                        'min-w-[100px] rounded-full px-10 py-1 text-base',
                                        activeTable === 'tests'
                                            ? 'bg-[#E9DAE9] font-bold text-[#4D2C5E]'
                                            : 'hover:bg-gray-100',
                                    )}
                                    onClick={() => setActiveTable('tests')}
                                >
                                    Đề thi
                                </button>
                            </div>
                        )}
                    </div>
                    {activeTab === 'students' ? (
                        <Table
                            size="small"
                            dataSource={students}
                            columns={columns}
                            bordered
                            pagination={{
                                position: ['bottomCenter'],
                                pageSize: 20,
                            }}
                            className="student-table"
                        />
                    ) : (
                        <div className="grid grid-cols-1 place-items-center gap-4 p-2 sm:grid-cols-2">
                            {activeTable === 'lessons' ? (
                                isLessonsLoading ? (
                                    <Spin size="large" />
                                ) : lessonsError ? (
                                    <Empty description="Lỗi khi tải danh sách bài học" />
                                ) : lessons && lessons.length > 0 ? (
                                    lessons.map((lesson) => (
                                        <LessonCard
                                            key={lesson.id}
                                            id={lesson.id}
                                            title={lesson.title}
                                        />
                                    ))
                                ) : (
                                    <div className="col-span-full flex w-full items-center justify-center">
                                        <Empty description="Không có bài học nào" />
                                    </div>
                                )
                            ) : (
                                examList.map((exam) => (
                                    <TestCard
                                        key={exam.id}
                                        title={exam.title}
                                        duration={exam.duration}
                                        attempts={exam.attempts}
                                    />
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClassManagement;
