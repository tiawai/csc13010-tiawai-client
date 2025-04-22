'use client';
import Banner from '@/ui/admin/banner';
import { Flex } from 'antd';
import StatFrame from '@/ui/admin/stat-frame';
import examsIcon from '@public/admin/exams.webp';
import practicesIcon from '@public/admin/practices.webp';
import usersIcon from '@public/admin/users.webp';
import { useGetStatisticsQuery } from '@/services/admin.service';
import { Loading } from '@/components/common/loading';

const Dashboard = () => {
    const { data: statistics, isLoading } = useGetStatisticsQuery();
    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <Banner>Thống kê</Banner>
            <Flex wrap justify="center" className="mb-20" gap={20}>
                <StatFrame
                    title="tổng số lượng người dùng"
                    value={statistics?.totalUsers || 0}
                    icon={usersIcon}
                    href="/admin/users"
                />
                <StatFrame
                    title="tống số lượng đề thi"
                    value={statistics?.totalTests || 0}
                    icon={examsIcon}
                    theme="blue"
                    href="/admin/tests"
                />
                <StatFrame
                    title="tổng số lượng lớp học"
                    value={statistics?.totalClassrooms || 0}
                    icon={usersIcon}
                    href="/admin/classrooms"
                />
                <StatFrame
                    title="tổng số lượng báo cáo"
                    value={statistics?.totalReports || 0}
                    icon={practicesIcon}
                    theme="blue"
                    href="/admin/reports"
                />
            </Flex>
        </>
    );
};

export default Dashboard;
