'use client';
import { FileTextFilled, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Rate } from 'antd';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { Typography } from 'antd';
import { Classroom } from '@/types/classroom.type';
import { useRouter } from 'next/navigation';
import { useCreatePaymentClassroomMutation } from '@/services/payment.service';
import { useNotification } from '@/lib/hooks/use-notification';
import { PaymentStatus } from '@/types/payment.type';
const { Title } = Typography;

const userFormatter = (user: number) => {
    if (user > 100 && user < 1000) {
        return `${Math.floor(user / 100) * 100}+`;
    } else if (user <= 100) {
        return user;
    } else {
        return '1000+';
    }
};

const priceFormatter = (price: number) => {
    if (price === 0) {
        return 'FREE';
    } else {
        return price.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
    }
};

const ClassFrame: React.FC<{
    className?: string;
    isMine?: boolean;
    class: Classroom;
}> = ({ className, isMine = false, class: classData }) => {
    const router = useRouter();
    const [createPayment, { isLoading }] = useCreatePaymentClassroomMutation();
    const { notify } = useNotification();

    const handlePayment = async () => {
        const res = await createPayment(classData.id);

        if (res.error) {
            notify({
                message: 'Có lỗi xảy ra',
                description: 'Không thể tạo đơn thanh toán',
                notiType: 'error',
            });
        } else if (
            res.data.paymentLink &&
            res.data.status !== PaymentStatus.SUCCESS
        ) {
            notify({
                message: 'Tạo đơn thanh toán thành công',
                description: 'Đang chuyển hướng đến trang thanh toán',
            });
            router.push(res.data.paymentLink);
        } else {
            router.push(`/student/class/${classData.id}`);
        }
    };
    return (
        <Flex
            className={twMerge(
                'max-h-[663px] w-full min-w-[300px] max-w-max bg-secondary p-5 font-montserrat',
                className,
            )}
            vertical
            gap={20}
        >
            <Image
                src={classData.backgroundImage || ''}
                width={412}
                height={250}
                alt="cover image"
                className="h-[250px] rounded-xl"
            />
            <Flex justify="space-between" align="center">
                <Flex align="center" gap={4}>
                    <Rate
                        value={classData.avgRating || 0}
                        disabled
                        allowHalf
                        style={{ fontSize: 16, color: '#FF3000' }}
                    />
                    <span className="ml-1 text-xs font-medium">
                        {classData.avgRating || '0.0'}
                    </span>
                </Flex>
                {!isMine && (
                    <span className="font-bold text-secondary">
                        {priceFormatter(classData.price || 0)}
                    </span>
                )}
            </Flex>
            <div className="h-[60px] overflow-hidden">
                <Title
                    className="!mb-0 line-clamp-2 uppercase"
                    level={4}
                    ellipsis={{ rows: 2, tooltip: classData.className }}
                >
                    {classData.className}
                </Title>
            </div>
            <Flex gap={10}>
                <Flex
                    className="flex-1 rounded-md bg-white p-5 text-secondary"
                    align="center"
                    justify="space-evenly"
                >
                    <Flex align="center" gap={4}>
                        <FileTextFilled />
                        <span>{classData.totalLessons || 0} bài học</span>
                    </Flex>
                    <Flex align="baseline" gap={4}>
                        <UserOutlined />
                        <span>{userFormatter(classData.maxStudent || 0)}</span>
                    </Flex>
                </Flex>
                <Button
                    variant="solid"
                    className="!h-auto w-full flex-[0.6] !bg-secondary-button !font-montserrat !text-white"
                    onClick={handlePayment}
                    loading={isLoading}
                >
                    Tham gia
                </Button>
            </Flex>
        </Flex>
    );
};

export default ClassFrame;
