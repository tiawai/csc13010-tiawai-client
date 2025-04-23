'use client';
import { useParams, useRouter } from 'next/navigation';
import { Spin, Empty, Button, Card, Typography, Space, Divider } from 'antd';
import { useGetLessonByIdQuery } from '@/services/classroom.service';
import {
    ArrowLeftOutlined,
    FilePdfOutlined,
    LinkOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

const ViewLesson = () => {
    const { id: lessonId } = useParams();
    const router = useRouter();
    const {
        data: lesson,
        isLoading,
        error,
    } = useGetLessonByIdQuery(lessonId as string);

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push('/');
        }
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
                >
                    Quay lại
                </Button>
            </div>

            <Card className="mb-6 shadow-sm">
                <Title level={2} className="mb-2">
                    {lesson.title}
                </Title>
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
        </div>
    );
};

export default ViewLesson;
