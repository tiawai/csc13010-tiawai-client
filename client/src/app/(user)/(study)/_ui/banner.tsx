import { Flex } from 'antd';
import { twJoin } from 'tailwind-merge';

const Banner = ({
    children,
    className = '',
}: Readonly<{
    children: React.ReactNode;
    className?: string;
}>) => {
    return (
        <Flex
            align="center"
            justify="center"
            className={twJoin('relative mx-auto rounded-3xl p-8', className)}
        >
            <div className="absolute bottom-0 left-0 right-0 top-0 z-[-1] rounded-2xl bg-gradient-to-br from-[#BAEEF1] to-[#EFDBEE] blur-xl"></div>
            {children}
        </Flex>
    );
};

export default Banner;
