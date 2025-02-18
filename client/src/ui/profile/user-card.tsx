import { Avatar, Card, Flex } from "antd";
import { twMerge } from "tailwind-merge";

interface UserCardProps {
    name: string;
    email: string;
    avatar?: string;
    startUpdateInfo?: () => void;
    stopUpdateInfo?: () => void;
    isUpdatingInfo?: boolean;
}

const UserCard = ({
    name,
    email,
    avatar,
    startUpdateInfo,
    stopUpdateInfo,
    isUpdatingInfo,
}: UserCardProps) => {
    return (
        <Card
            style={{
                width: 350,
                height: "fit-content",
                borderRadius: "50px",
                borderWidth: "2px",
                borderColor: "black",
                paddingLeft: "16px",
                paddingRight: "16px",
                paddingTop: "20px",
                paddingBottom: "20px",
            }}
            bordered={true}
        >
            <Flex align="center" className="font-roboto" vertical gap={10}>
                <Avatar size={180} src={avatar} />
                <button className="text-sm text-[#847575]">Đổi hình nền</button>
                <p className="text-3xl font-bold">{name}</p>
                <p className="text-lg text-[#847575]">{email}</p>
                <div className="-mx-2 mb-2 h-[1px] w-full bg-black"></div>
                <button
                    className={twMerge(
                        "w-full rounded-full transition-all duration-150 hover:scale-105",
                        isUpdatingInfo
                            ? "border-2 border-black py-1"
                            : "bg-[#E9DAE9] py-[6px] font-bold text-[#AF3FAF]",
                    )}
                    onClick={stopUpdateInfo}
                >
                    Thông tin của bạn
                </button>
                <button
                    className={twMerge(
                        "w-full rounded-full transition-all duration-150 hover:scale-105",
                        isUpdatingInfo
                            ? "bg-[#E9DAE9] py-[6px] font-bold text-[#AF3FAF]"
                            : "border-2 border-black py-1",
                    )}
                    onClick={startUpdateInfo}
                >
                    Chỉnh sửa thông tin
                </button>
            </Flex>
        </Card>
    );
};

export default UserCard;
