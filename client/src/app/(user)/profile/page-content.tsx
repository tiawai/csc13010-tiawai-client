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
import { useGetMyProfileQuery } from '@/services/user.service';
import { Loading } from '@/components/common/loading';
import { Role } from '@/types/user.type';
import { useAppSelector } from '@/lib/hooks/hook';
import { useGetBankAccountQuery } from '@/services/payment.service';

const userStudyingInfo = {
    examTaken: 0,
    vocabularies: 0,
    practiceTaken: 0,
};

export const PageContent = () => {
    const { data, isLoading } = useGetMyProfileQuery();
    const { data: bankAccount, isLoading: isLoadingBankAccount } =
        useGetBankAccountQuery();
    const [navigationIndex, setNavigationIndex] = useState<number>(0);
    const userRole = useAppSelector((state) => state.auth.user.role);

    if (isLoading || isLoadingBankAccount) return <Loading />;

    const userInfo = {
        name: 'Tiawai',
        email: data?.email || '',
        gender: 'Nam',
        phone: '0123456789',
        birthday: new Date('2000-01-01').toLocaleDateString(),
        address: 'Hà Nội',
    };

    const navigationItems = [
        {
            text: 'Thông tin của bạn',
            content: (
                <>
                    <UserInfoCard title="Thông tin của bạn">
                        <UserInfoDisplay props={userInfo} />
                    </UserInfoCard>
                    <UserInfoCard title="Thông tin học tập">
                        <UserInfoDisplay props={userStudyingInfo} />
                    </UserInfoCard>
                    {userRole === Role.TEACHER && (
                        <UserInfoCard title="Thông tin ngân hàng">
                            <UserInfoDisplay
                                props={{
                                    accountNumber:
                                        bankAccount?.accountNumber || '',
                                    accountHolderName:
                                        bankAccount?.accountHolderName || '',
                                    bankName: bankAccount?.bankName || '',
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
            <UserCard name={userInfo.name} email={userInfo.email}>
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
};
