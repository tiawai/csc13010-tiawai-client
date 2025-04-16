'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Col, Divider, Row, Space, Tabs, Radio } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
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

    // const [mode, setMode] = useState<'1' | '2'>('1');
    // const onChange = (e: RadioChangeEvent) => {
    //     setMode(e.target.value);
    // };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Card className="!shadow-xl">
            <Space direction="vertical" style={{ width: '100%' }}>
                <Title level={4}>
                    {test.title}{' '}
                    <CheckCircleOutlined style={{ color: 'green' }} />
                </Title>

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
            </Space>
        </Card>
    );
}
