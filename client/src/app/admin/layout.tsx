import { Suspense } from 'react';
import Header, { HeaderMenu } from '@/components/common/header';

export default async function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="h-lvh max-h-lvh overflow-hidden">
                <Header />
                <div className="flex h-full gap-4 px-4 pb-4 pt-28">
                    <HeaderMenu />
                    <Suspense>
                        <main className="m-auto max-h-full max-w-[1320px] grow overflow-y-scroll">
                            {children}
                        </main>
                    </Suspense>
                </div>
            </div>
        </>
    );
}
