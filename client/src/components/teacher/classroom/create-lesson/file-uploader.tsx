'use client';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { useState } from 'react';

interface FileUploaderProps {
    fileList: UploadFile[];
    setFileList: (fileList: UploadFile[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
    fileList,
    setFileList,
}) => {
    const [error, setError] = useState<string | null>(null);

    const handleChange: UploadProps['onChange'] = ({
        fileList: newFileList,
    }) => {
        const validFiles = newFileList.filter((file) => {
            const isValidType =
                file.type === 'application/pdf' ||
                file.type ===
                    'application/vnd.openxmlformats-officedocument.presentationml.presentation';
            if (!isValidType && file.status !== 'removed') {
                message.error(`${file.name} không phải là file PDF hoặc PPTX`);
                return false;
            }
            return true;
        });

        if (validFiles.length > 10) {
            message.error('Chỉ được upload tối đa 10 file');
            setFileList(validFiles.slice(0, 10));
        } else {
            setFileList(validFiles);
        }
        setError(null);
    };

    const beforeUpload = (file: UploadFile) => {
        const isValidType =
            file.type === 'application/pdf' ||
            file.type ===
                'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        if (!isValidType) {
            setError(`${file.name} không phải là file PDF hoặc PPTX`);
            return false;
        }
        if (fileList.length >= 10) {
            setError('Chỉ được upload tối đa 10 file');
            return false;
        }
        return true;
    };

    return (
        <div className="mb-4">
            <label className="block text-xl font-medium">
                Tài liệu đính kèm
            </label>
            <Upload
                fileList={fileList}
                onChange={handleChange}
                beforeUpload={beforeUpload}
                multiple
                accept=".pdf,.pptx"
                maxCount={10}
            >
                <Button icon={<UploadOutlined />}>Chọn file (PDF, PPTX)</Button>
            </Upload>
            {error && <p className="mt-2 text-red-500">{error}</p>}
        </div>
    );
};

export default FileUploader;
