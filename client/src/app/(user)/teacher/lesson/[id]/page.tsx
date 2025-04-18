'use client';
import { useParams, useRouter } from 'next/navigation';
import {
    Spin,
    Empty,
    Button,
    notification,
    Card,
    Typography,
    Space,
    Divider,
} from 'antd';
import {
    useGetLessonByIdQuery,
    useDeleteLessonMutation,
} from '@/services/classroom';
import {
    ArrowLeftOutlined,
    EditOutlined,
    DeleteOutlined,
    FilePdfOutlined,
    LinkOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import ConfirmModal from '@/components/common/confirm-modal';

const { Title, Text } = Typography;

const ViewLesson = () => {
    const { id: lessonId } = useParams();
    const router = useRouter();
    const {
        data: lesson,
        isLoading,
        error,
    } = useGetLessonByIdQuery(lessonId as string);
    const [deleteLesson, { isLoading: isDeleting }] = useDeleteLessonMutation();
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push('/');
        }
    };

    const handleEdit = () => {
        router.push(`/teacher/lesson/${lessonId}/edit`);
    };

    const handleDelete = async () => {
        try {
            await deleteLesson(lessonId as string).unwrap();
            notification.success({
                message: 'Thành công',
                description: 'Xóa bài học thành công!',
                placement: 'topRight',
            });
            if (window.history.length > 1) {
                router.back();
            } else {
                router.push('/');
            }
        } catch (error: unknown) {
            notification.error({
                message: 'Lỗi',
                description:
                    error?.data?.message ||
                    'Xóa bài học thất bại. Vui lòng thử lại sau.',
                placement: 'topRight',
            });
        }
        setIsConfirmModalOpen(false);
    };

    if (isLoading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <Spin size="large" tip="Đang tải bài học..." />
            </div>
        );
    }

    if (error) {
        return (
            <Empty
                className="mt-20"
                description="Đã xảy ra lỗi khi tải bài học"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
            >
                <Button type="primary" onClick={handleBack}>
                    Quay lại
                </Button>
            </Empty>
        );
    }

    if (!lesson) {
        return (
            <Empty
                className="mt-20"
                description="Không tìm thấy bài học này"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
            >
                <Button type="primary" onClick={handleBack}>
                    Quay lại
                </Button>
            </Empty>
        );
    }

    return (
        <div className="mx-auto max-w-5xl flex-col space-y-4 p-6">
            <div className="mb-6 flex items-center justify-between">
                <Button
                    icon={<ArrowLeftOutlined />}
                    size="large"
                    className="flex items-center hover:bg-gray-100"
                    onClick={handleBack}
                    disabled={isDeleting}
                >
                    Quay lại
                </Button>
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        type="primary"
                        ghost
                        size="large"
                        onClick={handleEdit}
                        disabled={isDeleting}
                    >
                        Chỉnh sửa
                    </Button>
                    <Button
                        icon={<DeleteOutlined />}
                        type="primary"
                        danger
                        size="large"
                        onClick={() => setIsConfirmModalOpen(true)}
                        loading={isDeleting}
                        disabled={isDeleting}
                    >
                        Xóa bài học
                    </Button>
                </Space>
            </div>

            <Card className="mb-6 shadow-sm">
                <Title level={2} className="mb-2">
                    {lesson.title}
                </Title>
                {lesson.description && (
                    <Text type="secondary" className="mb-4 block">
                        {lesson.description}
                    </Text>
                )}
                <Divider />
                <div
                    className="preview-content prose max-w-none rounded-md border bg-white p-4 py-2"
                    dangerouslySetInnerHTML={{ __html: lesson.content }}
                />
            </Card>

            {lesson.attachments && lesson.attachments.length > 0 && (
                <Card className="shadow-sm">
                    <Title level={4}>
                        Tài liệu đính kèm ({lesson.attachments.length})
                    </Title>
                    <Divider className="mb-4 mt-2" />
                    <Space direction="vertical" className="w-full">
                        {lesson.attachments.map((attachment, index) => {
                            const fileName =
                                attachment.split('/').pop() ||
                                `Tài liệu ${index + 1}`;
                            const isDocument = fileName
                                .toLowerCase()
                                .endsWith('.pdf');

                            return (
                                <Card
                                    key={index}
                                    size="small"
                                    className="w-full transition-colors hover:bg-gray-50"
                                >
                                    <a
                                        href={attachment}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-blue-600 hover:text-blue-800"
                                    >
                                        {isDocument ? (
                                            <FilePdfOutlined className="mr-2 text-red-500" />
                                        ) : (
                                            <LinkOutlined className="mr-2" />
                                        )}
                                        <span>{fileName}</span>
                                    </a>
                                </Card>
                            );
                        })}
                    </Space>
                </Card>
            )}

            <ConfirmModal
                open={isConfirmModalOpen}
                content="Bạn có chắc chắn muốn xóa bài học này không?"
                onConfirm={handleDelete}
                onCancel={() => setIsConfirmModalOpen(false)}
            />
        </div>
    );
};

export default ViewLesson;
