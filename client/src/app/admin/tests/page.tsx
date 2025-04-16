'use client';
import { Button, Empty, Table, Tag } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useGetTestsQuery } from '@/services/test.service';
import { AdminBanner } from '@/components/common/banner';
import { ColumnsType } from 'antd/es/table';
import { Test } from '@/types/test.type';

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
        render: (date: Date) => new Date(date).toLocaleString(),
    },
    {
        title: 'Ngày kết thúc',
        dataIndex: 'endDate',
        key: 'endDate',
        render: (date: Date) => new Date(date).toLocaleString(),
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

export default function AdminExamsPage() {
    const router = useRouter();
    const pathname = usePathname();
    const { data, isLoading } = useGetTestsQuery();

    const TableAction = () => {
        return (
            <div className="flex items-center justify-end">
                <Button onClick={() => router.push(`${pathname}/create`)}>
                    Tạo đề thi
                </Button>
            </div>
        );
    };

    return (
        <div className="space-y-4">
            <AdminBanner text="Quản lý đề thi" />
            <TableAction />
            <Table
                rowKey={(record) => record.id}
                dataSource={data || []}
                columns={columns}
                pagination={false}
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
            />
        </div>
    );
}
