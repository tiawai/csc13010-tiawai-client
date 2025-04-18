'use client';
import { useMemo } from 'react';
import { Flex, Table, Button, Empty } from 'antd';
import { AdminBanner } from '@/components/common/banner';
import { TableInputSearch } from '@/components/admin/table';
import { usePagination } from '@/lib/hooks/use-paganation';
import { useSearch } from '@/lib/hooks/use-search';
import { useNotification } from '@/lib/hooks/use-notification';
import {
    useGetClassroomsQuery,
    useDeleteClassroomMutation,
} from '@/services/classroom';
import { Classroom } from '@/types/classroom.type';

export default function AdminClassroomsPage() {
    // Use the real API query
    const { data: classrooms = [], isLoading } = useGetClassroomsQuery();

    // Use the real delete mutation
    const [deleteClassroomMutation] = useDeleteClassroomMutation();

    const { notify } = useNotification();
    const { currentPage, pageSize, handlePageChange } = usePagination(5);

    const searchFn = (classroom: Classroom, query: string): boolean => {
        const value = query.toLowerCase();
        return classroom.className.toLowerCase().includes(value);
    };

    const { searchText, filteredData, handleSearch } = useSearch<Classroom>(
        classrooms || [],
        searchFn,
    );

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
                                if (
                                    confirm(
                                        'Bạn có chắc chắn muốn xóa lớp học này?',
                                    )
                                ) {
                                    deleteClassroomMutation(record.id)
                                        .unwrap()
                                        .then(() => {
                                            notify({
                                                message:
                                                    'Xóa lớp học thành công',
                                            });
                                        })
                                        .catch((error) => {
                                            notify({
                                                message:
                                                    'Đã có lỗi xảy ra khi xóa lớp học',
                                                notiType: 'error',
                                            });
                                            console.error(error);
                                        });
                                }
                            }}
                        >
                            Xóa
                        </Button>
                    </Flex>
                ),
            },
        ],
        [],
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
            </div>
        </>
    );
}
