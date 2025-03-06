import Header from '@/ui/components/header';
import ChatButton from '@/ui/components/chat-button';
import Footer from '@/ui/components/footer';
export default function Userlayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative m-auto items-center px-4 pt-4">
            <Header />
            <ChatButton />
            <div className="m-auto !mt-20 mb-32 max-w-[1320px]">{children}</div>
            <Footer />
        </div>
    );
}
