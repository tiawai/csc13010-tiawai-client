'use client';
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Result, Button } from 'antd';
import { useRouter } from 'next/navigation';
import { useVerifyPaymentMutation } from '@/services/payment.service';
import {
    PaymentType,
    PaymentContent,
    PaymentStatus,
} from '@/types/payment.type';
import { Loading } from '@/components/common/loading';

const paymentContent: Record<PaymentType, PaymentContent> = {
    CLASSROOM: {
        success: {
            title: 'Đăng ký lớp học thành công!',
            subtitle: 'Bạn có thể truy cập lớp học ngay bây giờ.',
        },
        error: {
            title: 'Đăng ký lớp học thất bại',
            subtitle: 'Đã có lỗi xảy ra trong quá trình đăng ký lớp học.',
        },
    },
    BALANCE: {
        success: {
            title: 'Thanh toán tạo đề AI thành công!',
            subtitle: 'Bạn có thể thử sử dụng chức năng này ngay bây giờ.',
        },
        error: {
            title: 'Thanh toán tạo đề AI thất bại',
            subtitle: 'Đã có lỗi xảy ra trong quá trình thanh toán.',
        },
    },
};

export default function PaymentSuccess() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [verifyPayment, { data: payment, isLoading }] =
        useVerifyPaymentMutation();

    const queryParams = useMemo(
        () => ({
            code: searchParams.get('code'),
            id: searchParams.get('id'),
            cancel: searchParams.get('cancel') === 'true',
            status: searchParams.get('status'),
            orderCode: searchParams.get('orderCode'),
        }),
        [searchParams],
    );

    useEffect(() => {
        const { code, id, cancel, status, orderCode } = queryParams;
        verifyPayment({
            code: code || '',
            id: id || '',
            cancel: cancel || false,
            status: status || '',
            orderCode: orderCode || '',
        });
    }, [queryParams, verifyPayment]);

    return (
        <div className="flex h-full items-center justify-center">
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    {payment?.status === PaymentStatus.SUCCESS ? (
                        <Result
                            status="success"
                            title={paymentContent[payment.type].success.title}
                            subTitle={
                                paymentContent[payment.type].success.subtitle
                            }
                            extra={[
                                <Button
                                    key="home"
                                    onClick={() => router.push('/')}
                                >
                                    Về trang chủ
                                </Button>,
                                payment.type === PaymentType.CLASSROOM ? (
                                    <Button
                                        key="classroom"
                                        type="primary"
                                        onClick={() =>
                                            router.push(
                                                `/student/class/${payment.classroomId}`,
                                            )
                                        }
                                    >
                                        Vào lớp học
                                    </Button>
                                ) : (
                                    <Button
                                        key="balance"
                                        type="primary"
                                        onClick={() =>
                                            router.push(`/teacher/classroom`)
                                        }
                                    >
                                        Vào lớp học
                                    </Button>
                                ),
                            ]}
                        />
                    ) : (
                        <Result
                            status="error"
                            title="Thanh toán thất bại"
                            subTitle="Đã có lỗi xảy ra trong quá trình thanh toán."
                            extra={[
                                <Button
                                    key="retry"
                                    type="primary"
                                    onClick={() => router.refresh()}
                                >
                                    Thử lại
                                </Button>,
                            ]}
                        />
                    )}
                </>
            )}
        </div>
    );
}
