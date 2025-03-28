'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Typography, notification } from 'antd';
import { signIn, useSession } from 'next-auth/react';
import { useCreateSessionMutation } from '@/services/chat';
import { setAuthState, setChatSessionId } from '@/lib/slices/auth';
import { useAppDispatch } from '@/lib/hooks/hook';
import { FormButtonGradient } from '@/components/auth/ui/form';
import { Role } from '@/types/user';
const { Paragraph } = Typography;

const FormSignIn = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();

    const dispatch = useAppDispatch();
    const [createSession] = useCreateSessionMutation();

    useEffect(() => {
        const createNewChat = async (userId: string) => {
            try {
                const res = await createSession({
                    userId,
                    topic: 'chat ' + userId,
                    isActive: true,
                }).unwrap();
                dispatch(setChatSessionId(res.id));
            } catch (error) {
                console.error('Failed to create chat session', error);
            }
        };
        if (session) {
            dispatch(
                setAuthState({
                    user: session.user.id,
                    accessToken: session.accessToken as string,
                    refreshToken: session.refreshToken as string,
                }),
            );
            const role = session?.user?.role as Role;
            if (role === Role.ADMIN) {
                router.push('/admin');
            } else {
                if (session.user.id) {
                    createNewChat(session.user.id);
                }
                router.push('/');
            }
        }
    }, [session, router, createSession, dispatch]);

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
            notification.success({
                message: 'Đăng nhập thành công',
                description: 'Chào mừng bạn trở lại với Tiawai',
            });
        } else {
            notification.error({
                message: 'Đăng nhập thất bại',
                description:
                    'Email hoặc mật khẩu không hợp lệ. Vui lòng thử lại.',
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
                    {
                        min: 5,
                        message: 'Mật khẩu phải có ít nhất 5 ký tự',
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
