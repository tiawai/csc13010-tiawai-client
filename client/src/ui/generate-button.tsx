import { Flex } from 'antd';
import Image from 'next/image';
import { twJoin, twMerge } from 'tailwind-merge';
import generateBtnIcon from '@public/generate-btn-icon.svg';
import bigGenerateBtnIcon from '@public/big-generate-btn-icon.svg';

const GenerateButton = ({
    className = '',
    imgStyle = '',
    textStyle = '',
    big = false,
    onClick,
}: Readonly<{
    className?: string;
    imgStyle?: string;
    textStyle?: string;
    big?: boolean;
    onClick?: () => void;
}>) => {
    return (
        <Flex
            onClick={onClick}
            align="center"
            justify="center"
            className={twMerge(
                'cursor-pointer rounded-[1.25rem] bg-[#DBE3F8] pr-5 transition-all duration-300 ease-in-out hover:scale-110',
                className,
            )}
        >
            <Image
                src={big ? bigGenerateBtnIcon : generateBtnIcon}
                alt="generate button icon"
                className={twJoin('self-center', imgStyle)}
            />
            <span
                className={twMerge(
                    'font-roboto text-xl font-medium',
                    textStyle,
                )}
            >
                Tạo ra đề mới bởi Tia
            </span>
        </Flex>
    );
};

export default GenerateButton;
