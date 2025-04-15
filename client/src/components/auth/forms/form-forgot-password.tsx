'use client';
import { useRouter } from 'next/navigation';
import { Form, Input, Button } from 'antd';
import { usePasswordRecoveryMutation } from '@/services/auth.service';
import { useNotification } from '@/components/common/notification';

const FormForgotPassword = () => {
    const router = useRouter();
    const [form] = Form.useForm();
    const { notify } = useNotification();
    const [passwordRecovery, { isLoading }] = usePasswordRecoveryMutation();

    const onFinish = async () => {
        const { email } = form.getFieldsValue();
        const res = await passwordRecovery({ email });

        if (!res.error) {
            notify({
                message: 'Gửi OTP thành công',
                description:
                    'Mã OTP đã được gửi đến email của bạn.\nĐang chuyển hướng...',
            });
            router.push('reset-password?email=' + btoa(email));
        } else {
            notify({
                message: 'Gửi OTP thất bại',
                description: 'Có lỗi xảy ra khi gửi OTP.',
                type: 'error',
            });
        }
    };

    return (
        <Form
            form={form}
            name="forgot-password"
            layout="vertical"
            size="large"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Email không được bỏ trống',
                    },
                ]}
            >
                <Input className="form__input" placeholder="Email" />
            </Form.Item>

            <Form.Item>
                <Button
                    className="!m-auto !block"
                    type="primary"
                    shape="round"
                    htmlType="submit"
                    loading={isLoading}
                >
                    Gửi OTP
                </Button>
            </Form.Item>
        </Form>
    );
};

export { FormForgotPassword };
