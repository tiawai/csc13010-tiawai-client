'use client';
import { Suspense } from 'react';
import Header, { HeaderMenu } from '@/components/common/header';
import { SessionWrapper } from '@/components/common/wrapper';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="h-lvh max-h-lvh overflow-hidden">
                <SessionWrapper>
                    <Header />
                    <div className="flex h-full px-4 pb-4 pt-24">
                        <HeaderMenu />
                        <Suspense>
                            <main className="mx-auto max-h-full max-w-[1320px] grow overflow-y-auto px-4">
                                {children}
                            </main>
                        </Suspense>
                    </div>
                </SessionWrapper>
            </div>
        </>
    );
}
