// @/components/teacher/classroom/classroom-modal.tsx
'use client';
import { useEffect, useState } from 'react';
import {
    Modal,
    Form,
    Input,
    InputNumber,
    Upload,
    Button,
    notification,
    Image,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import {
    useCreateClassroomMutation,
    useUpdateClassroomMutation,
} from '@/services/classroom';
import { Classroom, CreateClassroomDto } from '@/types/classroom.type';

interface ClassroomModalProps {
    open: boolean;
    onClose: () => void;
    classroom?: Classroom;
}

const ClassroomModal: React.FC<ClassroomModalProps> = ({
    open,
    onClose,
    classroom,
}) => {
    const [form] = Form.useForm();
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [createClassroom, { isLoading: isCreating }] =
        useCreateClassroomMutation();
    const [updateClassroom, { isLoading: isUpdating }] =
        useUpdateClassroomMutation();

    useEffect(() => {
        if (classroom) {
            form.setFieldsValue({
                className: classroom.className,
                maxStudent: classroom.maxStudent,
                price: classroom.price,
                description: classroom.description,
            });
            setPreviewImage(classroom.backgroundImage);
            setFileList([]);
        } else {
            form.resetFields();
            setPreviewImage(null);
            setFileList([]);
        }
    }, [classroom, form]);

    const handlePreviewImage = (file: File) => {
        const reader = new FileReader();
        reader.onload = () => setPreviewImage(reader.result as string);
        reader.readAsDataURL(file);
    };

    const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
        setFileList(fileList);
        if (fileList.length > 0 && fileList[0].originFileObj) {
            handlePreviewImage(fileList[0].originFileObj);
        } else {
            setPreviewImage(null);
        }
    };

    const onFinish = async (values: CreateClassroomDto) => {
        const formData = new FormData();
        formData.append('className', values.className);
        formData.append('maxStudent', values.maxStudent.toString());
        formData.append('description', values.description);
        if (values.price !== undefined && values.price !== null) {
            formData.append('price', values.price.toString());
        }
        if (fileList.length > 0 && fileList[0].originFileObj) {
            formData.append('image', fileList[0].originFileObj);
        }

        try {
            if (classroom) {
                await updateClassroom({ id: classroom.id, formData }).unwrap();
                notification.success({
                    message: 'Cập nhật lớp học thành công!',
                });
            } else {
                await createClassroom(formData).unwrap();
                notification.success({ message: 'Tạo lớp học thành công!' });
            }
            form.resetFields();
            setPreviewImage(null);
            setFileList([]);
            onClose();
        } catch (error: unknown) {
            notification.error({
                message: classroom
                    ? 'Cập nhật lớp học thất bại'
                    : 'Tạo lớp học thất bại',
                description:
                    (error as { data: { message: string } })?.data?.message ||
                    'Lỗi không xác định. Vui lòng thử lại.',
            });
        }
    };

    return (
        <Modal
            title={classroom ? 'Sửa lớp học' : 'Tạo lớp học mới'}
            open={open}
            onCancel={onClose}
            footer={null}
            destroyOnClose
        >
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Form.Item
                    name="className"
                    label="Tên lớp học"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên lớp học',
                        },
                    ]}
                >
                    <Input placeholder="Ví dụ: Advanced English Grammar" />
                </Form.Item>
                <Form.Item
                    name="maxStudent"
                    label="Số học sinh tối đa"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập số học sinh tối đa',
                        },
                        {
                            type: 'number',
                            min: 1,
                            message:
                                'Số học sinh tối đa phải là số nguyên dương',
                        },
                    ]}
                >
                    <InputNumber
                        min={1}
                        step={1}
                        precision={0}
                        placeholder="Ví dụ: 30"
                        style={{ width: '100%' }}
                    />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Giá (VNĐ, để trống nếu miễn phí)"
                >
                    <InputNumber
                        min={0}
                        step={1000}
                        placeholder="Ví dụ: 199000"
                        style={{ width: '100%' }}
                    />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Mô tả"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                >
                    <Input.TextArea
                        rows={4}
                        placeholder="Ví dụ: Học ngữ pháp tiếng Anh nâng cao"
                    />
                </Form.Item>
                <Form.Item name="image" label="Hình nền lớp học">
                    <Upload
                        fileList={fileList}
                        beforeUpload={() => false} // Prevent auto-upload
                        onChange={handleUploadChange}
                        maxCount={1}
                        accept="image/*"
                    >
                        <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
                    </Upload>
                </Form.Item>
                {previewImage && (
                    <div className="mt-2">
                        <Image
                            src={previewImage}
                            alt="Preview"
                            width={200}
                            height={100}
                            style={{ objectFit: 'cover', borderRadius: '4px' }}
                        />
                    </div>
                )}
                <Form.Item>
                    <div className="flex justify-end gap-2">
                        <Button onClick={onClose}>Hủy</Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isCreating || isUpdating}
                        >
                            {classroom ? 'Cập nhật' : 'Tạo'}
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ClassroomModal;
