import { FormTitle } from '@/ui/components/title';
import { Form, Input, Button } from 'antd';
const { TextArea } = Input;

export const ContactForm = () => {
    return (
        <Form
            // form={form}
            name="sign-in"
            layout="vertical"
            initialValues={{ remember: true }}
            autoComplete="off"
            size="large"
            className="select-none"
        >
            <FormTitle>Liên hệ với chúng tôi</FormTitle>

            <Form.Item
                name="fullname"
                rules={[
                    {
                        required: true,
                        message: 'Họ và tên không được bỏ trống',
                    },
                ]}
            >
                <Input className="form__input" placeholder="Họ và tên" />
            </Form.Item>

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

            <Form.Item
                name="phone"
                rules={[
                    {
                        required: true,
                        message: 'Số điện thoại không được bỏ trống',
                    },
                ]}
            >
                <Input className="form__input" placeholder="Số điện thoại" />
            </Form.Item>

            <Form.Item>
                <TextArea
                    className="form__input"
                    name="content"
                    autoSize={{ minRows: 1, maxRows: 5 }}
                    placeholder="Nhập nội dung"
                    required
                />
            </Form.Item>

            <Form.Item>
                <Button
                    className="!m-auto !block !bg-[#E9DAE9] !font-bold"
                    htmlType="submit"
                    shape="round"
                    size="large"
                >
                    Gửi nội dung
                </Button>
            </Form.Item>
        </Form>
    );
};
