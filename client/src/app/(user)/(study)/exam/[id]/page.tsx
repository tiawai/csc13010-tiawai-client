'use client';
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import {
    Button,
    Card,
    Col,
    Divider,
    Row,
    Space,
    Tabs,
    Typography,
    Radio,
    Result,
} from 'antd';
import type { RadioChangeEvent } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { ExamHistory } from '@/ui/exam';
import { ExamContext } from '@/context/exam';

const { Title } = Typography;

export default function ExamPage({ params }: { params: { id: number } }) {
    const router = useRouter();
    const exam = useContext(ExamContext);

    const [mode, setMode] = useState<'1' | '2'>('1');

    const onChange = (e: RadioChangeEvent) => {
        setMode(e.target.value);
    };

    if (!exam) {
        return (
            <Result
                status="403"
                title="403"
                subTitle="Đề thi không tồn tại."
                extra={
                    <Button
                        type="primary"
                        shape="round"
                        onClick={() => router.push('/exam')}
                    >
                        Quay lại trang đề thi
                    </Button>
                }
            />
        );
    }

    return (
        <Card className="!shadow-xl">
            <Space direction="vertical" style={{ width: '100%' }}>
                <Title level={4}>
                    {exam?.title}{' '}
                    <CheckCircleOutlined style={{ color: 'green' }} />
                </Title>

                <Radio.Group
                    size="large"
                    value={mode}
                    onChange={onChange}
                    style={{ marginBottom: 16 }}
                >
                    <Radio.Button value="1">Thông tin đề thi</Radio.Button>
                </Radio.Group>

                {mode === '1' && (
                    <>
                        <Title level={5}>
                            Thời gian làm bài: {exam?.duration} phút
                        </Title>
                        <Title level={5}>
                            Đã có {exam?.totalAttempts} lượt làm đề này
                        </Title>

                        <Divider />

                        <ExamHistory id={params.id} />

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
                                                        Sẵn sàng để bắt đầu làm
                                                        full test? Để đạt được
                                                        kết quả tốt nhất, bạn
                                                        cần dành ra{' '}
                                                        {exam?.duration} phút
                                                        cho bài test này.
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
                    </>
                )}
            </Space>
        </Card>
    );
}
