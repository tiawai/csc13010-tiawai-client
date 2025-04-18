'use client';
import { Avatar, Button, Empty, Select, Table } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useGetUsersQuery } from '@/services/user.service';
import { AdminBanner } from '@/components/common/banner';
import { ColumnsType } from 'antd/es/table';
import { Role, User } from '@/types/user.type';
import { usePagination } from '@/lib/hooks/use-paganation';
import { useSearch } from '@/lib/hooks/use-search';
import { TableInputSearch } from '@/components/admin/table';
import { useState } from 'react';

const columns: ColumnsType<User> = [
    {
        title: 'Tên',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'Email',
        key: 'email',
        render: (_, record) => (
            <div className="flex items-center gap-2">
                <Avatar src={record.profileImage} alt={record.username} />
                <span>{record.email}</span>
            </div>
        ),
    },
    {
        title: 'Số dư',
        dataIndex: 'balance',
        key: 'balance',
        render: (balance) => <span>{balance ? `${balance} VND` : 'N/A'}</span>,
    },
    {
        title: 'Ngày sinh',
        dataIndex: 'birthdate',
        key: 'birthdate',
        render: (birthdate) => (
            <span>
                {birthdate ? new Date(birthdate).toLocaleDateString() : 'N/A'}
            </span>
        ),
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone',
        key: 'phone',
        render: (phone) => <span>{phone || 'N/A'}</span>,
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
];

export default function AdminUsersPage() {
    const [role, setRole] = useState(Role.STUDENT);
    const { data: users, isLoading } = useGetUsersQuery(role);
    const { currentPage, pageSize, handlePageChange } = usePagination(5);

    const searchFn = (user: User, query: string) => {
        const value = query.toLowerCase();
        return (
            user.username?.toLowerCase().includes(value) ||
            user.email?.toLowerCase().includes(value)
        );
    };

    const { searchText, filteredData, handleSearch } = useSearch<User>(
        users || [],
        searchFn,
    );

    return (
        <div className="space-y-4">
            <AdminBanner text="Quản lý người dùng" />
            <div className="flex items-center justify-between gap-4">
                <TableInputSearch
                    placeholder="Tìm kiếm người dùng"
                    value={searchText}
                    onChange={handleSearch}
                />
                <div className="flex items-center gap-4">
                    <Select
                        className="!w-[125px]"
                        defaultValue={Role.STUDENT}
                        onChange={(value) => setRole(value)}
                        options={[
                            { value: Role.STUDENT, label: 'Học sinh' },
                            { value: Role.TEACHER, label: 'Giáo viên' },
                            { value: Role.ADMIN, label: 'Quản trị viên' },
                        ]}
                        placeholder="Chọn vai trò"
                        style={{ width: 200 }}
                    ></Select>
                    {/* <Button onClick={() => router.push(`${pathname}/create`)}>
                        Tạo người dùng
                    </Button> */}
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
                                    : 'Không có người dùng nào'
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
