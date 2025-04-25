'use client';
import { Button, Empty, Table, Tag } from 'antd';
import { useGetAllPaymentsQuery } from '@/services/payment.service';
import { AdminBanner } from '@/components/common/banner';
import { ColumnsType } from 'antd/es/table';
import {
    Payment,
    PaymentStatus,
    PaymentType,
    PayoutStatus,
} from '@/types/payment.type';
import { usePagination } from '@/lib/hooks/use-paganation';
import { useSearch } from '@/lib/hooks/use-search';
import { TableInputSearch } from '@/components/admin/table';
import { useRouter } from 'next/navigation';

const columns: ColumnsType<Payment> = [
    {
        title: 'Mã đơn hàng',
        dataIndex: 'orderCode',
        key: 'orderCode',
    },
    {
        title: 'Số tiền',
        dataIndex: 'amount',
        key: 'amount',
        render: (amount: number) => `${amount.toLocaleString()} VND`,
    },
    {
        title: 'Trạng thái thanh toán',
        dataIndex: 'status',
        key: 'status',
        render: (status: PaymentStatus) => {
            const color =
                status === PaymentStatus.SUCCESS
                    ? 'green'
                    : status === PaymentStatus.FAILED
                      ? 'red'
                      : 'blue';
            return <Tag color={color}>{status}</Tag>;
        },
    },
    {
        title: 'Loại thanh toán',
        dataIndex: 'type',
        key: 'type',
        render: (type: PaymentType) => <Tag color="blue">{type}</Tag>,
    },
    {
        title: 'Trạng thái thanh toán lại',
        dataIndex: 'payoutStatus',
        key: 'payoutStatus',
        render: (payoutStatus?: PayoutStatus) => {
            const color =
                payoutStatus === PayoutStatus.PROCESSED
                    ? 'green'
                    : payoutStatus === PayoutStatus.FAILED
                      ? 'red'
                      : 'blue';
            return payoutStatus ? <Tag color={color}>{payoutStatus}</Tag> : '-';
        },
    },
    {
        title: 'Ngày thanh toán lại',
        dataIndex: 'payoutDate',
        key: 'payoutDate',
        render: (date?: Date) => (date ? new Date(date).toLocaleString() : '-'),
    },
];

export default function AdminPaymentsPage() {
    const router = useRouter();
    const { currentPage, pageSize, handlePageChange } = usePagination(5);
    const { data: payments, isLoading } = useGetAllPaymentsQuery();

    const searchFn = (payment: Payment, query: string) => {
        const value = query.toLowerCase();
        return (
            payment.orderCode?.toString().includes(value) ||
            payment.amount?.toString().includes(value) ||
            payment.status?.toLowerCase().includes(value) ||
            payment.type?.toLowerCase().includes(value) ||
            payment.payoutStatus?.toLowerCase().includes(value) ||
            (payment?.payoutDate
                ? new Date(payment.payoutDate).toLocaleString().includes(query)
                : false)
        );
    };

    const { searchText, filteredData, handleSearch } = useSearch<Payment>(
        payments || [],
        searchFn,
    );

    return (
        <div className="space-y-4">
            <AdminBanner text="Quản lý giao dịch" />
            <div className="flex items-center justify-between gap-4">
                <TableInputSearch
                    placeholder="Tìm kiếm giao dịch"
                    value={searchText}
                    onChange={handleSearch}
                />
                <div className="flex gap-4">
                    <Button onClick={() => router.push('payments/payout')}>
                        Payout
                    </Button>
                </div>
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
                                    : 'Không có thanh toán nào'
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
