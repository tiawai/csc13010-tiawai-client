import { Test } from '@/types/test.type';
import IconFrame from '@/ui/icon-frame';
import {
    ClockCircleOutlined,
    DownloadOutlined,
    AlignRightOutlined,
} from '@ant-design/icons';
import { Button, Flex, Result, Typography } from 'antd';
import { useRouter } from 'next/navigation';
const { Text, Title } = Typography;
import home8 from '@public/home/home-8.svg';
import { twMerge } from 'tailwind-merge';

export const TestNotFound = ({ onClick }: { onClick: () => void }) => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Đề thi không tồn tại."
            extra={
                <Button type="primary" shape="round" onClick={onClick}>
                    Quay lại trang đề thi
                </Button>
            }
        />
    );
};

const testInfo: {
    unit: string;
    icon: React.ReactNode;
}[] = [
    {
        unit: 'phút',
        icon: <ClockCircleOutlined />,
    },
    {
        unit: 'lượt làm',
        icon: <DownloadOutlined />,
    },
];

export const TestFrame = ({
    theme = 'pink',
    test,
}: Readonly<{
    theme?: 'pink' | 'blue';
    test: Test;
}>) => {
    const router = useRouter();
    const iconSrc =
        theme === 'pink'
            ? home8
            : 'https://tiawai-storage.sgp1.cdn.digitaloceanspaces.com/client/home/home-4.png';
    const iconAlt = theme === 'pink' ? 'home icon 8' : 'home icon 4';
    const bgColor = theme === 'pink' ? '#E9DAE9' : '#DAE3E9';
    const objColor = theme === 'pink' ? '#4D2C5E' : '#2C2F5E';
    const size = theme === 'pink' ? 100 : 62;

    return (
        <Flex
            className="!w-full !max-w-[300px] !gap-3 !rounded-xl !py-4 px-3"
            align="center"
            style={{
                backgroundColor: bgColor,
                boxShadow: '0px 4px 25px 0px rgba(0,0,0,0.10)',
            }}
        >
            <IconFrame
                className="aspect-square min-h-max min-w-max"
                bgColor={objColor}
                src={iconSrc}
                alt={iconAlt}
                width={size}
                height={size}
            />
            <Flex
                className="!grow !gap-4 !overflow-hidden"
                justify="space-between"
                vertical
            >
                <Title
                    className="!m-0 !min-w-0 max-w-full !font-roboto"
                    ellipsis
                    level={5}
                >
                    {test.title}
                </Title>
                <Flex justify="space-between" gap={4}>
                    {testInfo.map((info, index) => (
                        <Flex align="center" key={index} gap={2}>
                            {info.icon}
                            <Text className="!text-nowrap !font-roboto !font-medium !text-[#ACACAC]">
                                {info.unit === 'phút'
                                    ? `${test.timeLength} phút`
                                    : `${test.submissionCount} lượt làm`}
                            </Text>
                        </Flex>
                    ))}
                </Flex>
                <Flex justify="space-between" align="center">
                    <div>
                        <Button
                            shape="round"
                            type="primary"
                            className={`${theme === 'pink' ? '!bg-primary-button' : '!bg-secondary-button'}`}
                            size="small"
                            onClick={() =>
                                router.push(`/student/test/${test.id}`)
                            }
                        >
                            Xem đề thi
                        </Button>
                    </div>
                    <AlignRightOutlined
                        onClick={() => router.push(`/test/${test.id}/ranking`)}
                        className={twMerge(
                            '!rotate-90 p-2 text-base hover:cursor-pointer',
                            'transition duration-200 ease-in-out',
                            theme === 'pink'
                                ? 'hover:bg-[#4D2C5E] hover:text-white'
                                : 'hover:bg-[#2C2F5E] hover:text-white',
                            'rounded-full',
                        )}
                    />
                </Flex>
            </Flex>
        </Flex>
    );
};
