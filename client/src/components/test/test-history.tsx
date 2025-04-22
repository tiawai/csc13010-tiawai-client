'use client';
import { Empty, Table, Typography } from 'antd';
const { Title } = Typography;
import Link from 'next/link';
import { useGetSubmissionsByTestIdQuery } from '@/services/test.service';

const columns = [
    {
        title: 'Ngày làm',
        dataIndex: 'submitAt',
        key: 'submitAt',
        render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
        title: 'Kết quả',
        dataIndex: 'score',
        key: 'score',
        render: (score: number) => {
            if (Number(score) === -1) return 'Chưa làm';
            const newNumber = Number(score).toFixed(1);
            return `${newNumber}%`;
        },
    },
    {
        title: 'Thời gian làm bài',
        dataIndex: 'timeConsumed',
        key: 'timeConsumed',
        render: (timeConsumed: number) => {
            const minutes = Math.floor(timeConsumed / 60);
            const seconds = timeConsumed % 60;
            return `${minutes} phút ${seconds} giây`;
        },
    },
    {
        title: 'Bài nộp',
        dataIndex: 'id',
        key: 'id',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        render: (id: string, record: any) => {
            return (
                <Link href={`/student/test/${record.testId}/result/${id}`}>
                    Xem chi tiết
                </Link>
            );
        },
    },
];

export const TestHistory = ({ id }: { id: string }) => {
    const { data, isLoading } = useGetSubmissionsByTestIdQuery(id);

    return (
        <>
            <Title level={5}>Kết quả làm bài của bạn:</Title>
            <Table
                rowKey={(record) => record.id || ''}
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
