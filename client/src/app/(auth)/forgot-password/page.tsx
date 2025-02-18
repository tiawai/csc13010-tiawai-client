"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Typography, notification } from "antd";
import { FormLayout } from "@/ui/form";
import { FormTitle } from "@/ui/common/title";
import { usePasswordRecoveryMutation } from "@/services/auth";
const { Paragraph } = Typography;

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [form] = Form.useForm();
    const [passwordRecovery, { isLoading }] = usePasswordRecoveryMutation();

    const onFinish = async () => {
        const { email } = form.getFieldsValue();
        const res = await passwordRecovery({ email });

        if (!res.error) {
            notification.success({
                message: "Gửi OTP thành công",
                description:
                    "Mã OTP đã được gửi đến email của bạn.\nĐang chuyển hướng...",
            });
            router.push("/reset-password?email=" + btoa(email));
        } else {
            notification.error({
                message: "Gửi OTP thất bại",
                description: "Có lỗi xảy ra khi gửi OTP.",
            });
        }
    };

    return (
        <FormLayout>
            <Form
                form={form}
                name="forgot-password"
                layout="vertical"
                size="large"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <FormTitle>Quên mật khẩu</FormTitle>

                <Paragraph style={{ textAlign: "center" }}>
                    Vui lòng nhập email để nhận mã OTP.
                </Paragraph>

                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Email không được bỏ trống",
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

                <Paragraph className="!text-center">
                    Nhớ mật khẩu?{" "}
                    <Link href="/sign-in">
                        <strong>Đăng nhập</strong>
                    </Link>
                </Paragraph>
            </Form>
        </FormLayout>
    );
}
