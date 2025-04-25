// @/app/(user)/teacher/challenge/[testId]/page.tsx
'use client';
import { useParams, useRouter } from 'next/navigation';
import { Flex, Avatar, Spin, Empty, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { CustomTitle } from '@/ui/components/title';
import { twJoin } from 'tailwind-merge';
import crown from '@public/ranking/crown.svg';
import trophy from '@public/ranking/trophy.svg';
import { useGetTestRankingsQuery } from '@/services/classroom.service';

const TOP10_COLORS = [
    'bg-[#B21D1D]',
    'bg-[#3C0101]',
    'bg-[#C7AEAE]',
    'bg-[#D1A7D1]',
    'bg-[#DDBEDD]',
    'bg-[#E9DAE9]',
    'bg-[#F4EDF4]',
    'bg-[#FBF3FB]',
    'bg-[#FCF4FC]',
    'bg-[#FEF5FE]',
];

const Challenge = () => {
    const router = useRouter();
    const { id: testId } = useParams() as { testId: string };
    const { data, isLoading, error } = useGetTestRankingsQuery(testId);

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push('/');
        }
    };

    if (isLoading) {
        return <Spin size="large" className="mt-20 flex justify-center" />;
    }

    if (error || !data || data.rankings.length === 0) {
        return (
            <Flex vertical>
                <Button
                    icon={<ArrowLeftOutlined />}
                    size="large"
                    className="flex w-24 items-center p-3 hover:bg-gray-100"
                    onClick={handleBack}
                >
                    Quay lại
                </Button>
                <Empty
                    description="Hiện chưa có dữ liệu xếp hạng cho bài kiểm tra này"
                    className="mt-20"
                />
            </Flex>
        );
    }

    const { testTitle, totalParticipants, rankings } = data;

    const top3 = [
        rankings.find((item) => item.rank === 2) || null,
        rankings.find((item) => item.rank === 1) || null,
        rankings.find((item) => item.rank === 3) || null,
    ].filter(Boolean);

    return (
        <Flex vertical>
            <Button
                icon={<ArrowLeftOutlined />}
                size="large"
                className="flex w-24 items-center p-3 hover:bg-gray-100"
                onClick={handleBack}
            >
                Quay lại
            </Button>
            <CustomTitle className="!text-center !font-bold uppercase !text-[#FF0000]">
                🏆 BẢNG XẾP HẠNG – {testTitle.toUpperCase()} 🔥
            </CustomTitle>
            <div className="mb-6 text-center text-lg font-semibold">
                Tổng số người tham gia: {totalParticipants}
            </div>
            <Flex vertical gap={40}>
                <Flex
                    justify="center"
                    align="end"
                    className="h-[60vh]"
                    gap={35}
                >
                    {top3.map((item, index) => {
                        if (!item) return null;
                        const isRank1 = item.rank === 1;
                        const isRank2 = item.rank === 2;
                        const isRank3 = item.rank === 3;

                        return (
                            <Flex
                                vertical
                                align="center"
                                justify="end"
                                className="h-full"
                                key={item.userId}
                            >
                                <Avatar
                                    size={140}
                                    shape="circle"
                                    className={twJoin(
                                        'mb-2',
                                        isRank1
                                            ? TOP10_COLORS[0]
                                            : isRank2
                                              ? TOP10_COLORS[1]
                                              : TOP10_COLORS[2],
                                    )}
                                />
                                <CustomTitle level={2} className="!mb-6">
                                    {item.username}
                                </CustomTitle>
                                <span className="mb-2 font-montserrat">
                                    {item.email}
                                </span>
                                <Flex
                                    vertical
                                    align="center"
                                    justify="center"
                                    gap={10}
                                    className={twJoin(
                                        'rounded-t-[35px] bg-gradient-to-b px-24 font-montserrat font-medium',
                                        isRank1
                                            ? 'h-[55%] from-[#d8b801]/80 to-[#f5e486]/80'
                                            : isRank2
                                              ? 'h-[45%] from-[#aeaeae]/60 to-[#d9d9d9]/60'
                                              : 'h-[35%] from-[#bd5a13]/50 to-[#dbc4b4]/50',
                                    )}
                                >
                                    <strong className="text-3xl text-white">
                                        {isRank1
                                            ? '1st'
                                            : isRank2
                                              ? '2nd'
                                              : '3rd'}
                                    </strong>
                                    <strong className="rounded-[60px] bg-white/30 px-4 py-1 text-2xl">
                                        {item.correctAnswers}/
                                        {item.totalQuestions}
                                    </strong>
                                    <span>{item.formattedTime}</span>
                                </Flex>
                            </Flex>
                        );
                    })}
                </Flex>
                <Flex vertical gap={20}>
                    {rankings.slice(3).map((item, index) => (
                        <Flex
                            className={twJoin(
                                'rounded-full px-8 py-3 backdrop-blur-[2px]',
                                TOP10_COLORS[index + 3],
                            )}
                            gap={20}
                            key={item.userId}
                        >
                            <Flex className="relative">
                                <Image
                                    src={crown}
                                    alt="crown"
                                    className="self-center"
                                />
                                <Flex className="absolute inset-0 items-center justify-center font-bold text-white">
                                    {item.rank}
                                </Flex>
                            </Flex>
                            <Flex className="flex-1" gap={12}>
                                <Avatar
                                    shape="circle"
                                    size={64}
                                    className="border-[3px] border-white/60 bg-[#B45C5C]"
                                />
                                <Flex
                                    vertical
                                    align="start"
                                    justify="center"
                                    className="font-montserrat"
                                >
                                    <span className="text-xl font-semibold">
                                        {item.username}
                                    </span>
                                    <span>{item.email}</span>
                                </Flex>
                            </Flex>
                            <Image
                                src={trophy}
                                alt="trophy"
                                className="h-full w-auto self-center"
                            />
                            <Flex
                                vertical
                                flex={0.12}
                                align="end"
                                justify="center"
                                className="font-montserrat"
                            >
                                <span className="text-xl font-semibold">
                                    {item.correctAnswers}/{item.totalQuestions}
                                </span>
                                <span className="text-[#B09393]">
                                    {item.formattedTime}
                                </span>
                            </Flex>
                        </Flex>
                    ))}
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Challenge;
