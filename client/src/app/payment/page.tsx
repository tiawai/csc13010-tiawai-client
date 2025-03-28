'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, Select, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useCreatePaymentMutation } from '@/services/payment';
import { PaymentType, CreatePayment } from '@/types/payment';
import { Classroom } from '@/types/classroom';

const classrooms: Classroom[] = [
    { id: uuidv4(), name: 'Toán nâng cao', price: 10000 },
    { id: uuidv4(), name: 'Lập trình Web', price: 10000 },
    { id: uuidv4(), name: 'Tiếng Anh giao tiếp', price: 10000 },
];

const createMockCreatePayment = (classroom: Classroom): CreatePayment => ({
    // studentId: '2c992942-9359-4dc8-9d9d-c08035dbf4cf',
    type: PaymentType.CLASSROOM,
    amount: classroom.price,
    teacherId: 'd0ed7e3d-d04a-4eb7-8937-d53ba3062f27',
    classroomId: classroom.id,
});

export default function PaymentPage() {
    const router = useRouter();
    const [selectedClass, setSelectedClass] = useState<Classroom | null>(null);
    const [createPayment, { isLoading }] = useCreatePaymentMutation();

    const handlePayment = async () => {
        if (!selectedClass) {
            message.error('Vui lòng chọn lớp học');
            return;
        }

        const res = await createPayment(createMockCreatePayment(selectedClass));

        if (res.error) {
            message.error('Không thể tạo đơn thanh toán');
            return;
        }

        if (res.data.paymentLink) {
            router.push(res.data.paymentLink);
        } else {
            message.error('Không thể tạo đơn thanh toán');
        }
    };

    return (
        <div
            style={{
                maxWidth: 400,
                margin: 'auto',
                padding: 20,
                textAlign: 'center',
            }}
        >
            <h2>Chọn lớp học</h2>
            <Select
                style={{ width: '100%', marginBottom: 20 }}
                placeholder="Chọn lớp"
                onChange={(value) => {
                    const selected = classrooms.find((c) => c.id === value);
                    setSelectedClass(selected || null);
                }}
            >
                {classrooms.map((cls) => (
                    <Select.Option key={cls.id} value={cls.id}>
                        {cls.name} - {cls.price.toLocaleString()} VND
                    </Select.Option>
                ))}
            </Select>
            <Button
                type="primary"
                onClick={handlePayment}
                loading={isLoading}
                disabled={!selectedClass}
            >
                Thanh toán
            </Button>
        </div>
    );
}
