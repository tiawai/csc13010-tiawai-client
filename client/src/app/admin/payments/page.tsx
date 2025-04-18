'use client';
import { Button, Empty, Table, Tag } from 'antd';
import {
    useGetAllPaymentsQuery,
    useLazyGetPayoutQuery,
} from '@/services/payment.service';
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
import { Modal, message } from 'antd';
import { saveAs } from 'file-saver';
import { useState } from 'react';

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
                status === PaymentStatus.COMPLETED
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
    const { data: payments, isLoading } = useGetAllPaymentsQuery();
    const [getPayout, { data: payoutData, isLoading: isLoadingPayout }] =
        useLazyGetPayoutQuery();
    const { currentPage, pageSize, handlePageChange } = usePagination(5);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleCopy = () => {
        const text =
            payoutData?.map((item) => JSON.stringify(item)).join('\n') ?? '';
        navigator.clipboard.writeText(text);
        message.success('Đã copy vào clipboard!');
    };

    const handleDownloadCSV = () => {
        if (!payoutData || payoutData.length === 0) return;
        const header = Object.keys(payoutData[0]).join(',');
        const rows = payoutData.map((obj) => Object.values(obj).join(','));
        const csv = [header, ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, 'danh_sach_payout.csv');
    };

    const handleDownload = () => {
        if (payoutData && payoutData.length > 0) {
            handleDownloadCSV();
        } else {
            message.error('Không có dữ liệu để tải xuống');
        }
    };

    return (
        <>
            <div className="space-y-4">
                <AdminBanner text="Quản lý thanh toán" />
                <div className="flex items-center justify-between gap-4">
                    <TableInputSearch
                        placeholder="Tìm kiếm đề thi"
                        value={searchText}
                        onChange={handleSearch}
                    />
                    <Button
                        onClick={async () => {
                            try {
                                const res = await getPayout().unwrap();
                                if (res && res.length > 0) {
                                    setIsModalOpen(true);
                                } else {
                                    message.info('Không có dữ liệu để xuất.');
                                }
                            } catch (err) {
                                message.error(
                                    'Đã có lỗi xảy ra khi lấy danh sách payout',
                                );
                                console.error(err);
                            }
                        }}
                        loading={isLoadingPayout}
                    >
                        Xuất Payout
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

            <Modal
                open={isModalOpen}
                title="Danh sách payout"
                onCancel={() => setIsModalOpen(false)}
                closeIcon={false}
                footer={[
                    <Button key="copy" onClick={handleCopy}>
                        Copy
                    </Button>,
                    <Button key="download" onClick={handleDownload}>
                        Tải xuống
                    </Button>,
                    <Button key="close" onClick={() => setIsModalOpen(false)}>
                        Đóng
                    </Button>,
                ]}
            >
                <pre className="max-h-[300px] overflow-auto text-sm">
                    {payoutData &&
                        payoutData
                            .map((item) => JSON.stringify(item, null, 2))
                            .join('\n')}
                </pre>
            </Modal>
        </>
    );
}
