import Image from 'next/image';
import { FormTitle } from '@/components/auth/ui/form';
import { twMerge } from 'tailwind-merge';
import circle1 from '@public/big-generate-btn-icon.svg';
import Title from 'antd/es/typography/Title';

export const FormRole = ({ setRole }: { setRole: (role: number) => void }) => {
    return (
        <>
            <FormTitle title="Bạn là?" />
            <div className="flex justify-center gap-8">
                <FormRoleCard
                    className="bg-tia-platinum"
                    title="Giáo Viên"
                    image={circle1}
                    onClick={() => setRole(0)}
                />
                <FormRoleCard
                    className="bg-tia-azureish-white"
                    title="Học Sinh/Sinh Viên/Người dùng"
                    image={circle1}
                    onClick={() => setRole(1)}
                />
            </div>
        </>
    );
};

const FormRoleCard = ({
    className,
    title,
    image,
    onClick,
}: {
    className?: string;
    title: string;
    image: string;
    onClick: () => void;
}) => {
    return (
        <div
            className={twMerge(
                'flex h-64 w-64 cursor-pointer flex-col justify-end rounded-3xl',
                className,
            )}
            onClick={onClick}
        >
            <Title level={4} style={{ textAlign: 'center' }}>
                {title}
            </Title>
            <Image src={image} alt="circle1" width={225} height={225} />
        </div>
    );
};
