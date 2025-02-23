import { Form, Input } from 'antd';
import { CardButton } from '@/components/common/card-ui';

const keyMap: { [key: string]: string } = {
    name: 'Họ và tên',
    email: 'Email',
    gender: 'Giới tính',
    phone: 'Số điện thoại',
    birthday: 'Ngày sinh',
    address: 'Địa chỉ',
    examTaken: 'Số đề thi đã làm',
    practiceTaken: 'Số chuyên đề đã tạo',
    vocabularies: 'Số từ vựng đã học',
};

const UserUpdateInfoForm = ({
    props,
}: {
    props: { [key: string]: string | number | boolean | undefined };
}) => (
    <Form
        name="user-info"
        labelCol={{ span: 12 }}
        labelAlign="left"
        wrapperCol={{ span: 12 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        variant="borderless"
        size="small"
        colon={false}
    >
        {Object.entries(props)
            .filter(([key]) => key !== 'title' && key !== 'isUpdatingInfo')
            .map(([key, value]) => (
                <Form.Item
                    className="mb-[1rem] h-7"
                    key={key}
                    name={key}
                    label={
                        <span className="font-roboto text-lg">
                            {keyMap[key] || key}
                        </span>
                    }
                >
                    <Input
                        className="font-roboto font-bold"
                        placeholder={value?.toString() || ''}
                    />
                </Form.Item>
            ))}
        <CardButton
            className="m-auto"
            text="Cập nhật thông tin"
            onClick={() => {}}
        />
    </Form>
);

const FormLabel = ({ text }: { text: string }) => (
    <span className="font-roboto text-lg">{text}</span>
);

const updatePasswordFormItems = [
    {
        label: <FormLabel text="Mật khẩu cũ" />,
        name: 'oldPassword',
        rules: [{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }],
        component: (
            <Input.Password
                className="font-roboto font-bold"
                placeholder="Nhập mật khẩu cũ"
            />
        ),
    },
    {
        label: <FormLabel text="Mật khẩu mới" />,
        name: 'newPassword',
        rules: [{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }],
        component: (
            <Input.Password
                className="font-roboto font-bold"
                placeholder="Nhập mật khẩu mới"
            />
        ),
    },
    {
        label: <FormLabel text="Xác nhận mật khẩu" />,
        name: 'confirmPassword',
        rules: [{ required: true, message: 'Vui lòng xác nhận mật khẩu!' }],
        component: (
            <Input.Password
                className="font-roboto font-bold"
                placeholder="Xác nhận mật khẩu"
            />
        ),
    },
];

type UpdatePasswordFieldType = {
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
};

const UserUpdatePasswordForm = () => {
    const onFinish = (values: UpdatePasswordFieldType) => {
        console.log('Success:', values);
    };

    return (
        <Form
            name="password"
            labelCol={{ span: 12 }}
            labelAlign="left"
            wrapperCol={{ span: 12 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            variant="borderless"
            colon={false}
        >
            {updatePasswordFormItems.map((item) => (
                <Form.Item
                    key={item.name}
                    name={item.name}
                    label={item.label}
                    rules={item.rules}
                >
                    {item.component}
                </Form.Item>
            ))}
            <CardButton
                className="m-auto"
                text="Cập nhật mật khẩu"
                onClick={() => {}}
            />
        </Form>
    );
};

export { UserUpdateInfoForm, UserUpdatePasswordForm };
