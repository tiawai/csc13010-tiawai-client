import { usePathname } from 'next/navigation';
import { Suspense } from 'react';
import Header from '@/components/common/header';
import ChatButton from '@/ui/chat-button';

export default async function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const hideFooter =
        pathname.startsWith('/flashcard/') && pathname !== '/flashcard';
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
