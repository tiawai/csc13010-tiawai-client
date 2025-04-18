'use client';
import { useMemo } from 'react';
import { Flex, Table, Button, Empty, message, Tag, Select, Avatar } from 'antd';
import { Report, ReportStatus } from '@/types/report.type';
import { AdminBanner } from '@/components/common/banner';
import { TableInputSearch } from '@/components/admin/table';
import {
    useGetAllReportsQuery,
    useDeleteReportMutation,
    useUpdateReportStatusMutation,
} from '@/services/report.service';
import { usePagination } from '@/lib/hooks/use-paganation';
import { useSearch } from '@/lib/hooks/use-search';
import { User } from '@/types/user.type';

export default function AdminReportsPage() {
    const { data: reports, isLoading } = useGetAllReportsQuery();
    const [updateReportStatus, { isLoading: isLoadingUpdate }] =
        useUpdateReportStatusMutation();
    const [deleteReport] = useDeleteReportMutation();
    const { currentPage, pageSize, handlePageChange } = usePagination(5);

    const searchFn = (report: Report, query: string) => {
        const value = query.toLowerCase();
        return (
            report.fullname.toLowerCase().includes(value) ||
            report.content.toLowerCase().includes(value) ||
            report.status.toLowerCase().includes(value) ||
            (report.manageBy?.username?.toLowerCase().includes(value) ?? false)
        );
    };

    const { searchText, filteredData, handleSearch } = useSearch<Report>(
        reports || [],
        searchFn,
    );

    const columns = useMemo(
        () => [
            {
                title: 'Họ và tên',
                dataIndex: 'fullname',
                key: 'fullname',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Số điện thoại',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: 'Nội dung',
                dataIndex: 'content',
                key: 'content',
            },
            {
                title: 'Trạng thái',
                dataIndex: 'status',
                key: 'status',
                render: (status: ReportStatus) => {
                    const color =
                        status === ReportStatus.RESOLVED
                            ? 'green'
                            : status === ReportStatus.IN_PROGRESS
                              ? 'blue'
                              : 'red';
                    const statusText =
                        status === ReportStatus.PENDING
                            ? 'Đang chờ xử lý'
                            : status === ReportStatus.IN_PROGRESS
                              ? 'Đang xử lý'
                              : status === ReportStatus.RESOLVED
                                ? 'Đã giải quyết'
                                : 'Không xác định';
                    return <Tag color={color}>{statusText}</Tag>;
                },
            },
            {
                title: 'Quản lý bởi',
                dataIndex: 'manageBy',
                key: 'manageBy',
                render: (manageBy: User | null) =>
                    manageBy ? (
                        <div className="flex items-center gap-2">
                            <Avatar
                                src={manageBy.profileImage}
                                alt={manageBy.username}
                                size="small"
                                style={{ marginRight: 8 }}
                            />
                            {manageBy.username}
                        </div>
                    ) : (
                        'N/A'
                    ),
            },
            {
                title: 'Ngày tạo',
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: (date: string) => new Date(date).toLocaleDateString(),
            },
            {
                title: 'Thanh điều khiển',
                key: 'actions',
                render: (record: Report) => (
                    <Flex justify="start" gap={10}>
                        <Select
                            loading={isLoadingUpdate}
                            disabled={isLoadingUpdate}
                            value={record.status}
                            onChange={(newStatus) =>
                                updateReportStatus({
                                    id: record.id,
                                    status: newStatus,
                                })
                            }
                            style={{ width: 150 }}
                        >
                            {Object.values(ReportStatus).map((statusOption) => (
                                <Select.Option
                                    key={statusOption}
                                    value={statusOption}
                                >
                                    {statusOption}
                                </Select.Option>
                            ))}
                        </Select>
                        <Button
                            type="primary"
                            shape="round"
                            danger
                            onClick={() => {
                                if (
                                    confirm(
                                        'Bạn có chắc chắn muốn xóa báo cáo này?',
                                    )
                                ) {
                                    deleteReport(record.id)
                                        .unwrap()
                                        .then(() => {
                                            message.success(
                                                'Xóa báo cáo thành công',
                                            );
                                        })
                                        .catch((error) => {
                                            message.error(
                                                'Đã có lỗi xảy ra khi xóa báo cáo',
                                            );
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
                <AdminBanner text="Quản lý báo cáo" />
                <div className="flex items-center justify-between gap-4">
                    <TableInputSearch
                        placeholder="Tìm kiếm báo cáo"
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
                                        : 'Không có báo cáo nào'
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
