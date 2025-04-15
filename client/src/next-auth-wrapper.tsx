'use client';
import { useState, useEffect, useMemo } from 'react';
import { useAppDispatch } from '@/lib/hooks/hook';
import { Alert, Modal } from 'antd';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { setAuthState } from '@/lib/slices/auth.slice';
import { useSignOutMutation } from './services/auth.service';
import { appApi } from '@/services/config.service';
import { store } from '@/lib/store/store';
import { signOut } from 'next-auth/react';

export default function NextAuthWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const dispatch = useAppDispatch();
    const [signOutClient] = useSignOutMutation();
    const { data: session, status } = useSession();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const handleSignOut = useMemo(() => {
        return async () => {
            setIsOpenModal(true);
            await signOut({ redirect: false });
            await signOutClient();
        };
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
                store.dispatch(appApi.util.invalidateTags(['Auth']));
            }
        }
    }, [dispatch, session, status, handleSignOut]);

    return (
        <>
            {children}
            <SessionModal
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
            />
        </>
    );
}

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
