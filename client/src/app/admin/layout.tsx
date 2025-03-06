import Header from '@/ui/components/header';

export default function Userlayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="m-auto max-w-[1440px] items-center space-y-12 p-4">
            <Header />
            <div className="m-auto !mt-20 max-w-[1320px]">{children}</div>
        </div>
    );
}
