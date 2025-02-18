"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Form, Input, Button, notification } from "antd";
import { FormLayout } from "@/ui/form";
import { FormTitle } from "@/ui/common/title";
import { useResetPasswordMutation } from "@/services/auth";

export default function ResetPasswordPage() {
    const params = useSearchParams();
    const router = useRouter();
    const [form] = Form.useForm();
    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    const onFinish = async () => {
        const { otp, newPassword, confirmPassword } = form.getFieldsValue();
        const email = params.get("email") || "";

        if (email == "" || !(btoa(atob(email)) === email)) {
            notification.error({
                message: "Khôi phục mật khẩu thất bại",
                description: "URL không hợp lệ.",
            });
            return;
        }

        const res = await resetPassword({
            email: atob(email),
            otp: otp,
            newPassword,
            confirmPassword,
        });

        if (!res.error) {
            notification.success({
                message: "Khôi phục mật khẩu thành công",
                description:
                    "Mật khẩu của bạn đã được cập nhật.\nĐang chuyển hướng đến trang đăng nhập...",
            });
            router.push("/sign-in");
        } else {
            notification.error({
                message: "Khôi phục mật khẩu thất bại",
                description: "Có lỗi xảy ra.",
            });
        }
    };

    return (
        <FormLayout>
            <Form
                form={form}
                name="reset-password"
                layout="vertical"
                size="large"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <FormTitle>Khôi phục mật khẩu</FormTitle>

                <Form.Item
                    name="otp"
                    rules={[
                        {
                            required: true,
                            message: "OTP không được bỏ trống",
                        },
                        {
                            len: 6,
                            message: "OTP phải gồm 6 chữ số",
                        },
                    ]}
                >
                    <Input.OTP length={6} disabled={isLoading} />
                </Form.Item>

                <Form.Item
                    name="newPassword"
                    rules={[
                        { required: true, message: "Vui lòng nhập mật khẩu" },
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

                <Form.Item
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng xác nhận mật khẩu",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue("newPassword") === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error("Mật khẩu xác nhận không khớp"),
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        className="form__input"
                        placeholder="Xác nhận mật khẩu"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        className="!m-auto !block"
                        shape="round"
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                    >
                        Xác nhận
                    </Button>
                </Form.Item>
            </Form>
        </FormLayout>
    );
}
