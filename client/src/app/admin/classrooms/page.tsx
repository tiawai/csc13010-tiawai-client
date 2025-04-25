'use client';
import { useMemo, useState } from 'react';
import { Flex, Table, Button, Empty, notification } from 'antd';
import { AdminBanner } from '@/components/common/banner';
import { TableInputSearch } from '@/components/admin/table';
import ConfirmModal from '@/components/common/confirm-modal';
import { usePagination } from '@/lib/hooks/use-paganation';
import { useSearch } from '@/lib/hooks/use-search';
import { useNotification } from '@/lib/hooks/use-notification';
import {
    useGetClassroomsQuery,
    useDeleteClassroomMutation,
} from '@/services/classroom.service';
import { Classroom } from '@/types/classroom.type';

export default function AdminClassroomsPage() {
    const { data: classrooms = [], isLoading } = useGetClassroomsQuery();
    const [deleteClassroomMutation, { isLoading: isDeleting }] =
        useDeleteClassroomMutation();
    const { notify } = useNotification();
    const { currentPage, pageSize, handlePageChange } = usePagination(5);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [selectedClassroomId, setSelectedClassroomId] = useState<
        string | null
    >(null);

    const searchFn = (classroom: Classroom, query: string): boolean => {
        const value = query.toLowerCase();
        return classroom.className.toLowerCase().includes(value);
    };

    const { searchText, filteredData, handleSearch } = useSearch<Classroom>(
        classrooms || [],
        searchFn,
    );

    const handleDelete = async () => {
        if (!selectedClassroomId) return;
        try {
            await deleteClassroomMutation(selectedClassroomId).unwrap();
            notification.success({
                message: 'Thành công',
                description: 'Xóa lớp học thành công!',
            });
            setIsConfirmModalOpen(false);
            setSelectedClassroomId(null);
        } catch (error: unknown) {
            const err = error as Error;
            notification.error({
                message: 'Xoá lớp học thất bại',
                description:
                    err.message || 'Lỗi không xác định. Vui lòng thử lại.',
            });
            console.error(error);
        }
    };

    const columns = useMemo(
        () => [
            {
                title: 'Tên lớp học',
                dataIndex: 'className',
                key: 'className',
            },
            {
                title: 'Mã lớp',
                dataIndex: 'classCode',
                key: 'classCode',
            },
            {
                title: 'Ngày tạo',
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: (date: string) => new Date(date).toLocaleDateString(),
            },
            {
                title: 'Số học sinh tối đa',
                dataIndex: 'maxStudent',
                key: 'maxStudent',
            },
            {
                title: 'Giá (VND)',
                dataIndex: 'price',
                key: 'price',
                render: (price: number) =>
                    price === 0
                        ? 'FREE'
                        : new Intl.NumberFormat('vi-VN').format(price),
            },
            {
                title: 'Số bài học',
                dataIndex: 'totalLessons',
                key: 'totalLessons',
            },
            {
                title: 'Đánh giá',
                dataIndex: 'avgRating',
                key: 'avgRating',
                render: (rating: string) =>
                    rating === '0' ? 'Chưa có đánh giá' : rating,
            },
            {
                title: 'Thanh điều khiển',
                key: 'actions',
                render: (record: Classroom) => (
                    <Flex justify="start" gap={10}>
                        <Button
                            type="primary"
                            shape="round"
                            danger
                            onClick={() => {
                                setSelectedClassroomId(record.id);
                                setIsConfirmModalOpen(true);
                            }}
                            disabled={isDeleting}
                        >
                            Xóa
                        </Button>
                    </Flex>
                ),
            },
        ],
        [isDeleting, notify],
    );

    return (
        <>
            <div className="space-y-4">
                <AdminBanner text="Quản lý lớp học" />
                <div className="flex items-center justify-between gap-4">
                    <TableInputSearch
                        placeholder="Tìm kiếm lớp học"
                        value={searchText}
                        onChange={handleSearch}
                    />
                </div>
                <Table
                    rowKey={(record) => record.id}
                    dataSource={filteredData}
                    columns={columns}
                    loading={isLoading}
                    locale={{
                        emptyText: (
                            <Empty
                                imageStyle={{ height: 60 }}
                                description={
                                    isLoading
                                        ? 'Đang tải...'
                                        : 'Không có lớp học nào'
                                }
                            />
                        ),
                    }}
                    pagination={{
                        position: ['bottomCenter'],
                        pageSize: pageSize,
                        pageSizeOptions: [5, 10, 20, 50],
                        total: filteredData?.length || 0,
                        showSizeChanger: true,
                        current: currentPage,
                        onChange: handlePageChange,
                    }}
                />
                <ConfirmModal
                    open={isConfirmModalOpen}
                    content="Bạn có chắc chắn muốn xóa lớp học này?"
                    onConfirm={handleDelete}
                    onCancel={() => {
                        setIsConfirmModalOpen(false);
                        setSelectedClassroomId(null);
                    }}
                    confirmLoading={isDeleting}
                />
            </div>
        </>
    );
}
