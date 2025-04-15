'use client';
import { useSession } from 'next-auth/react';
import { Loading } from '@/components/common/loading';
import { useAppSelector } from '@/lib/hooks/hook';

export const SessionWrapper = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const user = session?.user;
    const accessToken = useAppSelector((state) => state.auth.accessToken);

    return (
        <>
            {status === 'loading' ||
            (session !== null && (!user || !accessToken)) ? (
                <Loading />
            ) : (
                <>{children}</>
            )}
        </>
    );
};
