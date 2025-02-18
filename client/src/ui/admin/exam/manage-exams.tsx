"use client";
import { useState, useEffect, useMemo } from "react";
import { Flex, Table, Button, Input, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FilterIcon } from "@/ui/admin/icons";
import { useGetExamsQuery, useDeleteExamByIdMutation } from "@/services/admin";
import { Exam } from "@/types/exam";

export default function ManageExams() {
    const { data: exams, isLoading } = useGetExamsQuery();
    const [deleteExamById] = useDeleteExamByIdMutation();
    const [searchText, setSearchText] = useState<string>("");
    const [filteredData, setFilteredData] = useState<Exam[] | undefined>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);

    useEffect(() => {
        if (exams) {
            setFilteredData(exams);
        }
    }, [exams]);

    const handleSearch = (value: string) => {
        setSearchText(value);
        const filtered = exams?.filter((exam) => {
            const title = exam.title?.toLowerCase() || "";
            return title.includes(value.toLowerCase());
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
                title: "Tên đề thi",
                dataIndex: "title",
                key: "title",
            },
            {
                title: "Ngày",
                dataIndex: "uploadedAt",
                key: "uploadedAt",
                render: (date: string) => new Date(date).toLocaleDateString(),
            },
            {
                title: "Thời gian (phút)",
                dataIndex: "duration",
                key: "duration",
            },
            {
                title: "Lượt làm",
                dataIndex: "totalAttempts",
                key: "totalAttempts",
            },
            {
                title: "Thanh điều khiển",
                key: "actions",
                render: (record: Exam) => (
                    <Flex justify="start" gap={10}>
                        <Button
                            shape="round"
                            onClick={() => console.log("Xem:", record)}
                            className="!bg-[#DAE3E9] text-black"
                        >
                            Xem
                        </Button>
                        <Button
                            type="primary"
                            shape="round"
                            danger
                            onClick={() => deleteExamById(record.id || -1)}
                        >
                            Xóa
                        </Button>
                    </Flex>
                ),
            },
        ],
        [deleteExamById],
    );

    if (isLoading || !exams) {
        return (
            <div style={{ textAlign: "center", padding: "20px" }}>
                <Spin size="large" />
            </div>
        );
    }

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
                    style={{ background: "#E9DAE9" }}
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
                    position: ["bottomCenter"],
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
