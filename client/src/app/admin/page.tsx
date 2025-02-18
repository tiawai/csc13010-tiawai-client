import Banner from '@/ui/admin/banner';
import { Flex } from 'antd';
import StatFrame from '@/ui/admin/stat-frame';
import examsIcon from '@public/admin/exams.webp';
import practicesIcon from '@public/admin/practices.webp';
import usersIcon from '@public/admin/users.webp';
import UsersCard from '@/ui/admin/users-card';
import ExamsCard from '@/ui/admin/exams-card';

const Dashboard = () => {
    return (
        <main>
            <Banner>Thống kê</Banner>
            <Flex wrap justify="center" className="mb-20" gap={20}>
                <StatFrame
                    title="tổng số lượng người dùng"
                    value={100000}
                    icon={usersIcon}
                />
                <StatFrame
                    title="tống số lượng đề thi"
                    value={100000}
                    icon={examsIcon}
                    theme="blue"
                />
                <StatFrame
                    title="tổng số lượng đề luyện tập"
                    value={100000}
                    icon={practicesIcon}
                />
            </Flex>
            <Flex gap={40} justify="space-between">
                <UsersCard />
                <Flex vertical gap={40} flex={1}>
                    <ExamsCard />
                    <ExamsCard type="practice" />
                </Flex>
            </Flex>
        </main>
    );
};

export default Dashboard;
