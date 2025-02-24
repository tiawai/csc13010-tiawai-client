'use client';
import { useState } from 'react';
import { Navigation } from '@/components/common/navigation-ui';
import { UserCard, UserInfoCard } from '@/components/profile/user-card';
import { UserInfoDisplay } from '@/components/profile/user-info-display';
import {
    UserUpdateInfoForm,
    UserUpdatePasswordForm,
} from '@/components/profile/user-info-update';

const userInfo = {
    name: 'Tiawai',
    email: 'tiawai@gmail.com',
    gender: 'Nam',
    phone: '0123456789',
    birthday: new Date('2000-01-01').toLocaleDateString(),
    address: 'Hà Nội',
};

const userStudyingInfo = {
    examTaken: 0,
    vocabularies: 0,
    practiceTaken: 0,
};

export const PageContent = () => {
    const [navigationIndex, setNavigationIndex] = useState(0);
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
