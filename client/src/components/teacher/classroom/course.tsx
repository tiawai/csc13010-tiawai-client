import { Card, Dropdown, MenuProps } from 'antd';
import {
    StarFilled,
    UserOutlined,
    DollarOutlined,
    MoreOutlined,
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import Image, { StaticImageData } from 'next/image';

interface CourseProps {
    title: string;
    image: StaticImageData;
    star: number;
    rating: number;
    price: string;
    students: string;
}

const Course: React.FC<CourseProps> = ({
    title,
    image,
    star,
    rating,
    price,
    students,
}) => {
    // Menu của Dropdown chứa các hành động
    const menuItems: MenuProps['items'] = [
        {
            key: 'edit',
            label: (
                <span className="flex cursor-pointer items-center gap-2 p-2 font-semibold hover:bg-gray-100">
                    <EditOutlined />
                    Sửa lớp
                </span>
            ),
        },
        {
            key: 'delete',
            label: (
                <span className="flex cursor-pointer items-center gap-2 p-2 font-semibold text-red-500 hover:bg-gray-100">
                    <DeleteOutlined />
                    Xoá lớp
                </span>
            ),
        },
    ];

    return (
        <Card
            hoverable
            className="rounded-lg border bg-[#DAE3E9] shadow-md"
            cover={
                <Image
                    src={image}
                    alt={title}
                    width={300}
                    height={200}
                    className="rounded-t-lg"
                />
            }
        >
            <div className="mb-2 flex items-center space-x-1">
                {Array.from({ length: 5 }).map((_, index) => (
                    <StarFilled
                        key={index}
                        className={
                            index < star ? 'text-[#FF3000]' : 'text-gray-300'
                        }
                    />
                ))}
                <span className="ml-2 font-semibold">{rating}k</span>
            </div>

            <h3 className="my-2 text-xl font-bold">{title}</h3>
            <div className="my-6 flex items-center justify-around bg-white p-4 text-gray-600">
                <span>
                    <DollarOutlined /> {price}
                </span>
                <span>
                    <UserOutlined /> {students}
                </span>
            </div>

            {/* Dropdown cho More Options */}
            <div className="flex justify-end">
                <Dropdown
                    menu={{ items: menuItems }}
                    trigger={['click']}
                    placement="bottomLeft"
                >
                    <MoreOutlined
                        className="cursor-pointer text-2xl"
                        rotate={90}
                    />
                </Dropdown>
            </div>
        </Card>
    );
};

export default Course;
