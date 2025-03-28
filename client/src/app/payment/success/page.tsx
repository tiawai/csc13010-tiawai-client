'use client';
import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Result, Button, Spin } from 'antd';
import { useRouter } from 'next/navigation';
import { Banner, BannerTitle } from '@/ui/components/banner';
import { useVerifyPaymentMutation } from '@/services/payment';
import { Payment, PaymentType, PaymentContent } from '@/types/payment';

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
            title: 'Nạp tiền thành công!',
            subtitle: 'Số tiền đã được cộng vào tài khoản của bạn.',
        },
        error: {
            title: 'Nạp tiền thất bại',
            subtitle: 'Đã có lỗi xảy ra trong quá trình nạp tiền.',
        },
    },
};

export default function PaymentSuccess() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<'success' | 'error' | 'loading'>(
        'loading',
    );
    const [payment, setPayment] = useState<Payment | undefined>(undefined);
    const [verifyPayment] = useVerifyPaymentMutation();

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

        const handleVerifyPayment = async () => {
            if (!code || !id || !status || !orderCode) {
                setStatus('error');
                return;
            }

            const res = await verifyPayment({
                code,
                id,
                cancel,
                status,
                orderCode,
            });
            if (res.error || !res.data) {
                setStatus('error');
                return;
            }

            setPayment(res.data);
            setStatus('success');
        };

        handleVerifyPayment();
    }, [queryParams, verifyPayment]);

    const getSuccessActions = () => {
        if (!payment) return [];

        const actions = [
            <Button key="home" type="primary" onClick={() => router.push('/')}>
                Về trang chủ
            </Button>,
        ];

        if (payment.type === 'CLASSROOM') {
            actions.unshift(
                <Button
                    key="classroom"
                    type="primary"
                    onClick={() =>
                        router.push(`/classroom/${payment.classroomId}`)
                    }
                >
                    Vào lớp học
                </Button>,
            );
        } else {
            actions.push(
                <Button key="profile" onClick={() => router.push('/profile')}>
                    Xem số dư
                </Button>,
            );
        }

        return actions;
    };

    if (status === 'loading') {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center">
                <Banner>
                    <BannerTitle>Xác nhận thanh toán</BannerTitle>
                </Banner>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <Banner>
                <BannerTitle>Xác nhận thanh toán</BannerTitle>
            </Banner>

            <div className="mt-8">
                {status === 'success' && payment && (
                    <Result
                        status="success"
                        title={paymentContent[payment.type].success.title}
                        subTitle={paymentContent[payment.type].success.subtitle}
                        extra={getSuccessActions()}
                    />
                )}

                {status === 'error' && (
                    <Result
                        status="error"
                        title="Thanh toán thất bại"
                        subTitle="Đã có lỗi xảy ra trong quá trình thanh toán."
                        extra={[
                            <Button
                                key="retry"
                                type="primary"
                                onClick={() => router.push('/payment')}
                            >
                                Thử lại
                            </Button>,
                        ]}
                    />
                )}
            </div>
        </div>
    );
}
