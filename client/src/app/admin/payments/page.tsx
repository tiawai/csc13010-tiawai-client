'use client';
import { Button, Empty, Table, Tag } from 'antd';
import {
    useGetAllPaymentsQuery,
    useLazyGetPayoutQuery,
    useProcessPayoutMutation,
    useUpdatePayoutSuccessMutation,
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
import { Modal } from 'antd';
import { saveAs } from 'file-saver';
import { useState } from 'react';
import { useNotification } from '@/lib/hooks/use-notification';
import * as XLSX from 'xlsx';

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
    const { currentPage, pageSize, handlePageChange } = usePagination(5);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { notify } = useNotification();

    const { data: payments, isLoading } = useGetAllPaymentsQuery();
    const [getPayout, { data: payoutData, isLoading: isLoadingPayout }] =
        useLazyGetPayoutQuery();
    const [processPayout, { isLoading: isLoadingProcess }] =
        useProcessPayoutMutation();
    const [updatePayoutSuccess, { isLoading: isLoadingSuccess }] =
        useUpdatePayoutSuccessMutation();

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
            payoutData?.payouts
                .map((item) => JSON.stringify(item))
                .join('\n') ?? '';
        navigator.clipboard.writeText(text);
        notify({
            message: 'Đã sao chép vào clipboard',
            description: 'Dữ liệu đã được sao chép vào clipboard.',
        });
    };

    const handleDownloadCSV = async (payouts: any[]) => {
        const response = await fetch('/templates/payout-template.xlsx');
        const arrayBuffer = await response.arrayBuffer();

        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const dataRows = payouts.map((p) => [
            p.index,
            p.accountNumber,
            p.accountHolderName,
            p.bankName,
            p.amount,
            p.message,
        ]);

        const startRow = 3;
        dataRows.forEach((row, rowIdx) => {
            row.forEach((cell, colIdx) => {
                const cellAddress = XLSX.utils.encode_cell({
                    c: colIdx,
                    r: startRow - 1 + rowIdx,
                });
                worksheet[cellAddress] = { t: 's', v: String(cell) };
            });
        });

        // Cập nhật lại phạm vi (range) nếu cần
        const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
        range.e.r = Math.max(range.e.r, startRow - 1 + dataRows.length - 1);
        worksheet['!ref'] = XLSX.utils.encode_range(range);

        // Xuất file
        const newWorkbook = XLSX.write(workbook, {
            type: 'array',
            bookType: 'xlsx',
        });
        const blob = new Blob([newWorkbook], {
            type: 'application/octet-stream',
        });
        saveAs(blob, 'danh_sach_payout.xlsx');
    };

    const handleDownload = () => {
        if (payoutData && payoutData.payouts.length > 0) {
            handleDownloadCSV(payoutData.payouts);
        } else {
            notify({
                message: 'Không có dữ liệu để tải xuống',
                description: 'Vui lòng kiểm tra lại dữ liệu.',
            });
        }
    };

    return (
        <>
            <div className="space-y-4">
                <AdminBanner text="Quản lý giao dịch" />
                <div className="flex items-center justify-between gap-4">
                    <TableInputSearch
                        placeholder="Tìm kiếm giao dịch"
                        value={searchText}
                        onChange={handleSearch}
                    />
                    <div className="flex gap-4">
                        <Button
                            onClick={async () => {
                                try {
                                    const res = await getPayout().unwrap();
                                    if (res && res.payouts.length > 0) {
                                        setIsModalOpen(true);
                                    } else {
                                        notify({
                                            message: 'Không có dữ liệu payout',
                                            description:
                                                'Không có dữ liệu payout để hiển thị.',
                                        });
                                    }
                                } catch (err) {
                                    notify({
                                        message: 'Lỗi khi lấy dữ liệu payout',
                                        description:
                                            'Đã có lỗi xảy ra khi lấy dữ liệu payout.',
                                        notiType: 'error',
                                    });
                                }
                            }}
                            loading={isLoadingPayout}
                        >
                            Xuất Payout
                        </Button>
                        <Button
                            onClick={async () => {
                                try {
                                    await updatePayoutSuccess().unwrap();
                                    notify({
                                        message: 'Cập nhật thành công',
                                        description:
                                            'Cập nhật trạng thái payout thành công.',
                                    });
                                } catch (err) {
                                    notify({
                                        message: 'Lỗi khi cập nhật trạng thái',
                                        description:
                                            'Đã có lỗi xảy ra khi cập nhật trạng thái payout.',
                                        notiType: 'error',
                                    });
                                }
                            }}
                            loading={isLoadingSuccess}
                        >
                            Kết thúc Payout hiện tại
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
                    <Button
                        key="confirm"
                        onClick={async () => {
                            await processPayout({
                                payments: payoutData?.payments || [],
                            });
                            setIsModalOpen(false);
                        }}
                        loading={isLoadingProcess}
                    >
                        Xác nhận Payout
                    </Button>,
                    <Button key="close" onClick={() => setIsModalOpen(false)}>
                        Đóng
                    </Button>,
                ]}
            >
                <pre className="max-h-[300px] overflow-auto text-sm">
                    {payoutData &&
                        payoutData.payouts
                            .map((item) => JSON.stringify(item, null, 2))
                            .join('\n')}
                </pre>
            </Modal>
        </>
    );
}
