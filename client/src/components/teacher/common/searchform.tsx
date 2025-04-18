'use client';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface SearchFormProps {
    onSearch: (value: string) => void;
    title?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({
    onSearch,
    title = 'Tìm kiếm',
}) => {
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
    };

    return (
        <Input
            placeholder={title}
            className="-right-1 !mb-8 !w-[35rem] !rounded-full !border-2 !border-black"
            prefix={<SearchOutlined />}
            onChange={handleSearch}
        />
    );
};

export default SearchForm;
