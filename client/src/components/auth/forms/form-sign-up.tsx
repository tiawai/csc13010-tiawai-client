'use client';
import { useRouter } from 'next/navigation';
import { useSignUpMutation } from '@/services/auth';
import { Form, Input, Checkbox, notification } from 'antd';
import { FormButtonGradient } from '@/components/auth/ui/form-ui';
import { TermAndPolicy } from '@/ui/auth';

const FormSignUp = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const [SignUp, { isLoading }] = useSignUpMutation();

    const onFinish = async () => {
        const formData = form.getFieldsValue();
        const res = await SignUp(formData);

        if (!res.error) {
            notification.success({
                message: 'Đăng ký thành công',
                description: 'Vui lòng đăng nhập để tiếp tục.',
            });
            router.push('/sign-in');
        } else {
            notification.error({
                message: 'Đăng ký thất bại',
                description: 'Email đã tồn tại. Vui lòng thử lại.',
            });
        }
    };

    return (
        <Form
            form={form}
            name="sign-up"
            layout="vertical"
            size="large"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Họ và tên không được bỏ trống',
                    },
                ]}
            >
                <Input className="form__input" placeholder="Tên" />
            </Form.Item>

            <Form.Item
                name="email"
                rules={[
                    {
                        type: 'email',
                        required: true,
                        message: 'Email không hợp lệ',
                    },
                ]}
            >
                <Input className="form__input" placeholder="Email" />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    { required: true, message: 'Vui lòng nhập mật khẩu' },
                    { min: 5, message: 'Mật khẩu phải có ít nhất 5 ký tự' },
                ]}
            >
                <Input.Password
                    className="form__input"
                    placeholder="Mật khẩu"
                />
            </Form.Item>

            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value
                                ? Promise.resolve()
                                : Promise.reject(
                                      new Error(
                                          'Bạn phải chấp nhận điều khoản và chính sách',
                                      ),
                                  ),
                    },
                ]}
            >
                <Checkbox>
                    <TermAndPolicy />
                </Checkbox>
            </Form.Item>

            <Form.Item>
                <FormButtonGradient loading={isLoading} />
            </Form.Item>
        </Form>
    );
};

export { FormSignUp };
