'use client';
import { Row, Col, Input, Button, Form, Select, Modal, Alert } from 'antd';
import { useCreatePracticeTestMutation } from '@/services/test.service';
import { Category, TestType } from '@/types/test.type';
import { useNotification } from '@/lib/hooks/use-notification';
import { useCreateNationalTestClassroomMutation } from '@/services/classroom.service';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
    useCreatePaymentAIMutation,
    useCanUseAilQuery,
    useDeletePaymentAIMutation,
} from '@/services/payment.service';
import { useRouter } from 'next/navigation';

const CreateExamByAI = () => {
    const router = useRouter();
    const params = useParams();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [createPracticeTest] = useCreatePracticeTestMutation();
    const [createNationalTest] = useCreateNationalTestClassroomMutation();
    const { notify } = useNotification();
    const {
        data: canUseAI,
        isLoading: isLoadingCanUse,
        refetch,
    } = useCanUseAilQuery();
    const [createPaymentAI, { isLoading: isLoadingCreatePayment }] =
        useCreatePaymentAIMutation();
    const [deletePaymentAI] = useDeletePaymentAIMutation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        if (canUseAI || isLoadingCanUse) {
            setIsModalOpen(false);
        } else {
            setIsModalOpen(true);
        }
    }, [canUseAI]);

    const handleOk = async () => {
        const res = await createPaymentAI();
        if (res.error) {
            notify({
                message: 'Thanh toán thất bại',
                description: 'Có lỗi xảy ra khi tạo thanh toán.',
                notiType: 'error',
            });
        } else {
            notify({
                message: 'Tạo thanh toán thành công',
                description: 'Đang chuyển hướng đến trang thanh toán.',
            });
            setIsModalOpen(false);
            router.push(res?.data?.paymentLink ?? '');
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        router.back();
    };

    const onFinish = async () => {
        setIsLoading(true);
        const values = form.getFieldsValue();
        try {
            const res = await createPracticeTest(values.category);
            if (res.error) {
                throw new Error('Có lỗi xảy ra khi tạo đề.');
            }

            const test = await createNationalTest({
                classroomId: (params.id as string) || '',
                test: {
                    title: values.title,
                    type: TestType.ASSIGNMENT,
                    startDate: values.startDate,
                    endDate: values.endDate,
                    totalQuestions: res.data.length,
                    timeLength: Number(values.timeLength),
                },
                questions: res.data,
            });

            if (test.error) {
                throw new Error('Có lỗi xảy ra khi tạo đề.');
            }

            notify({
                message: 'Tạo đề thành công',
                description: 'Đề đã được tạo thành công.',
            });

            await deletePaymentAI();
            await refetch();
            router.push(`/teacher/classroom/${params.id}`);
        } catch (error) {
            console.log(error);
            notify({
                message: 'Tạo đề thất bại',
                description: 'Có lỗi xảy ra khi tạo đề.',
                notiType: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Modal
                title="Thông báo thanh toán"
                closeIcon={false}
                maskClosable={false}
                open={isModalOpen}
                onOk={handleOk}
                okText="Thanh toán"
                onCancel={handleCancel}
                cancelText="Đóng"
                confirmLoading={isLoadingCreatePayment}
            >
                <Alert
                    message="Bạn cần thanh toán để sử dụng tính năng này."
                    type="info"
                    showIcon
                    closable={false}
                />
                Nhấn thanh toán để sử dụng tính năng này.
            </Modal>

            <div className="flex flex-col items-center">
                <h1 className="mb-16 text-center text-3xl font-bold">
                    Tạo Đề Với AI
                </h1>

                <div className="w-[900px] rounded-2xl border border-black p-12 shadow-lg">
                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <Form.Item
                                    label="Title"
                                    name="title"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tên đề',
                                        },
                                    ]}
                                >
                                    <Input className="mt-1 !rounded-full !bg-purple-100" />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    label="Category"
                                    name="category"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn thể loại',
                                        },
                                    ]}
                                >
                                    <Select
                                        className="mt-1 !rounded-full !bg-purple-100"
                                        options={[
                                            {
                                                label: 'Phát âm',
                                                value: Category.PHAT_AM,
                                            },
                                            {
                                                label: 'Trọng âm',
                                                value: Category.TRONG_AM,
                                            },
                                            {
                                                label: 'Tình huống giao tiếp',
                                                value: Category.TINH_HUONG_GIAO_TIEP,
                                            },
                                            {
                                                label: 'Ngữ pháp',
                                                value: Category.NGU_PHAP,
                                            },
                                            {
                                                label: 'Kiểm tra từ vựng',
                                                value: Category.KIEM_TRA_TU_VUNG,
                                            },
                                            {
                                                label: 'Tìm lỗi sai',
                                                value: Category.TIM_LOI_SAI,
                                            },
                                            {
                                                label: 'Viết lại câu và kết hợp câu',
                                                value: Category.VIET_LAI_CAU,
                                            },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    label="Thời gian làm bài"
                                    name="timeLength"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng nhập thời gian làm bài',
                                        },
                                    ]}
                                >
                                    <Input
                                        className="mt-1 !rounded-full !bg-purple-100"
                                        type="number"
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    label="Ngày bắt đầu"
                                    name="startDate"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng nhập ngày bắt đầu',
                                        },
                                    ]}
                                >
                                    <Input
                                        className="mt-1 !rounded-full !bg-purple-100"
                                        type="date"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Ngày kết thúc"
                                    name="endDate"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng nhập ngày kết thúc',
                                        },
                                    ]}
                                >
                                    <Input
                                        className="mt-1 !rounded-full !bg-purple-100"
                                        type="date"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <div className="mt-6 flex justify-end space-x-4">
                            <Button className="!rounded-full !bg-red-400 !px-6 !py-2 !text-white">
                                Huỷ
                            </Button>
                            <Button
                                htmlType="submit"
                                className="!rounded-full !bg-[#DAE3E9] !px-6 !py-2 !font-semibold"
                                loading={isLoading}
                            >
                                Tạo đề với AI
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default CreateExamByAI;
