import { Button, Card } from 'antd';
import { twMerge } from 'tailwind-merge';

const CardBorder = ({
    width = '100%',
    className,
    loading = false,
    children,
}: {
    width?: number | string;
    className?: string;
    loading?: boolean;
    children: React.ReactNode;
}) => (
    <Card
        loading={loading}
        style={{
            width: width,
            height: 'fit-content',
            borderRadius: '50px',
            borderWidth: '1px',
            borderColor: 'black',
            padding: '20px 16px',
        }}
        className={twMerge(className)}
        bordered={true}
    >
        {children}
    </Card>
);

const CardTitle = ({ title }: { title: string }) => (
    <div className="mb-8">
        <p className="m-auto w-max rounded-full bg-[#DAE3E9] px-12 py-[6px] text-lg font-bold">
            {title}
        </p>
    </div>
);

const CardButton = ({
    className,
    text,
    isLoading,
    onClick,
}: {
    className?: string;
    text: string;
    isLoading?: boolean;
    onClick?: () => void;
}) => (
    <Button
        className={twMerge(
            '!block !bg-[#E9DAE9] !px-12 !text-lg !font-bold',
            className,
        )}
        onClick={onClick}
        loading={isLoading}
        shape="round"
        size="large"
        htmlType="submit"
    >
        {text}
    </Button>
);

export { CardBorder, CardTitle, CardButton };
