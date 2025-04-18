'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification, Spin, Empty } from 'antd';
import type { UploadFile } from 'antd';
import { twMerge } from 'tailwind-merge';
import FileUploader from '@/components/teacher/classroom/create-lesson/file-uploader';
import {
    useGetLessonByIdQuery,
    useUpdateLessonMutation,
} from '@/services/classroom';

const CkEditor = dynamic(
    () => import('@/components/teacher/classroom/create-lesson/ckeditor'),
    {
        ssr: false,
    },
);

const EditLesson = () => {
    const [form] = Form.useForm();
    const [content, setContent] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [isEditing, setIsEditing] = useState(true);
    const { id: lessonId } = useParams();
    const router = useRouter();
    const {
        data: lesson,
        isLoading: isLessonLoading,
        error: lessonError,
    } = useGetLessonByIdQuery(lessonId as string);
    const [updateLesson, { isLoading: isUpdating }] = useUpdateLessonMutation();

    useEffect(() => {
        if (lesson) {
            form.setFieldsValue({ title: lesson.title });
            setContent(lesson.content);
            const initialFiles = lesson.attachments.map((url, index) => ({
                uid: `-${index}`,
                name: url.split('/').pop() || `file-${index + 1}`,
                status: 'done',
                url,
            })) as UploadFile[];
            setFileList(initialFiles);
        }
    }, [lesson, form]);

    const onFinish = async (values: { title: string }) => {
        if (!content.trim()) {
            notification.error({
                message: 'Nội dung bài học không được để trống',
            });
            return;
        }

        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('content', content);
        fileList.forEach((file) => {
            if (file.originFileObj) {
                formData.append('files', file.originFileObj);
            }
        });

        try {
            await updateLesson({ id: lessonId as string, formData }).unwrap();
            notification.success({ message: 'Cập nhật bài học thành công!' });
            if (window.history.length > 1) {
                router.back();
            } else {
                router.push('/');
            }
        } catch (error: unknown) {
            const err = error as Error;
            notification.error({
                message: 'Cập nhật bài học thất bại',
                description:
                    err.message || 'Lỗi không xác định. Vui lòng thử lại.',
            });
        }
    };

    const handleCancel = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push('/');
        }
    };

    if (isLessonLoading) {
        return <Spin size="large" className="mt-20 flex justify-center" />;
    }

    if (lessonError || !lesson) {
        return <Empty description="Không tìm thấy bài học" />;
    }

    return (
        <div>
            <h1 className="mb-8 text-center text-4xl font-bold capitalize">
                Sửa bài học
            </h1>
            <div className="rounded-3xl border-2 border-black p-4 shadow-md">
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <Form.Item
                        name="title"
                        label="Tên bài học"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên bài học',
                            },
                        ]}
                    >
                        <Input
                            className="mt-2 w-3/5 rounded-full border bg-[#E9DAE9] p-2 focus:outline-none focus:ring focus:ring-purple-300"
                            placeholder="Ví dụ: Introduction to Grammar"
                        />
                    </Form.Item>

                    <FileUploader
                        fileList={fileList}
                        setFileList={setFileList}
                    />

                    <div className="mb-6">
                        <div className="flex space-x-4">
                            <Button
                                icon={<EditOutlined />}
                                className={twMerge(
                                    'rounded-full px-4 py-2 transition',
                                    isEditing
                                        ? 'bg-[#E9DAE9] text-black'
                                        : 'bg-white',
                                )}
                                onClick={() => setIsEditing(true)}
                            >
                                Chế độ soạn thảo
                            </Button>
                            <Button
                                icon={<EyeOutlined />}
                                className={twMerge(
                                    'rounded-full px-4 py-2 transition',
                                    !isEditing
                                        ? 'bg-[#E9DAE9] text-black'
                                        : 'bg-white',
                                )}
                                onClick={() => setIsEditing(false)}
                            >
                                Chế độ xem trước
                            </Button>
                        </div>

                        <div className="mt-4">
                            {isEditing ? (
                                <CkEditor
                                    value={content}
                                    onChange={setContent}
                                />
                            ) : (
                                <div
                                    className="preview-content min-h-[300px] rounded-md border bg-white p-4"
                                    dangerouslySetInnerHTML={{
                                        __html: content,
                                    }}
                                />
                            )}
                        </div>
                    </div>

                    <Form.Item>
                        <div className="flex justify-end space-x-4 font-bold">
                            <Button
                                className="rounded-full bg-[#E37676] px-4 py-2 text-white transition hover:scale-105 hover:opacity-80"
                                onClick={handleCancel}
                                disabled={isUpdating}
                            >
                                Hủy
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="rounded-full bg-[#DAE3E9] px-4 py-2 text-black transition hover:scale-105 hover:opacity-80"
                                loading={isUpdating}
                            >
                                Lưu
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default EditLesson;
