'use client';
import Header from '@/ui/components/header';
import ChatButton from '@/ui/components/chat-button';
import Footer from '@/ui/components/footer';
import { usePathname } from 'next/navigation';
export default function Userlayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const hideFooter =
        pathname.startsWith('/flashcard/') && pathname !== '/flashcard';
    return (
        <div className="relative m-auto items-center px-4 pt-4">
            <Header />
            <ChatButton />
            <div className="m-auto !mt-20 mb-32 max-w-[1320px]">{children}</div>
            {!hideFooter && <Footer />}
        </div>
    );
}
