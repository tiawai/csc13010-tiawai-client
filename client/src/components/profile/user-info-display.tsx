import React from 'react';
import { Col, Row } from 'antd';

const keyMap: { [key: string]: string } = {
    name: 'Họ và tên',
    email: 'Email',
    gender: 'Giới tính',
    phone: 'Số điện thoại',
    birthday: 'Ngày sinh',
    address: 'Địa chỉ',
    examTaken: 'Số đề thi đã làm',
    practiceTaken: 'Số chuyên đề đã tạo',
    vocabularies: 'Số từ vựng đã học',

    accountNumber: 'Số tài khoản',
    accountName: 'Tên tài khoản',
    bankName: 'Tên ngân hàng',
};

interface UserInfoDisplayProps {
    [key: string]: string | number | boolean | undefined;
}

const UserInfoDisplay = ({ props }: { props: UserInfoDisplayProps }) => (
    <>
        {Object.entries(props)
            .filter(([key]) => key !== 'title' && key !== 'isUpdatingInfo')
            .map(([key, value]) => (
                <Row key={key} className="mb-4">
                    <Col span={12} className="font-roboto text-lg">
                        {keyMap[key] || key}
                    </Col>
                    <Col span={12} className="font-roboto text-lg font-bold">
                        {value?.toString() || 'Chưa cập nhật'}
                    </Col>
                </Row>
            ))}
    </>
);

export { UserInfoDisplay };
