'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Button,
    Card,
    Col,
    Divider,
    Row,
    Space,
    Tabs,
    Radio,
    Modal,
    Form,
    Input,
    Tooltip,
} from 'antd';
import { CheckCircleOutlined, FlagOutlined } from '@ant-design/icons';
import { TestHistory } from '@/components/test/test-history';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hook';
import { useGetTestByIdQuery } from '@/services/test.service';
import { Loading } from '@/components/common/loading';
import { setTest } from '@/lib/slices/test.slice';
import Title from 'antd/es/typography/Title';

export default function TestPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { refetch, data, isLoading } = useGetTestByIdQuery(params.id);
    const { test } = useAppSelector((state) => state.test);
    const [isReportModalVisible, setIsReportModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        if (data) {
            dispatch(
                setTest({
                    test: data.test,
                    questions: [...data.questions].sort((a, b) => {
                        return a.questionOrder - b.questionOrder;
                    }),
                }),
            );
        }
    }, [dispatch, data]);

    useEffect(() => {
        refetch();
    }, [refetch, params.id]);

    const showReportModal = () => {
        setIsReportModalVisible(true);
    };

    const handleReportCancel = () => {
        setIsReportModalVisible(false);
        form.resetFields();
    };

    const handleReportSubmit = () => {
        form.validateFields().then((values) => {
            console.log('Report submitted:', values);

            // api call

            setIsReportModalVisible(false);
            form.resetFields();
        });
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Card className="!shadow-xl">
            <Space direction="vertical" style={{ width: '100%' }}>
                <div className="flex items-center justify-between">
                    <Title level={4} style={{ marginBottom: 0 }}>
                        {test.title}{' '}
                        <CheckCircleOutlined style={{ color: 'green' }} />
                    </Title>
                    <Tooltip title="Báo cáo đề thi">
                        <Button
                            icon={<FlagOutlined />}
                            onClick={showReportModal}
                            danger
                            type="text"
                            size="large"
                        >
                            Báo cáo
                        </Button>
                    </Tooltip>
                </div>

                <Radio.Group
                    size="large"
                    // value={mode}
                    // onChange={onChange}
                    style={{ marginBottom: 16 }}
                >
                    <Radio.Button value="1">Thông tin đề thi</Radio.Button>
                </Radio.Group>

                <Title level={5}>
                    Thời gian làm bài: {test.timeLength} phút
                </Title>

                <Title level={5}>Đã có {test.timeLength} lượt làm đề này</Title>

                <Divider />

                <TestHistory id={params.id} />

                <Tabs
                    size="large"
                    defaultActiveKey="1"
                    items={[
                        {
                            key: '1',
                            label: 'Làm full test',
                            children: (
                                <Row gutter={[16, 16]}>
                                    <Col span={24}>
                                        <Card className="!border-[#faad14] !bg-[#fff7e6]">
                                            <Title
                                                className="!m-0"
                                                type="warning"
                                                level={5}
                                            >
                                                Sẵn sàng để bắt đầu làm full
                                                test? Để đạt được kết quả tốt
                                                nhất, bạn cần dành ra{' '}
                                                {test?.timeLength} phút cho bài
                                                test này.
                                            </Title>
                                        </Card>
                                    </Col>

                                    <Col>
                                        <Button
                                            type="primary"
                                            shape="round"
                                            size="large"
                                            onClick={() =>
                                                router.push(
                                                    `${params.id}/start`,
                                                )
                                            }
                                        >
                                            Bắt đầu thi
                                        </Button>
                                    </Col>
                                </Row>
                            ),
                        },
                    ]}
                ></Tabs>

                <Modal
                    title="Báo cáo đề thi"
                    open={isReportModalVisible}
                    onCancel={handleReportCancel}
                    footer={[
                        <Button key="cancel" onClick={handleReportCancel}>
                            Hủy
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            onClick={handleReportSubmit}
                        >
                            Gửi báo cáo
                        </Button>,
                    ]}
                >
                    <Form form={form}>
                        <Form.Item
                            name="reason"
                            label="Lý do báo cáo"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập lý do báo cáo!',
                                },
                            ]}
                        >
                            <Input.TextArea
                                rows={4}
                                placeholder="Nhập lý do báo cáo đề thi này..."
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </Space>
        </Card>
    );
}
