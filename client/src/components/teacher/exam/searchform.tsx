import { SearchOutlined } from '@ant-design/icons';

const SearchForm = () => {
    return (
        <div className="relative -ml-2 mb-6">
            <SearchOutlined className="font-2xl absolute left-4 top-1/2 h-7 w-7 -translate-y-1/2 transform" />
            <input
                type="text"
                placeholder="Search"
                className="w-2/5 rounded-full border-2 border-black p-2 pl-10 focus:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
        </div>
    );
};

export default SearchForm;
