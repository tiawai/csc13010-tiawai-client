"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Typography, notification } from "antd";
import { FormLayout, ButtonGradient } from "@/ui/form";
import { FormTitle } from "@/ui/common/title";
import { signIn, useSession } from "next-auth/react";
import { useCreateSessionMutation } from "@/services/chat";
import { setAuthState, setChatSessionId } from "@/lib/slices/auth";
import { useAppDispatch } from "@/lib/hooks/hook";
const { Paragraph } = Typography;

export default function SignInPage() {
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
                    topic: "chat " + userId,
                    isActive: true,
                }).unwrap();
                dispatch(setChatSessionId(res.id));
            } catch (error) {
                console.error("Failed to create chat session", error);
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
            const role = session?.user?.role;
            if (role === "administrator") {
                router.push("/admin");
            } else {
                if (session.user.id) {
                    createNewChat(session.user.id);
                }
                router.push("/");
            }
        }
    }, [session, router, createSession, dispatch]);

    const onFinish = async () => {
        const formData = form.getFieldsValue();

        setIsLoading(true);
        const res = await signIn("credentials", {
            username: formData.username,
            password: formData.password,
            redirect: false,
        });
        setIsLoading(false);

        if (res !== undefined && !res?.error) {
            notification.success({
                message: "Đăng nhập thành công",
                description: "Chào mừng bạn trở lại với Tiawai",
            });
        } else {
            notification.error({
                message: "Đăng nhập thất bại",
                description:
                    "Email hoặc mật khẩu không hợp lệ. Vui lòng thử lại.",
            });
        }
    };

    return (
        <>
            <FormLayout>
                <Form
                    form={form}
                    name="sign-in"
                    layout="vertical"
                    size="large"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <FormTitle>Đăng nhập</FormTitle>

                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Email không được bỏ trống",
                            },
                            {
                                type: "email",
                                message: "Vui lòng nhập địa chỉ email hợp lệ",
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
                                message: "Mật khẩu không được bỏ trống",
                            },
                            {
                                min: 5,
                                message: "Mật khẩu phải có ít nhất 5 ký tự",
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
                        <ButtonGradient loading={isLoading} />
                    </Form.Item>

                    <Paragraph className="!text-center">
                        Bạn chưa có tài khoản?{" "}
                        <Link href="sign-up">
                            <strong>Đăng ký</strong>
                        </Link>
                    </Paragraph>
                </Form>
            </FormLayout>
        </>
    );
}
