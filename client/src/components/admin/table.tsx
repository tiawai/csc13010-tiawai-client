'use client';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export const TableInputSearch = ({
    placeholder,
    value,
    onChange,
}: {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}) => {
    return (
        <Input
            placeholder={placeholder}
            prefix={<SearchOutlined />}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="!w-1/2 !bg-[#E9DAE9] font-roboto text-black"
        />
    );
};
