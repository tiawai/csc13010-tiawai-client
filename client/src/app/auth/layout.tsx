import { AuthLayoutBackground } from '@/components/auth/styles/auth-layout-background';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="auth__layout relative min-h-screen max-w-[100vw] content-center overflow-hidden">
            <AuthLayoutBackground />
            {children}
        </div>
    );
}
