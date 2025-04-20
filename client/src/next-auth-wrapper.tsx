'use client';
import { useState, useEffect, useCallback, memo } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hook';
import { Alert, Modal } from 'antd';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { setAuthState } from '@/lib/slices/auth.slice';
import { useSignOutMutation } from './services/auth.service';
import { signOut } from 'next-auth/react';
import { Loading } from './components/common/loading';
import React from 'react';

const NextAuthWrapper = memo(({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();
    const [signOutClient] = useSignOutMutation();
    const { data: session, status } = useSession();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const accessToken = useAppSelector((state) => state.auth.accessToken);

    const handleSignOut = useCallback(async () => {
        setIsOpenModal(true);
        await signOut({ redirect: false });
        await signOutClient();
    }, [signOutClient]);

    useEffect(() => {
        if (status === 'loading') return;
        if (session) {
            if (session?.error === 'RefreshTokenError') {
                handleSignOut();
            } else {
                dispatch(
                    setAuthState({
                        user: session.user,
                        accessToken: session.accessToken,
                        refreshToken: session.refreshToken,
                    }),
                );
            }
        }
    }, [session, status, dispatch, handleSignOut]);

    return (
        <>
            {status === 'loading' ||
            (session !== null && (!session?.user || !accessToken)) ? (
                <Loading className="h-lvh min-h-lvh" />
            ) : (
                <>{children}</>
            )}
            <SessionModal
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
            />
        </>
    );
});

NextAuthWrapper.displayName = 'NextAuthWrapper';
export default NextAuthWrapper;

export const SessionModal = ({
    isOpenModal,
    setIsOpenModal,
}: {
    isOpenModal: boolean;
    setIsOpenModal: (isOpen: boolean) => void;
}) => {
    const router = useRouter();
    const handleRedirect = () => {
        setIsOpenModal(false);
        router.push('/auth/sign-in');
    };

    return (
        <Modal
            title="Phiên làm việc đã hết hạn"
            open={isOpenModal}
            onOk={handleRedirect}
            cancelButtonProps={{ style: { display: 'none' } }}
            okType="primary"
            okText="Đăng nhập lại"
            closable={false}
            maskClosable={false}
        >
            <Alert
                message="Phiên đăng nhập của bạn đã hết hạn"
                description="Bạn cần đăng nhập lại để tiếp tục với tiawai."
                type="warning"
                showIcon
            />
        </Modal>
    );
};
