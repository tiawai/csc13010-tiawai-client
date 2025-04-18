import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { twJoin } from 'tailwind-merge';

const FindClassInput = ({
    className,
    onSearch,
}: {
    className?: string;
    onSearch: (value: string) => void;
}) => (
    <Input
        prefix={<SearchOutlined />}
        placeholder="Tìm kiếm lớp học"
        className={twJoin(
            'self-center rounded-[40px] border border-black px-4 py-2 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]',
            className,
        )}
        style={{
            fontSize: '18px',
        }}
        onChange={(e) => onSearch(e.target.value)}
    />
);

export default FindClassInput;
