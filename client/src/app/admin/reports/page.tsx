'use client';

import { useState, useEffect, useMemo } from 'react';
import { Flex, Table, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { FilterIcon } from '@/ui/admin/icons';

export interface Report {
    id: string;
    fullname: string;
    createdAt: string;
    type: string;
    description: string;
    status: string;
    manageBy: string;
}

const fakeReports: Report[] = [
    {
        id: '1',
        fullname: 'John Doe',
        createdAt: '2023-10-01',
        type: 'Bug',
        description: 'Issue with login functionality',
        status: 'Pending',
        manageBy: 'Admin A',
    },
    {
        id: '2',
        fullname: 'Jane Smith',
        createdAt: '2023-10-02',
        type: 'Feature Request',
        description: 'Add dark mode',
        status: 'Resolved',
        manageBy: 'Admin B',
    },
    {
        id: '3',
        fullname: 'Alice Johnson',
        createdAt: '2023-10-03',
        type: 'Bug',
        description: 'Error on dashboard',
        status: 'In Progress',
        manageBy: 'Admin C',
    },
];

export default function AdminReportsPage() {
    const [searchText, setSearchText] = useState<string>('');
    const [filteredData, setFilteredData] = useState<Report[]>(fakeReports);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);

    const handleSearch = (value: string) => {
        setSearchText(value);
        const filtered = fakeReports.filter((report) => {
            const fullname = report.fullname.toLowerCase();
            return fullname.includes(value.toLowerCase());
        });
        setFilteredData(filtered);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number, pageSize?: number) => {
        setCurrentPage(page);
        if (pageSize) {
            setPageSize(pageSize);
        }
    };

    const columns = useMemo(
        () => [
            {
                title: 'Họ và tên',
                dataIndex: 'fullname',
                key: 'fullname',
            },
            {
                title: 'Ngày tạo',
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: (date: string) => new Date(date).toLocaleDateString(),
            },
            {
                title: 'Loại',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: 'Mô tả',
                dataIndex: 'description',
                key: 'description',
            },
            {
                title: 'Trạng thái',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: 'Quản lý bởi',
                dataIndex: 'manageBy',
                key: 'manageBy',
            },
            {
                title: 'Thanh điều khiển',
                key: 'actions',
                render: (record: Report) => (
                    <Flex justify="start" gap={10}>
                        <Button
                            shape="round"
                            onClick={() => console.log('Xem:', record)}
                            className="!bg-[#DAE3E9] text-black"
                        >
                            Xem
                        </Button>
                        <Button
                            type="primary"
                            shape="round"
                            danger
                            onClick={() => console.log('Xóa:', record.id)}
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
            <Flex
                justify="space-between"
                align="center"
                gap={20}
                style={{ marginBottom: 20 }}
            >
                <Input
                    size="large"
                    placeholder="Tìm kiếm"
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="!bg-[#E9DAE9] font-roboto text-black"
                />
                <Button
                    icon={<FilterIcon width={18} />}
                    size="large"
                    style={{ background: '#E9DAE9' }}
                    className="font-roboto font-medium"
                >
                    Bộ lọc
                </Button>
            </Flex>
            <Table
                columns={columns}
                dataSource={filteredData}
                rowKey={(record) => record?.id || -1}
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
        </>
    );
}
