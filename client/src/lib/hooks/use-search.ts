'use client';
import { useState } from 'react';

export const useSearch = <T>(
    data: T[],
    searchFn: (item: T, query: string) => boolean,
) => {
    const [searchText, setSearchText] = useState<string>('');

    const filteredData =
        data?.filter((item) => searchFn(item, searchText)) || [];

    const handleSearch = (value: string) => {
        setSearchText(value);
    };

    return {
        searchText,
        filteredData,
        handleSearch,
    };
};
