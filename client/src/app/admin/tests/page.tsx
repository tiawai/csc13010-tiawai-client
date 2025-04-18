'use client';
import { Button, Empty, Table, Tag } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useGetTestsQuery } from '@/services/test.service';
import { AdminBanner } from '@/components/common/banner';
import { ColumnsType } from 'antd/es/table';
import { Test } from '@/types/test.type';
import { usePagination } from '@/lib/hooks/use-paganation';
import { useSearch } from '@/lib/hooks/use-search';
import { TableInputSearch } from '@/components/admin/table';

const columns: ColumnsType<Test> = [
    {
        title: 'Tiêu đề',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Loại đề thi',
        dataIndex: 'type',
        key: 'type',
        render: (type) => <Tag color="blue">{type}</Tag>,
    },
    {
        title: 'Ngày bắt đầu',
        dataIndex: 'startDate',
        key: 'startDate',
        render: (date: Date) => new Date(date).toLocaleDateString(),
    },
    {
        title: 'Ngày kết thúc',
        dataIndex: 'endDate',
        key: 'endDate',
        render: (date: Date) => new Date(date).toLocaleDateString(),
    },
    {
        title: 'Số câu hỏi',
        dataIndex: 'totalQuestions',
        key: 'totalQuestions',
    },
    {
        title: 'Thời lượng (phút)',
        dataIndex: 'timeLength',
        key: 'timeLength',
    },
    {
        title: 'Tự động tạo',
        dataIndex: 'isGenerated',
        key: 'isGenerated',
        render: (value: boolean) => (value ? 'Có' : 'Không'),
    },
];

export default function AdminTestsPage() {
    const router = useRouter();
    const pathname = usePathname();
    const { data: tests, isLoading } = useGetTestsQuery();

    const { currentPage, pageSize, handlePageChange } = usePagination(5);

    const searchFn = (test: Test, query: string) => {
        const value = query.toLowerCase();
        return (
            test.title?.toLowerCase().includes(value) ||
            test.type?.toLowerCase().includes(value) ||
            new Date(test.startDate).toLocaleDateString().includes(query) ||
            new Date(test.endDate).toLocaleDateString().includes(query) ||
            test.totalQuestions?.toString().includes(query) ||
            test.timeLength?.toString().includes(query) ||
            (test.isGenerated ? 'Có' : 'Không').includes(query)
        );
    };

    const { searchText, filteredData, handleSearch } = useSearch<Test>(
        tests || [],
        searchFn,
    );

    return (
        <div className="space-y-4">
            <AdminBanner text="Quản lý đề thi" />
            <div className="flex items-center justify-between gap-4">
                <TableInputSearch
                    placeholder="Tìm kiếm đề thi"
                    value={searchText}
                    onChange={handleSearch}
                />
                <Button onClick={() => router.push(`${pathname}/create`)}>
                    Tạo đề thi
                </Button>
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
                                    : 'Không có đề thi nào'
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
    );
}
