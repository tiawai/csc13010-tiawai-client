"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignUpMutation } from "@/services/auth";
import { Form, Input, Checkbox, Typography, notification } from "antd";
import { FormLayout, ButtonGradient } from "@/ui/form";
import { FormTitle } from "@/ui/common/title";
import { TermAndPolicy } from "@/ui/auth";
const { Paragraph } = Typography;

export default function SignUpPage() {
    const [form] = Form.useForm();
    const router = useRouter();
    const [SignUp, { isLoading }] = useSignUpMutation();

    const onFinish = async () => {
        const formData = form.getFieldsValue();
        const res = await SignUp(formData);

        if (!res.error) {
            notification.success({
                message: "Đăng ký thành công",
                description: "Vui lòng đăng nhập để tiếp tục.",
            });
            router.push("/sign-in");
        } else {
            notification.error({
                message: "Đăng ký thất bại",
                description: "Email đã tồn tại. Vui lòng thử lại.",
            });
        }
    };

    return (
        <FormLayout>
            <Form
                form={form}
                name="sign-up"
                layout="vertical"
                size="large"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <FormTitle>Đăng ký</FormTitle>

                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Họ và tên không được bỏ trống",
                        },
                    ]}
                >
                    <Input className="form__input" placeholder="Tên" />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: "email",
                            required: true,
                            message: "Email không hợp lệ",
                        },
                    ]}
                >
                    <Input className="form__input" placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: "Vui lòng nhập mật khẩu" },
                        { min: 5, message: "Mật khẩu phải có ít nhất 5 ký tự" },
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
                                              "Bạn phải chấp nhận điều khoản và chính sách",
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
                    <ButtonGradient loading={isLoading} />
                </Form.Item>

                <Paragraph style={{ textAlign: "center" }}>
                    Bạn đã là thành viên ?{" "}
                    <Link href="/sign-in">
                        <strong>Đăng nhập</strong>
                    </Link>
                </Paragraph>
            </Form>
        </FormLayout>
    );
}
