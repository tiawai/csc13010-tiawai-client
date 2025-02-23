import { Avatar, Flex, Divider, Button } from 'antd';
import { CardBorder, CardTitle } from '@/components/common/card-ui';

interface UserCardProps {
    name: string;
    email: string;
    avatar?: string;
    children?: React.ReactNode;
}

const UserCard = ({ name, email, avatar, children }: UserCardProps) => {
    return (
        <CardBorder width={350}>
            <Flex className="font-roboto" align="center" gap={8} vertical>
                <Avatar size={180} src={avatar} />
                <ChangeBackgroundButton />
                <UserInfo name={name} email={email} />
                <Divider />
                {children}
            </Flex>
        </CardBorder>
    );
};

const UserInfoCard = ({
    title,
    children,
}: {
    title: string;
    children?: React.ReactNode;
}) => {
    return (
        <CardBorder>
            <CardTitle title={title} />
            {children}
        </CardBorder>
    );
};

const ChangeBackgroundButton = () => (
    <Button type="text" shape="round" className="text-sm text-[#847575]">
        Đổi hình nền
    </Button>
);

const UserInfo = ({ name, email }: { name: string; email: string }) => (
    <>
        <p className="text-3xl font-bold">{name}</p>
        <p className="text-lg text-[#847575]">{email}</p>
    </>
);

export { UserCard, UserInfoCard };
