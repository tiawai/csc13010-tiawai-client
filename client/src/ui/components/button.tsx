import { ArrowRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

const ArrowButton = ({ children }: { children: React.ReactNode }) => (
    <Button
        variant="solid"
        size="large"
        className="group relative self-center rounded-[40px] bg-secondary-button pl-8 pr-14 font-montserrat font-bold capitalize text-white"
    >
        {children}
        <div className="absolute -right-1 top-0 aspect-square h-full content-center justify-center rounded-full bg-[#DAE3E9] transition-all duration-300 group-hover:translate-x-4 group-hover:opacity-0">
            <ArrowRightOutlined className="!text-black" />
        </div>
    </Button>
);

export default ArrowButton;
