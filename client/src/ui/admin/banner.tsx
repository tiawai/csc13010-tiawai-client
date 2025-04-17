import { Flex } from 'antd';
import adminTiawai from '@public/admin/admin-tiawai.webp';
import Image from 'next/image';

const Banner = ({ children }: { children: React.ReactNode }) => {
    return (
        <Flex className="relative items-center justify-center">
            <div className="h-[383px] w-[1413px] rounded-full bg-[#ff7426]/10 blur-[127px]" />
            <Flex className="absolute top-0" align="center">
                <Image
                    src={adminTiawai}
                    alt="admin tiawai"
                    width={200}
                    priority
                />
                <div className="mt-16 font-roboto text-5xl font-bold leading-snug">
                    {children}
                </div>
            </Flex>
        </Flex>
    );
};

export default Banner;
