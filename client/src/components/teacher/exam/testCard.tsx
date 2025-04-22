'use client';
import { Button, Dropdown, notification } from 'antd';
import type { MenuProps } from 'antd';
import {
    ClockCircleOutlined,
    DownloadOutlined,
    MoreOutlined,
    DownOutlined,
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import bookIcon from '@public/teacher/book.svg';
import { useState } from 'react';
import ConfirmModal from '@/components/common/confirm-modal';
import { useDeleteTestByClassroomIdMutation } from '@/services/classroom';

interface TestCardProps {
    id: string;
    classroomId: string;
    title: string;
    duration: number;
    attempts: number;
}

const TestCard: React.FC<TestCardProps> = ({
    id,
    classroomId,
    title,
    duration,
    attempts,
}) => {
    const [deleteTest, { isLoading: isDeleting }] =
        useDeleteTestByClassroomIdMutation();
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteTest({ classroomId, testId: id }).unwrap();
            notification.success({
                message: 'Xóa bài test thành công!',
                description: `Bài test "${title}" đã được xóa khỏi lớp học.`,
            });
            setIsConfirmModalOpen(false);
        } catch (error: unknown) {
            const err = error as { data?: { message?: string | string[] } };
            const errorMessage =
                err.data?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.';
            notification.error({
                message: 'Xóa bài test thất bại',
                description: errorMessage,
            });
        }
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <span className="flex cursor-pointer items-center gap-2 font-semibold hover:bg-gray-100">
                    <EditOutlined />
                    Sửa đề thi
                </span>
            ),
        },
        {
            key: '2',
            label: (
                <span className="flex cursor-pointer items-center gap-2 font-semibold text-red-500 hover:bg-gray-100">
                    <DeleteOutlined />
                    Xoá đề thi
                </span>
            ),
            onClick: () => setIsConfirmModalOpen(true),
        },
    ];

    return (
        <div className="flex items-center gap-3 rounded-xl bg-blue-100 p-5 hover:shadow-md">
            <Image src={bookIcon} alt="Book Icon" className="h-20 w-20" />

            <div className="w-44 flex-1">
                <div className="overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold">
                    {title}
                </div>
                <div className="mt-1 flex items-center justify-between text-sm text-gray-600">
                    <ClockCircleOutlined className="mr-1 text-black" />{' '}
                    {duration} phút
                    <DownloadOutlined className="mr-1 text-black" /> {attempts}{' '}
                    lượt làm
                </div>
                <div className="mt-2 flex justify-between">
                    <Button
                        type="primary"
                        shape="round"
                        className="flex items-center bg-[#2C2F5E] !p-2 !text-sm"
                    >
                        Xem bài test <DownOutlined className="ml-1" />
                    </Button>

                    <Dropdown
                        menu={{ items }}
                        trigger={['click']}
                        placement="bottomLeft"
                    >
                        <MoreOutlined
                            className="cursor-pointer text-xl"
                            rotate={90}
                        />
                    </Dropdown>
                </div>
            </div>

            <ConfirmModal
                open={isConfirmModalOpen}
                content={`Bạn có chắc chắn muốn xóa bài test "${title}" khỏi lớp học không?`}
                onConfirm={handleDelete}
                onCancel={() => setIsConfirmModalOpen(false)}
                confirmLoading={isDeleting}
            />
        </div>
    );
};

export default TestCard;
