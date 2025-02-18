'use client';
import Image from 'next/image';
import { Card, Flex, Form, FormProps, Input, Space } from 'antd';
import Banner from '@/app/(user)/(study)/_ui/banner';
import { BannerTitle } from '@/ui/common/title';
import profileTiawai from '@public/profile-tiawai.webp';
import UserCard from '@/ui/profile/user-card';
import InfoCard from '@/ui/profile/info-card';
import { useEffect, useState } from 'react';
import { useGetMyProfileQuery, useGetMyStatisticsQuery } from '@/services/user';

const testInfo = {
    title: 'Thông tin của bạn',
    gender: 'Nam',
    phone: '0123456789',
    birthday: new Date('2000-01-01').toLocaleDateString(),
    address: 'Hà Nội',
};

const tiawaiInfo = {
    title: 'Thông tin học tập',
};

const formItems = [
    {
        label: <span className="font-roboto text-lg">Mật khẩu cũ</span>,
        name: 'oldPassword',
        rules: [
            {
                required: true,
                message: 'Vui lòng nhập mật khẩu cũ!',
            },
        ],
        component: (
            <Input.Password
                className="font-roboto font-bold"
                placeholder="Nhập mật khẩu cũ"
            />
        ),
    },
    {
        label: <span className="font-roboto text-lg">Mật khẩu mới</span>,
        name: 'newPassword',
        rules: [
            {
                required: true,
                message: 'Vui lòng nhập mật khẩu mới!',
            },
        ],
        component: (
            <Input.Password
                className="font-roboto font-bold"
                placeholder="Nhập mật khẩu mới"
            />
        ),
    },
    {
        label: <span className="font-roboto text-lg">Xác nhận mật khẩu</span>,
        name: 'confirmPassword',
        rules: [
            {
                required: true,
                message: 'Vui lòng xác nhận mật khẩu!',
            },
        ],
        component: (
            <Input.Password
                className="font-roboto font-bold"
                placeholder="Xác nhận mật khẩu"
            />
        ),
    },
];

type FieldType = {
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const Profile = () => {
    const [isUpdatingInfo, setIsUpdatingInfo] = useState(false);
    const { data: userInfo, isLoading } = useGetMyProfileQuery({});
    const { data: userStat, isLoading: isLoadingStat } =
        useGetMyStatisticsQuery({});

    const startUpdateInfo = () => {
        setIsUpdatingInfo(true);
    };

    const stopUpdateInfo = () => {
        setIsUpdatingInfo(false);
    };

    useEffect(() => {
        console.log('isUpdatingInfo', isUpdatingInfo);
    }, [isUpdatingInfo]);

    const onFinish = (values: FieldType) => {
        console.log('Success:', values);
    };
    if (isLoading || isLoadingStat) return null;
    const user = {
        name: userInfo?.username || '',
        email: userInfo?.email || '',
        ...testInfo,
    };
    const stats = {
        examTaken: userStat?.examPracticeCount || 0,
        vocabularies: userStat?.vocabsPracticeCount || 0,
        practiceTaken: userStat?.specializedExamPracticeCount || 0,
        ...tiawaiInfo,
    };

    return (
        <div className="mb-9 select-none">
            <Banner className="mb-28">
                <Space size={64}>
                    <Image src={profileTiawai} alt="profile tiawai" priority />
                    <BannerTitle>Thông tin cá nhân</BannerTitle>
                </Space>
            </Banner>
            <Flex justify="center" gap={100}>
                <UserCard
                    name={user.name}
                    email={user.email}
                    startUpdateInfo={startUpdateInfo}
                    stopUpdateInfo={stopUpdateInfo}
                    isUpdatingInfo={isUpdatingInfo}
                />
                <Flex vertical gap={50}>
                    <InfoCard
                        {...user}
                        title={
                            isUpdatingInfo ? 'Chỉnh sửa thông tin' : user.title
                        }
                        isUpdatingInfo={isUpdatingInfo}
                    />
                    {!isUpdatingInfo ? (
                        <InfoCard {...stats} />
                    ) : (
                        <Card
                            className="font-roboto"
                            style={{
                                width: 700,
                                borderRadius: '50px',
                                borderWidth: '2px',
                                borderColor: 'black',
                                paddingLeft: '16px',
                                paddingRight: '16px',
                                paddingTop: '10px',
                            }}
                            bordered={true}
                        >
                            <div className="mb-8">
                                <span className="rounded-full bg-[#DAE3E9] px-16 py-[6px] text-lg font-bold">
                                    Cập nhật mật khẩu
                                </span>
                            </div>
                            <Form
                                name="password"
                                labelCol={{ span: 12 }}
                                labelAlign="left"
                                wrapperCol={{ span: 12 }}
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                                variant="borderless"
                                colon={false}
                            >
                                {formItems.map((item) => (
                                    <Form.Item
                                        key={item.name}
                                        name={item.name}
                                        label={item.label}
                                        rules={item.rules}
                                    >
                                        {item.component}
                                    </Form.Item>
                                ))}
                                <Flex align="center" justify="center">
                                    <button className="rounded-full bg-[#E9DAE9] px-12 py-[3px] text-lg font-bold">
                                        Cập nhật thông tin
                                    </button>
                                </Flex>
                            </Form>
                        </Card>
                    )}
                </Flex>
            </Flex>
        </div>
    );
};

export default Profile;
