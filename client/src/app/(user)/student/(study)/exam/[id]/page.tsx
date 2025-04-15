'use client';
import { useState, useEffect } from 'react';
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
    Result,
} from 'antd';
import type { RadioChangeEvent } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { ExamHistory } from '@/ui/exam';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hook';
import { fetchExamById } from '@/lib/slices/test';
import { Loading } from '@/components/common/loading';
import Title from 'antd/es/typography/Title';

export default function ExamPage({ params }: { params: { id: number } }) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { exam, loading, error } = useAppSelector((state) => state.exam);

    useEffect(() => {
        dispatch(fetchExamById(params.id));
    }, [dispatch, params.id]);

    const [mode, setMode] = useState<'1' | '2'>('1');

    const onChange = (e: RadioChangeEvent) => {
        setMode(e.target.value);
    };

    if (loading) {
        return <Loading />;
    }

    const ExamNotFound = () => {
        return (
            <Result
                status="404"
                title="404"
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
    };

    if (error) {
        return <ExamNotFound />;
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
