'use client';
import { Card, Dropdown, MenuProps, Typography } from 'antd';
import {
    UserOutlined,
    DollarOutlined,
    MoreOutlined,
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
const { Title } = Typography;

interface CourseProps {
    title: string;
    image: string;
    star: number;
    rating: number;
    price: string;
    students: string;
    onEdit: () => void;
    onDelete: () => void;
    id: string;
}

const Course: React.FC<CourseProps> = ({
    title,
    image,
    price,
    students,
    onEdit,
    onDelete,
    id,
}) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/teacher/classroom/${id}`);
    };

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        e.domEvent.stopPropagation();

        if (e.key === 'edit') {
            onEdit();
        } else if (e.key === 'delete') {
            onDelete();
        }
    };

    const menuItems: MenuProps['items'] = [
        {
            key: 'edit',
            label: (
                <span className="flex items-center gap-2 font-semibold">
                    <EditOutlined />
                    Sửa lớp
                </span>
            ),
        },
        {
            key: 'delete',
            label: (
                <span className="flex items-center gap-2 font-semibold text-red-500">
                    <DeleteOutlined />
                    Xoá lớp
                </span>
            ),
        },
    ];

    return (
        <Card
            hoverable
            className="cursor-pointer rounded-lg border !bg-[#DAE3E9] shadow-md"
            cover={
                <div className="relative h-[250px] w-full overflow-hidden rounded-t-lg">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                        onClick={handleClick}
                    />
                </div>
            }
            onClick={handleClick}
        >
            <div className="h-[60px] overflow-hidden">
                <Title
                    className="!mb-0 line-clamp-2 uppercase"
                    level={4}
                    ellipsis={{ rows: 2, tooltip: title }}
                >
                    {title}
                </Title>
            </div>
            <div className="my-6 flex items-center justify-around bg-white p-4 text-gray-600">
                <span>
                    <DollarOutlined /> {price}
                </span>
                <span>
                    <UserOutlined /> {students}
                </span>
            </div>

            <div className="flex justify-end">
                <Dropdown
                    menu={{ items: menuItems, onClick: handleMenuClick }}
                    trigger={['click']}
                    placement="bottomLeft"
                >
                    <span
                        className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <MoreOutlined
                            className="cursor-pointer text-2xl"
                            rotate={90}
                        />
                    </span>
                </Dropdown>
            </div>
        </Card>
    );
};

export default Course;
