import Link from 'next/link';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import Button from 'antd/es/button';
import { FormButtonGradientStyle } from '../styles/form-ui-style';
import { RightOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import formBackground from '@public/form-bg.png';

const FormTitle = ({ title }: { title: string }) => (
    <Title
        className="!font-instrument"
        style={{ textAlign: 'center', fontWeight: 400 }}
    >
        {title}
    </Title>
);

const FormDescription = ({
    description,
    textAlign = 'center',
}: {
    description: string;
    textAlign?: 'center' | 'left' | 'right';
}) => <Paragraph style={{ textAlign }}>{description}</Paragraph>;

const FormNavigation = ({
    href,
    textHref,
    description,
}: {
    href: string;
    textHref: string;
    description: string;
}) => {
    return (
        <Paragraph style={{ textAlign: 'center' }}>
            {description}{' '}
            <Link href={href}>
                <strong>{textHref}</strong>
            </Link>
        </Paragraph>
    );
};

const FormButtonGradient = ({ loading }: { loading?: boolean }) => {
    const { styles } = FormButtonGradientStyle();
    return (
        <Button
            className={`${styles.linearGradientButton} !m-auto !flex !min-h-14 !min-w-14 !items-center`}
            type="primary"
            shape="circle"
            htmlType="submit"
            loading={loading}
            icon={
                <RightOutlined className="aspect-square min-h-max min-w-max text-3xl" />
            }
        />
    );
};

export const FormLayout = ({
    className,
    showBackground = true,
    children,
}: {
    className?: string;
    showBackground?: boolean;
    children: React.ReactNode;
}) => {
    return (
        <div
            className={twMerge(
                'relative m-auto flex min-h-[600px] w-full max-w-3xl justify-between overflow-clip rounded-3xl p-12 shadow-xl',
                className || 'bg-white',
            )}
        >
            {showBackground && (
                <Image
                    className="flex-[1] -translate-x-12 -translate-y-12 object-contain"
                    src={formBackground}
                    alt="circle1"
                />
            )}
            <div className="flex-[1.4] content-center">{children}</div>
        </div>
    );
};

export { FormNavigation, FormTitle, FormDescription, FormButtonGradient };
