"use client";

import ExamProvider from "@/context/exam";

export default function ExamLayout({
    params,
    children,
}: {
    params: { id: number };
    children: React.ReactNode;
}) {
    return <ExamProvider id={params.id}>{children}</ExamProvider>;
}
