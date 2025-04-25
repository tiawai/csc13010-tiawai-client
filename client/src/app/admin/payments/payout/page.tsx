'use client';
import { Button, Empty, Table, Steps, Alert, Divider } from 'antd';
import {
    useGetPayoutQuery,
    useProcessPayoutMutation,
    useUpdatePayoutSuccessMutation,
} from '@/services/payment.service';
import { AdminBanner } from '@/components/common/banner';
import { ColumnsType } from 'antd/es/table';
import { Payout } from '@/types/payment.type';
import { usePagination } from '@/lib/hooks/use-paganation';
import { Modal } from 'antd';
import { saveAs } from 'file-saver';
import { useState } from 'react';
import { useNotification } from '@/lib/hooks/use-notification';
import * as XLSX from 'xlsx';
import { useRouter } from 'next/navigation';

const columns: ColumnsType<Payout> = [
    {
        title: 'Mã đơn hàng',
        dataIndex: 'index',
        key: 'index',
    },
    {
        title: 'Số tài khoản',
        dataIndex: 'accountNumber',
        key: 'accountNumber',
    },
    {
        title: 'Tên chủ tài khoản',
        dataIndex: 'accountHolderName',
        key: 'accountHolderName',
    },
    {
        title: 'Ngân hàng',
        dataIndex: 'bankName',
        key: 'bankName',
    },
    {
        title: 'Số tiền',
        dataIndex: 'amount',
        key: 'amount',
        render: (amount: number) => `${amount.toLocaleString()} VND`,
    },
    {
        title: 'Tin nhắn',
        dataIndex: 'message',
        key: 'message',
    },
];

export default function AdminPaymentsPage() {
    const router = useRouter();
    const [current, setCurrent] = useState<number>(0);
    const { currentPage, pageSize, handlePageChange } = usePagination(5);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { notify } = useNotification();

    const { data: payoutDto, isLoading, refetch } = useGetPayoutQuery();
    const payouts = payoutDto?.payouts || [];
    const payments = payoutDto?.payments || [];
    const [processPayout, { isLoading: isLoadingProcess }] =
        useProcessPayoutMutation();
    const [updatePayoutSuccess, { isLoading: isLoadingSuccess }] =
        useUpdatePayoutSuccessMutation();

    const handleDownloadCSV = async (payouts: Payout[]) => {
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
        if (payouts && payouts.length > 0) {
            handleDownloadCSV(payouts);
        } else {
            notify({
                message: 'Không có dữ liệu để tải xuống',
                description: 'Vui lòng kiểm tra lại dữ liệu.',
                notiType: 'error',
            });
        }
    };

    const handleProcessPayout = async () => {
        await processPayout({
            payments: payments || [],
        });
        notify({
            message: 'Chuyển trạng thái Payout thành công',
            description: 'Payout đang được xử lý.',
        });
        next();
    };

    const handleUpdatePayout = async () => {
        await updatePayoutSuccess().unwrap();
        notify({
            message: 'Cập nhật thành công',
            description: 'Cập nhật trạng thái Payout thành công.',
        });
        setIsModalOpen(false);
        next();
    };

    const handleReloadPayout = async () => {
        await refetch();
        setCurrent(0);
    };

    const next = () => {
        setCurrent(current + 1);
    };

    return (
        <div className="space-y-4">
            <AdminBanner text="Quản lý Payout" />
            <Steps
                current={current}
                items={[
                    {
                        title: 'Bước 1: Chờ xử lý',
                        description: (
                            <>
                                {payouts?.length > 0 ? (
                                    <div className="space-y-2">
                                        <p>
                                            Vui lòng tải xuống danh sách Payout
                                            để kiểm tra trước khi tiếp tục.
                                        </p>
                                        <div className="flex flex-col gap-2 sm:flex-row">
                                            <Button
                                                type="primary"
                                                onClick={handleDownload}
                                                disabled={
                                                    current > 0 ||
                                                    isLoadingSuccess
                                                }
                                            >
                                                Tải xuống danh sách
                                            </Button>
                                            <Button
                                                type="default"
                                                loading={isLoadingProcess}
                                                disabled={current > 0}
                                                onClick={handleProcessPayout}
                                            >
                                                Tiếp tục xử lý
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <p>
                                        Hiện không có dữ liệu Payout nào để xử
                                        lý.
                                    </p>
                                )}
                            </>
                        ),
                    },
                    {
                        title: 'Bước 2: Đang xử lý',
                        description: (
                            <div className="space-y-2">
                                <p>Payout đang được tiến hành xử lý.</p>
                                <div className="flex flex-col gap-2 sm:flex-row">
                                    <Button
                                        type="primary"
                                        loading={isLoadingSuccess}
                                        disabled={current !== 1}
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        Xác nhận đã chuyển khoản
                                    </Button>
                                </div>

                                <Modal
                                    open={isModalOpen}
                                    title="Xác nhận chuyển khoản"
                                    onCancel={() => setIsModalOpen(false)}
                                    closeIcon={false}
                                    footer={[
                                        <Button
                                            key="cancel"
                                            onClick={() =>
                                                setIsModalOpen(false)
                                            }
                                        >
                                            Hủy
                                        </Button>,
                                        <Button
                                            key="confirm"
                                            type="primary"
                                            loading={isLoadingSuccess}
                                            onClick={handleUpdatePayout}
                                        >
                                            Xác nhận Payout
                                        </Button>,
                                    ]}
                                >
                                    <Alert
                                        message="Vui lòng xác nhận rằng bạn đã hoàn tất việc chuyển khoản cho các giáo viên trong danh sách."
                                        type="info"
                                        showIcon
                                        className="!mb-4"
                                    />
                                    <Alert
                                        message="Hành động này không thể hoàn tác. Hãy kiểm tra thật kỹ trước khi tiếp tục."
                                        type="error"
                                        showIcon
                                    />
                                </Modal>
                            </div>
                        ),
                    },
                    {
                        title: 'Bước 3: Hoàn tất',
                        description: (
                            <>
                                <p>
                                    Quá trình xử lý Payout đã hoàn tất. Bạn có
                                    thể kiểm tra lịch sử thanh toán nếu cần.
                                </p>
                                <Button
                                    type="primary"
                                    onClick={handleReloadPayout}
                                    disabled={current !== 2}
                                >
                                    Hoàn tất
                                </Button>
                            </>
                        ),
                    },
                ]}
            />

            <Table
                rowKey={(record) => record.index}
                dataSource={payouts}
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
                    total: payouts?.length || 0,
                    showSizeChanger: true,
                    current: currentPage,
                    onChange: handlePageChange,
                }}
            />
        </div>
    );
}
