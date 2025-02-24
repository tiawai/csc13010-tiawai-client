// import dynamic from "next/dynamic";
import { Suspense } from 'react';
import Header from '@/ui/common/header';
import ChatButton from '@/ui/chat-button';

export default async function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main>
            <Header />

            <Suspense>
                <ChatButton />
            </Suspense>

            <div className="m-auto !mt-28 max-w-[1320px] px-4">
                <Suspense>{children}</Suspense>
            </div>
        </main>
    );
}
