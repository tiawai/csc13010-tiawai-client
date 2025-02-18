import Header from "@/ui/common/header";
import ChatButton from "@/ui/chat-button";

export default function Userlayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="m-auto max-w-[1440px] items-center space-y-12 p-4">
            <Header />
            <ChatButton />
            <div className="m-auto !mt-20 max-w-[1320px]">{children}</div>
        </div>
    );
}
