'use client';
import { PageLayout, PageTitle } from '@/components/common/page';
import profileTiawai from '@public/profile-tiawai.webp';
import {
    useGetStudentPaymentsQuery,
    useGetTeacherPaymentsQuery,
} from '@/services/payment.service';
import { Empty, Table, Tag } from 'antd';
import { usePagination } from '@/lib/hooks/use-paganation';
import { Payment, PaymentStatus, PaymentType } from '@/types/payment.type';
import { ColumnsType } from 'antd/es/table';
import { useAppSelector } from '@/lib/hooks/hook';
import { Role } from '@/types/user.type';

const columns: ColumnsType<Payment> = [
    {
        title: 'Mã đơn hàng',
        dataIndex: 'orderCode',
        key: 'orderCode',
    },
    {
        title: 'Loại thanh toán',
        dataIndex: 'type',
        key: 'type',
        render: (type: PaymentType) => <Tag color="blue">{type}</Tag>,
    },
    {
        title: 'Nội dung thanh toán',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Thời gian',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date?: Date) => (date ? new Date(date).toLocaleString() : '-'),
    },
    {
        title: 'Giá tiền tương đương',
        dataIndex: 'amount',
        key: 'amount',
        render: (amount: number) => `${amount.toLocaleString()} VND`,
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        render: (status: PaymentStatus) => {
            const color =
                status === PaymentStatus.SUCCESS
                    ? 'green'
                    : status === PaymentStatus.PENDING
                      ? 'blue'
                      : 'red';
            return <Tag color={color}>{status}</Tag>;
        },
    },
];

export default function PaymentHistoryPage() {
    const userRole = useAppSelector((state) => state.auth.user.role);
    const { data: payments, isLoading } =
        userRole === Role.STUDENT
            ? useGetStudentPaymentsQuery(undefined, {
                  skip: userRole !== Role.STUDENT,
              })
            : useGetTeacherPaymentsQuery(undefined, {
                  skip: userRole !== Role.TEACHER,
              });
    const { currentPage, pageSize, handlePageChange } = usePagination(5);

    return (
        <PageLayout>
            <PageTitle
                title="Lịch sử giao dịch"
                imageSrc={profileTiawai}
                imageAlt="Profile Tiawai"
            />
            <Table
                rowKey={(record) => record.id}
                dataSource={payments}
                columns={columns}
                loading={isLoading}
                locale={{
                    emptyText: (
                        <Empty
                            imageStyle={{ height: 60 }}
                            description={
                                isLoading
                                    ? 'Đang tải...'
                                    : 'Không có thanh toán nào'
                            }
                        />
                    ),
                }}
                pagination={{
                    position: ['bottomCenter'],
                    pageSize: pageSize,
                    pageSizeOptions: [5, 10, 20, 50],
                    total: payments?.length || 0,
                    showSizeChanger: true,
                    current: currentPage,
                    onChange: handlePageChange,
                }}
            />
        </PageLayout>
    );
}
