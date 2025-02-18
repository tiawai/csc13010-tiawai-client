import type { Metadata } from "next";
import { Roboto, Nunito_Sans } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import NextAuthWrapper from "@/next-auth-wrapper";
import ThemeProvider from "./theme";
import StoreProvider from "@/lib/store/store-provider";
import "@/app/globals.css";

const roboto = Roboto({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "700", "900"],
    variable: "--font-roboto",
});

const nunitoSans = Nunito_Sans({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "700"],
    variable: "--font-nunito-sans",
});

export const metadata: Metadata = {
    title: "tiawai",
    description: "Nền tảng luyện thi  THPTQG môn Tiếng Anh cùng với AI",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vn">
            <body
                className={`${roboto.variable} ${nunitoSans.variable} bg-white antialiased`}
            >
                <StoreProvider>
                    <SessionProvider>
                        <NextAuthWrapper>
                            <ThemeProvider>{children}</ThemeProvider>
                        </NextAuthWrapper>
                    </SessionProvider>
                </StoreProvider>
            </body>
        </html>
    );
}
