'use client';
import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Result, Button, Spin } from 'antd';
import { useRouter } from 'next/navigation';
import { Banner, BannerTitle } from '@/ui/components/banner';
import { useVerifyPaymentMutation } from '@/services/payment';
import { Payment, PaymentType, PaymentContent } from '@/types/payment.type';

const paymentContent: Record<PaymentType, PaymentContent> = {
    CLASSROOM: {
        success: {
            title: 'Hủy đăng ký lớp học thành công!',
            subtitle: 'Bạn có thể thử đăng ký lại sau.',
        },
        error: {
            title: 'Hủy đăng ký lớp học thất bại',
            subtitle: 'Đã có lỗi xảy ra trong quá trình hủy đăng ký.',
        },
    },
    BALANCE: {
        success: {
            title: 'Hủy nạp tiền thành công!',
            subtitle: 'Bạn có thể thử nạp tiền lại sau.',
        },
        error: {
            title: 'Hủy nạp tiền thất bại',
            subtitle: 'Đã có lỗi xảy ra trong quá trình hủy nạp tiền.',
        },
    },
};

export default function PaymentCancel() {
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

    const getCancelActions = () => [
        <Button
            key="retry"
            type="primary"
            onClick={() => router.push('/payment')}
        >
            Thử lại
        </Button>,
        <Button key="home" onClick={() => router.push('/')}>
            Về trang chủ
        </Button>,
    ];

    if (status === 'loading') {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center">
                <Banner>
                    <BannerTitle>Hủy thanh toán</BannerTitle>
                </Banner>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <Banner>
                <BannerTitle>Hủy thanh toán</BannerTitle>
            </Banner>

            <div className="mt-8">
                {status === 'success' && payment && (
                    <Result
                        status="info"
                        title={paymentContent[payment.type].success.title}
                        subTitle={paymentContent[payment.type].success.subtitle}
                        extra={getCancelActions()}
                    />
                )}

                {status === 'error' && (
                    <Result
                        status="error"
                        title="Hủy thanh toán thất bại"
                        subTitle="Đã có lỗi xảy ra trong quá trình hủy thanh toán."
                        extra={getCancelActions()}
                    />
                )}
            </div>
        </div>
    );
}
