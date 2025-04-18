'use client';
import { Button, Dropdown, notification } from 'antd';
import type { MenuProps } from 'antd';
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import videoIcon from '@public/teacher/video.svg';
import { useDeleteLessonMutation } from '@/services/classroom';
import { useState } from 'react';
import ConfirmModal from '@/components/common/confirm-modal';

interface LessonCardProps {
    id: string;
    title: string;
}

const LessonCard: React.FC<LessonCardProps> = ({ id, title }) => {
    const router = useRouter();
    const [deleteLesson, { isLoading: isDeleting }] = useDeleteLessonMutation();
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const handleView = () => {
        router.push(`/teacher/lesson/${id}`);
    };

    const handleEdit = () => {
        router.push(`/teacher/lesson/${id}/edit`);
    };

    const handleDelete = async () => {
        try {
            await deleteLesson(id).unwrap();
            notification.success({ message: 'Xóa bài học thành công!' });
            setIsConfirmModalOpen(false);
        } catch (error: unknown) {
            notification.error({
                message: 'Xóa bài học thất bại',
                description:
                    (error as { data: { message: string } })?.data?.message ||
                    'Lỗi không xác định',
            });
        }
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <span
                    className="flex cursor-pointer items-center gap-2 font-semibold hover:bg-gray-100"
                    onClick={handleEdit}
                >
                    <EditOutlined />
                    Sửa bài học
                </span>
            ),
        },
        {
            key: '2',
            label: (
                <span
                    className="flex cursor-pointer items-center gap-2 font-semibold text-red-500 hover:bg-gray-100"
                    onClick={() => setIsConfirmModalOpen(true)}
                >
                    <DeleteOutlined />
                    Xóa bài học
                </span>
            ),
        },
    ];

    return (
        <div className="flex items-center gap-3 rounded-xl bg-pink-100 p-5 hover:shadow-md">
            <Image src={videoIcon} alt="Book Icon" className="h-20 w-20" />
            <div className="w-44 flex-1">
                <div className="overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold">
                    {title}
                </div>
                <div className="mt-2 flex justify-between">
                    <Button
                        type="primary"
                        shape="round"
                        className="flex !p-2 !text-sm"
                        onClick={handleView}
                        disabled={isDeleting}
                    >
                        Xem
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
                content="Bạn có chắc chắn muốn xóa bài học này không?"
                onConfirm={handleDelete}
                onCancel={() => setIsConfirmModalOpen(false)}
            />
        </div>
    );
};

export default LessonCard;
