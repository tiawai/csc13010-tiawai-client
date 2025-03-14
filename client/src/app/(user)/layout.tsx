import { usePathname } from 'next/navigation';
import { Suspense } from 'react';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
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

            <div className="m-auto !mt-28 min-h-[calc(100vh-300px)] max-w-[1320px] px-4">
                <Suspense>{children}</Suspense>
            </div>

            <Footer />
        </main>
    );
}
