import { twJoin } from 'tailwind-merge';

const Heading = ({
    children,
    className = '',
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <h1
            className={twJoin(
                'font-roboto text-[4.25rem] font-black leading-[5.75rem]',
                className,
            )}
        >
            {children}
        </h1>
    );
};

export default Heading;
