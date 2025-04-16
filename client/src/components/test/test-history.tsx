'use client';
import { Empty, Table, Typography } from 'antd';
import { useGetSubmissionsQuery } from '@/services/exam';
const { Title } = Typography;
import Link from 'next/link';

const columns = [
    {
        title: 'Ngày làm',
        dataIndex: 'submitAt',
        key: 'submitAt',
        render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
        title: 'Kết quả',
        dataIndex: 'pts',
        key: 'pts',
        render: (pts: number) => {
            if (pts === -1) return 'Chưa làm';
            const newNumber = pts.toFixed(1);
            return `${newNumber}%`;
        },
    },
    {
        title: 'Thời gian làm bài',
        dataIndex: 'timeConsumed',
        key: 'timeConsumed',
    },
    {
        title: 'Bài nộp',
        dataIndex: 'submissionId',
        key: 'submissionId',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        render: (submissionId: string, record: any) => {
            return (
                <Link href={`/test/${record.testId}/result/${submissionId}`}>
                    Xem chi tiết
                </Link>
            );
        },
    },
];

export const TestHistory = ({ id }: { id: string }) => {
    const { data, isLoading } = useGetSubmissionsQuery(id);

    return (
        <>
            <Title level={5}>Kết quả làm bài của bạn:</Title>
            <Table
                rowKey={(record) => record.submissionId || ''}
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
                                    : 'Bạn chưa làm đề thi này'
                            }
                        />
                    ),
                }}
            />
        </>
    );
};
