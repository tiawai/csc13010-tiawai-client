'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import type { UploadFile } from 'antd';
import { twMerge } from 'tailwind-merge';
import FileUploader from '@/components/teacher/classroom/create-lesson/file-uploader';

const CkEditor = dynamic(
    () => import('@/components/teacher/classroom/create-lesson/ckeditor'),
    { ssr: false },
);

const CreateLesson = () => {
    const [content, setContent] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [isEditing, setIsEditing] = useState(true);

    return (
        <div>
            <h1 className="mb-8 text-center text-4xl font-bold capitalize">
                Tạo bài học mới
            </h1>
            <div className="rounded-3xl border-2 border-black p-4 shadow-md">
                <form action="">
                    <div className="mb-4">
                        <label className="block text-xl font-medium">
                            Tên bài học
                        </label>
                        <input
                            type="text"
                            className="mt-2 w-3/5 rounded-full border bg-[#E9DAE9] p-2 focus:outline-none focus:ring focus:ring-purple-300"
                        />
                    </div>

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
                    <div className="flex justify-end space-x-4 font-bold">
                        <Button className="rounded-full bg-[#E37676] px-4 py-2 text-white transition hover:scale-105 hover:opacity-80">
                            Huỷ
                        </Button>
                        <Button className="rounded-full bg-[#E9DAE9] px-4 py-2 text-black transition hover:scale-105 hover:opacity-80">
                            Lưu
                        </Button>
                        <Button className="rounded-full bg-[#DAE3E9] px-4 py-2 text-black transition hover:scale-105 hover:opacity-80">
                            Xuất bản
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateLesson;
