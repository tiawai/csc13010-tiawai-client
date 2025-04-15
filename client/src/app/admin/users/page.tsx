'use client';
import { useState, useEffect, useMemo } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Flex, Button, Input, Spin, Table } from 'antd';
import { FilterIcon } from '@/ui/admin/icons';
import { useGetUsersQuery } from '@/services/admin.service';
import { User } from '@/types/user.type';
import ContainerBorder from '@/ui/admin/exam/container-border';
import Banner from '@/ui/admin/banner';

const Users = () => {
    const { data: users, isLoading } = useGetUsersQuery();
    const [searchText, setSearchText] = useState<string>('');
    const [filteredData, setFilteredData] = useState<User[] | undefined>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);

    useEffect(() => {
        if (users) {
            setFilteredData(users);
        }
    }, [users]);

    const handleSearch = (value: string) => {
        setSearchText(value);
        const filtered = users?.filter((user) => {
            const username = user.username?.toLowerCase() || '';
            const email = user.email?.toLowerCase() || '';
            return (
                username.includes(value.toLowerCase()) ||
                email.includes(value.toLowerCase())
            );
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
                title: 'Tên',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Thanh điều khiển',
                key: 'actions',
                render: () => (
                    <div className="flex gap-4">
                        <Button
                            type="default"
                            className="rounded-full bg-[#DAE3E9] text-black"
                        >
                            Xem
                        </Button>
                        <Button type="primary" danger className="rounded-full">
                            Xóa
                        </Button>
                    </div>
                ),
            },
        ],
        [],
    );

    if (isLoading || !users) {
        return (
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <main>
            <Banner>Quản lý người dùng</Banner>
            <ContainerBorder>
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
                    rowKey={(record) => record?.id || 0}
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
            </ContainerBorder>
        </main>
    );
};

export default Users;
