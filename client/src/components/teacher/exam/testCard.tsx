import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import {
    ClockCircleOutlined,
    DownloadOutlined,
    MoreOutlined,
    DownOutlined,
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import bookIcon from '@public/teacher/book.svg';

interface TestCardProps {
    title: string;
    duration: number;
    attempts: number;
}

const TestCard: React.FC<TestCardProps> = ({ title, duration, attempts }) => {
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <span className="flex cursor-pointer items-center gap-2 font-semibold hover:bg-gray-100">
                    <EditOutlined />
                    Sửa đề thi
                </span>
            ),
        },
        {
            key: '2',
            label: (
                <span className="flex cursor-pointer items-center gap-2 font-semibold text-red-500 hover:bg-gray-100">
                    <DeleteOutlined />
                    Xoá đề thi
                </span>
            ),
        },
    ];

    return (
        <div className="flex items-center gap-3 rounded-xl bg-blue-100 p-5 hover:shadow-md">
            <Image src={bookIcon} alt="Book Icon" className="h-20 w-20" />

            <div className="w-44 flex-1">
                <div className="overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold">
                    {title}
                </div>
                <div className="mt-1 flex items-center justify-between text-sm text-gray-600">
                    <ClockCircleOutlined className="mr-1 text-black" />{' '}
                    {duration} phút
                    <DownloadOutlined className="mr-1 text-black" /> {attempts}{' '}
                    lượt làm
                </div>
                <div className="mt-2 flex justify-between">
                    <Button
                        type="primary"
                        shape="round"
                        className="flex items-center bg-[#2C2F5E] !p-2 !text-sm"
                    >
                        Xem bài test <DownOutlined className="ml-1" />
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

export default TestCard;
