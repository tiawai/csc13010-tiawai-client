import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import ChatButton from '@/ui/chat-button';

export default async function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-lvh min-h-lvh flex-col overflow-x-clip">
            <Header />
            <ChatButton />
            <main className="mx-auto w-full max-w-[1320px] grow px-4 pb-4 pt-28">
                {children}
            </main>
            <Footer />
        </div>
    );
}
