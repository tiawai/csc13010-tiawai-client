'use client';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface SearchFormProps {
    onSearch: (value: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
    return (
        <Input
            size="large"
            placeholder="Tìm kiếm lớp học"
            prefix={<SearchOutlined />}
            onChange={(e) => onSearch(e.target.value)}
            className="-right-1 mb-8 w-[35rem] rounded-full border-2 border-black"
        />
    );
};

export default SearchForm;
