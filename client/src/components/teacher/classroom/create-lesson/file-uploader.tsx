'use client';
import { useState } from 'react';
import { Upload, Modal, message } from 'antd';
import Image from 'next/image';
import { PlusOutlined, FileOutlined, FilePdfOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';

interface FileUploaderProps {
    fileList: UploadFile[];
    setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
}

const FileUploader: React.FC<FileUploaderProps> = ({
    fileList,
    setFileList,
}) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const getBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as File);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(
            file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
        );
    };

    const handleChange: UploadProps['onChange'] = ({
        fileList: newFileList,
    }) => {
        setFileList(newFileList);
    };

    const handleCancel = () => setPreviewOpen(false);

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Thêm file</div>
        </div>
    );

    return (
        <div className="mb-6">
            <label className="block text-xl font-medium">
                Nội dung bài học
            </label>
            <p className="my-3 text-lg text-gray-500">
                Chọn file ảnh, pdf, word
            </p>

            <div className="mb-6">
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    beforeUpload={(file) => {
                        const isValidType =
                            file.type.includes('image') ||
                            file.type.includes('pdf') ||
                            file.type.includes('word') ||
                            file.type.includes('document');

                        if (!isValidType) {
                            message.error(
                                'Chỉ cho phép upload file ảnh, PDF hoặc Word!',
                            );
                            return Upload.LIST_IGNORE;
                        }
                        return false; // Ngăn chặn upload tự động
                    }}
                    multiple
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>

                <Modal
                    open={previewOpen}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                >
                    {previewImage && previewImage.includes('image') ? (
                        <Image
                            src={previewImage}
                            alt="preview"
                            width={300}
                            height={200}
                        />
                    ) : (
                        <div className="p-8 text-center">
                            <p className="mb-3 text-xl font-medium">
                                {previewTitle}
                            </p>
                            {previewTitle.endsWith('.pdf') ? (
                                <FilePdfOutlined style={{ fontSize: 48 }} />
                            ) : (
                                <FileOutlined style={{ fontSize: 48 }} />
                            )}
                            <p className="mt-3">
                                Xem trước không khả dụng cho loại file này
                            </p>
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default FileUploader;
