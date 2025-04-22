import { Avatar, Flex, Divider, Button, Upload } from 'antd';
import { CardBorder, CardTitle } from '@/components/common/card';
import { useUploadProfileImageMutation } from '@/services/user.service';
import { useNotification } from '@/lib/hooks/use-notification';
import { UploadOutlined } from '@ant-design/icons';

interface UserCardProps {
    name: string;
    email: string;
    avatar?: string;
    children?: React.ReactNode;
    hideUpload?: boolean;
}

const UserCard = ({
    name,
    email,
    avatar,
    children,
    hideUpload = false,
}: UserCardProps) => {
    const [uploadProfileImage, { isLoading }] = useUploadProfileImageMutation();
    const { notify } = useNotification();

    const handleUpload = async (file: File) => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            await uploadProfileImage(formData).unwrap();
            notify({
                message: 'Cập nhật ảnh hồ sơ thành công',
                description: 'Ảnh hồ sơ đã được cập nhật.',
            });
        } catch (error: unknown) {
            const err = error as Error;
            notify({
                message: 'Cập nhật ảnh hồ sơ thất bại',
                description:
                    err.message ||
                    'Đã xảy ra lỗi trong quá trình cập nhật ảnh hồ sơ.',
                notiType: 'error',
            });
        }
        return false;
    };

    return (
        <CardBorder width={350}>
            <Flex className="font-roboto" align="center" gap={8} vertical>
                <Avatar size={180} src={avatar} />
                {!hideUpload && (
                    <Upload
                        accept="image/*"
                        showUploadList={false}
                        beforeUpload={handleUpload}
                    >
                        <Button
                            type="text"
                            shape="round"
                            className="text-sm text-[#847575]"
                            icon={<UploadOutlined />}
                            loading={isLoading}
                        >
                            Đổi ảnh hồ sơ
                        </Button>
                    </Upload>
                )}
                <UserInfo name={name} email={email} />
                <Divider />
                {children}
            </Flex>
        </CardBorder>
    );
};

const UserInfoCard = ({
    title,
    loading,
    children,
}: {
    title: string;
    loading?: boolean;
    children?: React.ReactNode;
}) => {
    return (
        <CardBorder loading={loading}>
            <CardTitle title={title} />
            {children}
        </CardBorder>
    );
};

const UserInfo = ({ name, email }: { name: string; email: string }) => (
    <>
        <p className="text-3xl font-bold">{name}</p>
        <p className="text-lg text-[#847575]">{email}</p>
    </>
);

export { UserCard, UserInfoCard };
