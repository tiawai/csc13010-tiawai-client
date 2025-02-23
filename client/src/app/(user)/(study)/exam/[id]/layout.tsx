/* eslint-disable */

import ExamProvider from '@/context/exam';

export default async function ExamLayout({
    params,
    children,
}: {
    params: Promise<{ id: string }>;
    children: React.ReactNode;
}) {
    return (
        <ExamProvider id={Number((await params).id)}>{children}</ExamProvider>
    );
}
