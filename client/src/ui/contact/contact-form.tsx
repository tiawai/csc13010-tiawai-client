import { FormTitle } from '@/ui/components/title';
import { Form, Input, Button } from 'antd';
const { TextArea } = Input;
import { useCreateReportMutation } from '@/services/report.service';
import { useNotification } from '@/lib/hooks/use-notification';

export const ContactForm = () => {
    const [createReport, { isLoading }] = useCreateReportMutation();
    const { notify } = useNotification();
    const [form] = Form.useForm();

    const onFinish = async () => {
        try {
            const values = form.getFieldsValue();
            const { fullname, email, phone, content } = values;
            await createReport({
                fullname,
                email,
                phone,
                content,
            }).unwrap();
            form.resetFields();
            notify({
                message: 'Gửi báo cáo thành công',
                description: 'Chúng tôi sẽ liên hệ với bạn sớm nhất có thể',
            });
        } catch (error) {
            console.error('Error sending report:', error);
            notify({
                message: 'Gửi báo cáo thất bại',
                description: 'Vui lòng thử lại sau',
                notiType: 'error',
            });
        }
    };

    return (
        <Form
            form={form}
            name="sign-in"
            layout="vertical"
            initialValues={{ remember: true }}
            size="large"
            onFinish={onFinish}
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

            <Form.Item name="content">
                <TextArea
                    className="form__input"
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
                    loading={isLoading}
                >
                    Gửi nội dung
                </Button>
            </Form.Item>
        </Form>
    );
};
