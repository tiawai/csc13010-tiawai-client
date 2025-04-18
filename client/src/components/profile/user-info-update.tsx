'use client';
import { Form, Input, Select } from 'antd';
import { CardButton } from '@/components/common/card';
import { useUpdateBankAccountMutation } from '@/services/payment.service';
import { useUpdateUserProfileMutation } from '@/services/user.service';
import { useChangePasswordMutation } from '@/services/auth.service';
import { useNotification } from '@/lib/hooks/use-notification';
import { Role, UpdateUserDto } from '@/types/user.type';

const { Option } = Select;

const keyMap: { [key: string]: string } = {
    username: 'Họ và tên',
    email: 'Email',
    gender: 'Giới tính',
    phone: 'Số điện thoại',
    birthdate: 'Ngày sinh',
    address: 'Địa chỉ',
    examTaken: 'Số đề thi đã làm',
    practiceTaken: 'Số chuyên đề đã tạo',
    vocabularies: 'Số từ vựng đã học',
};

const UserUpdateInfoForm = ({
    props,
}: {
    props: { [key: string]: string | number | boolean | undefined };
}) => {
    const [form] = Form.useForm();
    const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();
    const { notify } = useNotification();

    const onFinish = async (values: UpdateUserDto) => {
        try {
            if (values.birthdate) {
                const [day, month, year] = values.birthdate.split('/');
                values.birthdate = new Date(
                    `${year}-${month}-${day}`,
                ).toISOString();
            }
            await updateUserProfile(values).unwrap();
            notify({
                message: 'Cập nhật thông tin thành công',
                description: 'Thông tin cá nhân đã được cập nhật.',
            });
        } catch (error: unknown) {
            const err = error as Error;
            notify({
                message: 'Cập nhật thông tin thất bại',
                description: err.message || 'Vui lòng thử lại sau',
                notiType: 'error',
            });
        }
    };

    return (
        <Form
            form={form}
            name="user-info"
            labelCol={{ span: 12 }}
            labelAlign="left"
            wrapperCol={{ span: 12 }}
            initialValues={{
                username: props.username,
                email: props.email,
                gender: props.gender === 'Chưa cập nhật' ? null : props.gender,
                phone: props.phone === 'Chưa cập nhật' ? '' : props.phone,
                birthdate:
                    props.birthdate === 'Chưa cập nhật' ? '' : props.birthdate,
                address: props.address === 'Chưa cập nhật' ? '' : props.address,
            }}
            onFinish={onFinish}
            autoComplete="off"
            variant="borderless"
            size="small"
            colon={false}
        >
            {Object.entries(props)
                .filter(([key]) => key !== 'title' && key !== 'isUpdatingInfo')
                .map(([key]) => (
                    <Form.Item
                        className="mb-[1rem] h-7"
                        key={key}
                        name={key}
                        label={
                            <span className="font-roboto text-lg">
                                {keyMap[key] || key}
                            </span>
                        }
                        rules={
                            key === 'email'
                                ? [
                                      {
                                          type: 'email',
                                          message: 'Email không hợp lệ',
                                      },
                                      {
                                          required: true,
                                          message: 'Vui lòng nhập email',
                                      },
                                  ]
                                : key === 'username'
                                  ? [
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập họ và tên',
                                        },
                                    ]
                                  : []
                        }
                    >
                        {key === 'gender' ? (
                            <Select
                                className="font-roboto font-bold"
                                placeholder="Chọn giới tính"
                                allowClear
                            >
                                <Option value="male">Nam</Option>
                                <Option value="female">Nữ</Option>
                            </Select>
                        ) : key === 'birthdate' ? (
                            <Input
                                className="font-roboto font-bold"
                                placeholder="dd/mm/yyyy"
                            />
                        ) : (
                            <Input
                                className="font-roboto font-bold"
                                placeholder={props[key]?.toString() || ''}
                            />
                        )}
                    </Form.Item>
                ))}
            <CardButton
                className="m-auto"
                text="Cập nhật thông tin"
                isLoading={isLoading}
            />
        </Form>
    );
};

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
    const [form] = Form.useForm();
    const [changePassword, { isLoading }] = useChangePasswordMutation();
    const { notify } = useNotification();

    const onFinish = async (values: UpdatePasswordFieldType) => {
        try {
            const { oldPassword, newPassword, confirmPassword } = values;

            // Validate password confirmation
            if (newPassword !== confirmPassword) {
                notify({
                    message: 'Xác nhận mật khẩu không khớp',
                    description:
                        'Mật khẩu mới và xác nhận mật khẩu phải giống nhau',
                    notiType: 'error',
                });
                return;
            }

            await changePassword({
                oldPassword,
                newPassword,
                confirmPassword,
            }).unwrap();

            notify({
                message: 'Cập nhật mật khẩu thành công',
                description: 'Mật khẩu của bạn đã được cập nhật thành công.',
            });

            // Reset form after successful update
            form.resetFields();
        } catch (error: unknown) {
            const err = error as Error;
            notify({
                message: 'Cập nhật mật khẩu thất bại',
                description: err.message || 'Vui lòng thử lại sau',
                notiType: 'error',
            });
        }
    };

    return (
        <Form
            form={form}
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
                isLoading={isLoading}
            />
        </Form>
    );
};

const bankNameOptions = [
    'Nông nghiệp và Phát triển nông thôn (VBA)',
    'Ngoại thương Việt Nam (VCB)',
    'Đầu tư và phát triển (BIDV)',
    'Công Thương Việt Nam (VIETINBANK)',
    'Việt Nam Thịnh Vượng (VPB)',
    'Quốc tế (VIB)',
    'Xuất nhập khẩu (EIB)',
    'Sài Gòn Hà Nội (SHB)',
    'Tiên Phong (TPB)',
    'Kỹ Thương (TCB)',
    'Hàng hải (MSB)',
    'Ngân hàng Thương mại Cổ phần Lộc Phát Việt Nam',
    'Đông Á (DAB)',
    'Bắc Á (NASB)',
    'Sài Gòn Công thương (SGB)',
    'Việt Nam Thương tín (VIETBANK)',
    'BVBank – Ngân hàng TMCP Bản Việt',
    'Kiên Long (KLB)',
    'Ngân hàng TMCP Thịnh vượng và Phát triển (PGBank)',
    'Đại chúng Việt Nam (PVC)',
    'Á Châu (ACB)',
    'Nam Á (NAMABANK)',
    'Sài Gòn (SCB)',
    'Đông Nam Á (SEAB)',
    'Phương Đông (OCB)',
    'Việt Á (VAB)',
    'Quốc Dân (NCB)',
    'Liên doanh VID Public Bank (VID)',
    'Bảo Việt (BVB)',
    'Ngân hàng TNHH MTV Việt Nam Hiện Đại (MBV)',
    'Phát triển nhà TP HCM (HDB)',
    'Dầu khí toàn cầu (GPB)',
    'Sacombank (STB)',
    'An Bình (ABBANK)',
    'TNHH MTV Hong Leong VN (HLB)',
    'MTV Shinhan Việt Nam (SHBVN)',
    'Liên Doanh Việt Nga (VRB)',
    'Xây dựng Việt Nam (CBB)',
    'United Overseas Bank Việt Nam (UOB)',
    'Woori Việt Nam (Woori)',
    'Indovina (IVB)',
    'Việt Nam Thịnh Vượng CAKE BANK (VPB)',
    'Việt Nam Thịnh Vượng UBANK (VPB)',
    'Quân đội (MB)',
];

export const UpdateBankAccountFormItems = [
    {
        label: <FormLabel text="Số tài khoản" />,
        name: 'accountNumber',
        rules: [{ required: true, message: 'Vui lòng nhập số tài khoản!' }],
        component: (
            <Input
                className="font-roboto font-bold"
                placeholder="Nhập số tài khoản"
            />
        ),
    },
    {
        label: <FormLabel text="Tên tài khoản" />,
        name: 'accountHolderName',
        rules: [{ required: true, message: 'Vui lòng nhập tên tài khoản!' }],
        component: (
            <Input
                className="font-roboto font-bold"
                placeholder="Nhập tên tài khoản"
            />
        ),
    },
    {
        label: <FormLabel text="Tên ngân hàng" />,
        name: 'bankName',
        rules: [{ required: true, message: 'Vui lòng chọn ngân hàng!' }],
        component: (
            <Select
                placeholder="Chọn ngân hàng"
                className="w-full font-roboto font-bold"
                showSearch
                optionFilterProp="children"
                defaultValue=""
                filterOption={(input, option) =>
                    String(option?.value ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                }
            >
                <Option value="" disabled>
                    Chọn ngân hàng
                </Option>
                {bankNameOptions.map((bankName) => (
                    <Option key={bankName} value={bankName}>
                        <b>{bankName}</b>
                    </Option>
                ))}
            </Select>
        ),
    },
];

export const UserUpdateBankAccountForm = () => {
    const [form] = Form.useForm();
    const [updateBankAcount, { isLoading }] = useUpdateBankAccountMutation();
    const { notify } = useNotification();

    const onFinish = async () => {
        const values = form.getFieldsValue();
        const { accountNumber, accountHolderName, bankName } = values;
        const res = await updateBankAcount({
            accountNumber,
            accountHolderName,
            bankName,
        });

        if (res.error) {
            notify({
                message: 'Cập nhật tài thất bại',
                description:
                    'Đã có lỗi xảy ra khi cập nhật tài khoản ngân hàng.',
                notiType: 'error',
            });
        } else {
            notify({
                message: 'Cập nhật tài thành công',
                description: 'Tài khoản ngân hàng đã được cập nhật thành công.',
            });
        }
    };

    return (
        <Form
            form={form}
            name="bank-account"
            labelCol={{ span: 12 }}
            labelAlign="left"
            wrapperCol={{ span: 12 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            variant="borderless"
            colon={false}
        >
            {UpdateBankAccountFormItems.map((item) => (
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
                text="Cập nhật tài khoản ngân hàng"
                isLoading={isLoading}
            />
        </Form>
    );
};

export { UserUpdateInfoForm, UserUpdatePasswordForm };
