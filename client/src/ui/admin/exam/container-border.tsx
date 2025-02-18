"use client";
export default function ContainerBorder({
    className = "",
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div
            className={`w-full rounded-xl border border-black p-8 ${className}`}
        >
            {children}
        </div>
    );
}
