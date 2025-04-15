'use client';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchForm = () => {
    return (
        <Input
            size="large"
            placeholder="Search"
            prefix={<SearchOutlined />}
            className="-right-1 mb-8 w-[35rem] rounded-full border-2 border-black"
        />
    );
};

export default SearchForm;
