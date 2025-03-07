import { Button, Dropdown } from 'antd';
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Image from 'next/image';
import videoIcon from '@public/teacher/video.svg';

interface LessonCardProps {
    title: string;
}

const LessonCard: React.FC<LessonCardProps> = ({ title }) => {
    const items = [
        {
            key: '1',
            label: (
                <span className="flex cursor-pointer items-center gap-2 font-semibold hover:bg-gray-100">
                    <EditOutlined />
                    Sửa bài học
                </span>
            ),
        },
        {
            key: '2',
            label: (
                <span className="flex cursor-pointer items-center gap-2 font-semibold text-red-500 hover:bg-gray-100">
                    <DeleteOutlined />
                    Xoá bài học
                </span>
            ),
        },
    ];

    return (
        <div className="flex items-center gap-3 rounded-xl bg-pink-100 p-5 hover:shadow-md">
            <Image src={videoIcon} alt="Book Icon" className="h-20 w-20" />

            <div className="w-44 flex-1">
                <div className="overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold">
                    {title}
                </div>

                <div className="mt-2 flex justify-between">
                    <Button
                        type="primary"
                        shape="round"
                        className="flex !p-2 !text-sm"
                    >
                        Xem
                    </Button>

                    <Dropdown
                        menu={{ items }}
                        trigger={['click']}
                        placement="bottomLeft"
                    >
                        <MoreOutlined
                            className="cursor-pointer text-xl"
                            rotate={90}
                        />
                    </Dropdown>
                </div>
            </div>
        </div>
    );
};

export default LessonCard;
