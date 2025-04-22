'use client';
import { useState } from 'react';
import { Navigation } from '@/components/common/navigation';
import { UserCard, UserInfoCard } from '@/components/profile/user-card';
import { UserInfoDisplay } from '@/components/profile/user-info-display';
import {
    UserUpdateBankAccountForm,
    UserUpdateInfoForm,
    UserUpdatePasswordForm,
} from '@/components/profile/user-info-update';
import {
    useGetMyProfileQuery,
    useGetUserStatisticsQuery,
} from '@/services/user.service';
import { Loading } from '@/components/common/loading';
import { Role } from '@/types/user.type';
import { useAppSelector } from '@/lib/hooks/hook';
import { useGetBankAccountQuery } from '@/services/payment.service';

export default function ProfilePage() {
    const { data, isLoading: isUserInfoLoading } = useGetMyProfileQuery();

    const { data: bankAccount, isLoading: isBankAccountLoading } =
        useGetBankAccountQuery();

    const { data: userStatistic = {}, isLoading: isStatisticLoading } =
        useGetUserStatisticsQuery();

    const [navigationIndex, setNavigationIndex] = useState<number>(0);
    const userRole = useAppSelector((state) => state.auth.user.role);

    if (isUserInfoLoading || isBankAccountLoading || isStatisticLoading) {
        return <Loading />;
    }

    const userInfo = {
        username: data?.username || 'Tiawai',
        email: data?.email || '',
        gender: data?.gender || 'Chưa cập nhật',
        phone: data?.phone || 'Chưa cập nhật',
        birthdate: data?.birthdate
            ? new Date(data?.birthdate).toLocaleDateString('vi-VN')
            : 'Chưa cập nhật',
        address: data?.address || 'Chưa cập nhật',
    };

    const navigationItems = [
        {
            text: 'Thông tin của bạn',
            content: (
                <>
                    <UserInfoCard title="Thông tin của bạn">
                        <UserInfoDisplay props={userInfo} />
                    </UserInfoCard>
                    {userRole === Role.STUDENT && (
                        <UserInfoCard title="Thông tin học tại tiawai">
                            <UserInfoDisplay props={userStatistic} />
                        </UserInfoCard>
                    )}
                    {userRole === Role.TEACHER && (
                        <UserInfoCard title="Thông tin ngân hàng">
                            <UserInfoDisplay
                                props={{
                                    accountNumber: bankAccount?.accountNumber,
                                    accountHolderName:
                                        bankAccount?.accountHolderName,
                                    bankName: bankAccount?.bankName,
                                }}
                            />
                        </UserInfoCard>
                    )}
                </>
            ),
        },
        {
            text: 'Chỉnh sửa thông tin',
            content: (
                <>
                    <UserInfoCard title="Chỉnh sửa thông tin">
                        <UserUpdateInfoForm props={userInfo} />
                    </UserInfoCard>
                    <UserInfoCard title="Cập nhật mật khẩu">
                        <UserUpdatePasswordForm />
                    </UserInfoCard>
                    {userRole === Role.TEACHER && (
                        <UserInfoCard title="Cập nhật tài khoản ngân hàng">
                            <UserUpdateBankAccountForm />
                        </UserInfoCard>
                    )}
                </>
            ),
        },
    ];

    return (
        <div className="flex gap-12">
            <UserCard
                name={userInfo?.username || ''}
                email={userInfo?.email || ''}
                avatar={data?.profileImage}
                hideUpload={false}
            >
                <Navigation
                    navigationItems={navigationItems.map((item) => item.text)}
                    currentItem={navigationIndex}
                    onNavigationChange={setNavigationIndex}
                />
            </UserCard>
            <div className="flex flex-1 flex-col gap-12">
                {navigationItems[navigationIndex].content}
            </div>
        </div>
    );
}
