import { Test } from '@/types/test.type';
import IconFrame from '@/ui/icon-frame';
import { ClockCircleOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button, Flex, Result, Typography } from 'antd';
import { useRouter } from 'next/navigation';
const { Text, Title } = Typography;

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
            ? '/home/home-8.svg'
            : 'https://tiawai-storage.sgp1.cdn.digitaloceanspaces.com/client/home/home-4.png';
    const iconAlt = theme === 'pink' ? 'home icon 8' : 'home icon 4';
    const bgColor = theme === 'pink' ? '#E9DAE9' : '#DAE3E9';
    const objColor = theme === 'pink' ? '#4D2C5E' : '#2C2F5E';
    const size = theme === 'pink' ? 100 : 62;

    return (
        <Flex
            className="!w-full !gap-3 !rounded-xl !py-4 px-3"
            style={{
                backgroundColor: bgColor,
                boxShadow: '0px 4px 25px 0px rgba(0,0,0,0.10)',
            }}
            align="center"
        >
            <IconFrame
                className="aspect-square min-h-max min-w-max"
                bgColor={objColor}
                src={iconSrc}
                alt={iconAlt}
                width={size}
                height={size}
            />
            <Flex className="!max-w-full grow gap-4" vertical>
                <Title
                    className="!m-0 !max-w-[65%] truncate !font-roboto"
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
                                    : `${test.timeLength} lượt làm`}
                            </Text>
                        </Flex>
                    ))}
                </Flex>
                <div>
                    <Button
                        shape="round"
                        type="primary"
                        className={`${theme === 'pink' ? 'bg-primary-button' : 'bg-secondary-button'}`}
                        size="small"
                        onClick={() => router.push(`test/${test.id}`)}
                    >
                        Xem đề thi
                    </Button>
                </div>
            </Flex>
        </Flex>
    );
};
