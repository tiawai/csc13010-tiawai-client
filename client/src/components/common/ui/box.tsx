import clsx from 'clsx';

export const BoxBorder = ({
    className = '',
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <div
            className={clsx(
                'w-full rounded-xl border border-black p-8',
                className,
            )}
        >
            {children}
        </div>
    );
};
