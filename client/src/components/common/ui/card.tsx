import { Card } from 'antd';
import { twMerge } from 'tailwind-merge';

const CardBorder = ({
    width = '100%',
    children,
}: {
    width?: number | string;
    children: React.ReactNode;
}) => (
    <Card
        style={{
            width: width,
            height: 'fit-content',
            borderRadius: '50px',
            borderWidth: '1px',
            borderColor: 'black',
            padding: '20px 16px',
        }}
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
    onClick,
}: {
    className?: string;
    text: string;
    onClick: () => void;
}) => (
    <button
        className={twMerge(
            'block rounded-full bg-[#E9DAE9] px-12 py-[3px] text-lg font-bold',
            className,
        )}
        onClick={onClick}
    >
        {text}
    </button>
);

export { CardBorder, CardTitle, CardButton };
