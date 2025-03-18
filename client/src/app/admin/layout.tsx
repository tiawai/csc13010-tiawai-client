import { Suspense } from 'react';
import Header, { HeaderMenu } from '@/components/common/header';

export default async function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="m-auto !mt-28 min-h-[calc(100vh-300px)] px-4">
                <Header />
                <div className="flex">
                    <HeaderMenu />
                    <Suspense>
                        <main className="m-auto max-w-[1320px] grow">
                            {children}
                        </main>
                    </Suspense>
                </div>
            </div>
        </>
    );
}
