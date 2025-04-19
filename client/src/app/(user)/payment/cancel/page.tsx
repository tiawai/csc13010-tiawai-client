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
    }, []);

    return (
        <div className="flex h-full items-center justify-center">
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    {payment?.status === PaymentStatus.CANCELLED ? (
                        <Result
                            status="info"
                            title={paymentContent[payment.type].success.title}
                            subTitle={
                                paymentContent[payment.type].success.subtitle
                            }
                            extra={[
                                <Button onClick={() => router.push('/')}>
                                    Về trang chủ
                                </Button>,
                            ]}
                        />
                    ) : (
                        <Result
                            status="error"
                            title="Hủy thanh toán thất bại"
                            subTitle="Đã có lỗi xảy ra trong quá trình hủy thanh toán."
                            extra={[
                                <Button onClick={() => router.push('/')}>
                                    Về trang chủ
                                </Button>,
                                <Button
                                    type="primary"
                                    onClick={() => router.push('/payment')}
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
