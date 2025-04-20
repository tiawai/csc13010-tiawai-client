'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateSessionMutation } from '@/services/chat';
import { useNotification } from '@/lib/hooks/use-notification';
import { Form, Input, Typography } from 'antd';
import { signIn } from 'next-auth/react';
import { setChatSessionId } from '@/lib/slices/auth.slice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hook';
import { FormButtonGradient } from '@/components/auth/ui/form';
import { Role } from '@/types/user.type';
const { Paragraph } = Typography;

const FormSignIn = () => {
    const router = useRouter();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const [createSession] = useCreateSessionMutation();
    const { notify } = useNotification();
    const userId = useAppSelector((state) => state.auth.user?.id);
    const userRole = useAppSelector((state) => state.auth.user?.role);

    useEffect(() => {
        const createChatSession = async () => {
            const session = await createSession({
                userId,
                topic: 'chat ' + userId,
                isActive: true,
            }).unwrap();
            dispatch(setChatSessionId(session.id));
        };
        if (userId) {
            if (userRole !== Role.ADMIN) {
                createChatSession();
            }
            router.push('/');
        }
    }, [userId, userRole, router, dispatch, createSession]);

    const onFinish = async () => {
        const formData = form.getFieldsValue();

        setIsLoading(true);
        const res = await signIn('credentials', {
            username: formData.username,
            password: formData.password,
            redirect: false,
        });
        setIsLoading(false);

        if (res !== undefined && !res?.error) {
            notify({
                message: 'Đăng nhập thành công',
                description: 'Chào mừng bạn trở lại với Tiawai',
            });
        } else {
            notify({
                message: 'Đăng nhập thất bại',
                description: 'Email hoặc mật khẩu không hợp lệ.',
                notiType: 'error',
            });
        }
    };

    return (
        <Form
            form={form}
            name="sign-in"
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
                        message: 'Email không được bỏ trống',
                    },
                    {
                        type: 'email',
                        message: 'Vui lòng nhập địa chỉ email hợp lệ',
                    },
                ]}
            >
                <Input className="form__input" placeholder="Email" />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Mật khẩu không được bỏ trống',
                    },
                ]}
            >
                <Input.Password
                    className="form__input"
                    placeholder="Mật khẩu"
                />
            </Form.Item>

            <Paragraph className="!text-end">
                <Link href="forgot-password">
                    <strong>Quên mật khẩu?</strong>
                </Link>
            </Paragraph>

            <Form.Item>
                <FormButtonGradient loading={isLoading} />
            </Form.Item>
        </Form>
    );
};

export { FormSignIn };
