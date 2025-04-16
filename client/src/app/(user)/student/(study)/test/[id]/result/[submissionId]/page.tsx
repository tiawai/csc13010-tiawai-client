'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Button,
    Card,
    Col,
    Row,
    Space,
    Typography,
    Modal,
    Collapse,
    Divider,
    Skeleton,
    Flex,
} from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useGetExamResultQuery } from '@/services/exam';
import { Question } from '@/types/exam';
import { useAppSelector } from '@/lib/hooks/hook';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

export default function ExamResultPage({
    params,
}: {
    params: { id: number; submissionId: string };
}) {
    const router = useRouter();
    const test = useAppSelector((state) => state.test.test);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState<Question>({
        question: '',
        content: '',
        hasParagraph: false,
        choices: { A: '', B: '', C: '', D: '' },
        answer: null,
        correctAnswer: null,
        isCorrect: false,
        points: 0,
        explanation: '',
        isAnswered: false,
    });

    const showModal = (question: Question) => {
        setCurrentQuestion(question);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const { data: result, isLoading } = useGetExamResultQuery({
        id: +params.id,
        submissionId: params.submissionId,
    });

    if (isLoading) {
        return (
            <Space className="!w-full" size={16} direction="vertical">
                <Skeleton.Node className="!h-12 !w-full" active />
                <Flex gap={16}>
                    <Skeleton.Input active />
                    <Skeleton.Input active />
                </Flex>

                <Flex gap={60}>
                    <Skeleton.Node className="!h-60 !w-60" active />
                    <Skeleton.Node className="!h-40 !w-40" active />
                    <Skeleton.Node className="!h-40 !w-40" active />
                    <Skeleton.Node className="!h-40 !w-40" active />
                </Flex>

                <Divider />

                <Skeleton.Input active />
                <Skeleton.Input active />

                <Divider />

                <Skeleton.Input active />
                <Row gutter={[16, 16]}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Col key={index} span={12}>
                            <Skeleton active />
                        </Col>
                    ))}
                </Row>
            </Space>
        );
    }

    return (
        <Row gutter={[16, 16]}>
            {/* header */}
            <Col span={24}>
                <Title level={3}>Kết quả thi: {test?.title}</Title>
                <Space>
                    <Button type="primary" size="large" shape="round">
                        Xem đáp án
                    </Button>
                    <Button
                        size="large"
                        shape="round"
                        onClick={() => router.push('/exam')}
                    >
                        Quay về trang đề thi
                    </Button>
                </Space>
            </Col>

            {/* result */}
            <Col span={24}>
                <Row gutter={24}>
                    <Col span={6}>
                        <Card>
                            <Title level={4}>Kết quả làm bài</Title>
                            <Title level={2}>
                                {result?.correctAnswers}/
                                {result?.totalQuestions}
                            </Title>
                            <Paragraph>
                                Số điểm:{' '}
                                {result?.score !== undefined &&
                                result?.totalQuestions !== undefined
                                    ? (result?.score).toFixed(1)
                                    : 0}
                                /10
                            </Paragraph>
                            <Paragraph>
                                Thời gian hoàn thành: {result?.timeConsumed}
                            </Paragraph>
                        </Card>
                    </Col>

                    <Col span={4}>
                        <Card>
                            <Title className="!text-[#52c41a]" level={4}>
                                Trả lời đúng
                            </Title>
                            <Title className="!text-[#52c41a]" level={2}>
                                {result?.correctAnswers}
                            </Title>
                            <Text>câu hỏi</Text>
                        </Card>
                    </Col>

                    <Col span={4}>
                        <Card>
                            <Title className="!text-[#f87171]" level={4}>
                                Trả lời sai
                            </Title>
                            <Title className="!text-[#f87171]" level={2}>
                                {result?.incorrectAnswers}
                            </Title>
                            <Text>câu hỏi</Text>
                        </Card>
                    </Col>

                    <Col span={4}>
                        <Card>
                            <Title className="!text-[#8c8c8c]" level={4}>
                                Bỏ qua
                            </Title>
                            <Title className="!text-[#8c8c8c]" level={2}>
                                {result?.skippedQuestions}
                            </Title>
                            <Text>câu hỏi</Text>
                        </Card>
                    </Col>
                </Row>
            </Col>

            <Divider />

            <Col span={24}>
                <Title level={4}>Phân tích chi tiết</Title>
            </Col>

            <Col span={4}>
                <Text strong>Phân loại câu hỏi</Text>
            </Col>

            <Col span={20}>
                <Row gutter={[8, 8]}>
                    {result?.questions.map((question, index) => (
                        <Col key={index}>
                            <Button
                                danger={
                                    question.answer !== question.correctAnswer
                                }
                                style={{
                                    width: 40,
                                    height: 40,
                                    backgroundColor:
                                        question.answer !==
                                        question.correctAnswer
                                            ? '#f87171'
                                            : '#E9DAE9',
                                    color:
                                        question.answer !==
                                        question.correctAnswer
                                            ? 'white'
                                            : '',
                                }}
                            >
                                {index + 1}
                            </Button>
                        </Col>
                    ))}
                </Row>
            </Col>

            <Divider />

            <Title level={4}>Part</Title>
            <Col span={24}>
                <Row gutter={[16, 16]}>
                    {result?.questions.map((question, index) => (
                        <Col span={12} key={index}>
                            <Space align="center">
                                <div
                                    className="max-h-10 min-h-10 min-w-10 max-w-10 content-center rounded-full bg-[#E9DAE9] text-center font-bold"
                                    style={{
                                        lineHeight: '40px',
                                        width: '40px',
                                        height: '40px',
                                        textAlign: 'center',
                                    }}
                                >
                                    {index + 1}
                                </div>
                                <Text>
                                    {question.correctAnswer}:{' '}
                                    {question.answer ===
                                    question.correctAnswer ? (
                                        <>
                                            {question.answer}
                                            <CheckOutlined
                                                style={{
                                                    fontSize: 16,
                                                    color: '#52c41a',
                                                    marginLeft: 8,
                                                }}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <del>{question.answer}</del>
                                            <CloseOutlined
                                                size={40}
                                                style={{
                                                    fontSize: 16,
                                                    color: '#ff4d4f',
                                                    marginLeft: 8,
                                                }}
                                            />
                                        </>
                                    )}
                                </Text>
                                <Button
                                    type="link"
                                    onClick={() => showModal(question)}
                                >
                                    [Chi tiết]
                                </Button>
                            </Space>
                        </Col>
                    ))}
                </Row>
            </Col>

            <Modal
                title={<Title level={4}>Đáp án chi tiết</Title>}
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Title level={5}>Câu hỏi:</Title>
                <Paragraph className="px-4">
                    {currentQuestion.question}
                </Paragraph>
                {Object.entries(currentQuestion.choices).map(
                    ([key, value], index) => (
                        <Paragraph className="px-4" key={index}>
                            <Text strong>{key}.</Text> {value}
                        </Paragraph>
                    ),
                )}

                <Divider />
                <Title level={5}>Đáp án đúng:</Title>
                <Paragraph className="px-4">
                    <Text strong>{currentQuestion.correctAnswer}.</Text>{' '}
                    {
                        currentQuestion.choices[
                            currentQuestion.correctAnswer || 'A'
                        ]
                    }
                </Paragraph>

                <Divider />
                <Title level={5}>Giải thích chi tiết</Title>
                <Collapse
                    className="!bg-white"
                    bordered={false}
                    expandIconPosition="right"
                >
                    <Panel
                        key="1"
                        header="Click để xem giải thích chi tiết"
                        className="text-left"
                        style={{
                            whiteSpace: 'pre-wrap',
                            textAlign: 'left',
                        }}
                    >
                        <Text>{currentQuestion.explanation}</Text>
                    </Panel>
                </Collapse>
            </Modal>
        </Row>
    );
}
