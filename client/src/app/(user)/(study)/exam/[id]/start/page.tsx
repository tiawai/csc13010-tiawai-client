'use client';
import { useState, useEffect, useContext } from 'react';
import {
    Button,
    Typography,
    Card,
    Radio,
    Space,
    Divider,
    Layout,
    Form,
    notification,
    Result,
} from 'antd';
import { useRouter } from 'next/navigation';
import { ChoicesType } from '@/types/exam';
import { useAppSelector } from '@/lib/hooks/hook';
import { ExamContext } from '@/context/exam';
import { useSubmitExamMutation } from '@/services/exam';

const { Title, Paragraph } = Typography;
const { Sider, Content } = Layout;

const siderStyle: React.CSSProperties = {
    overflowY: 'auto',
    maxHeight: '85vh',
    position: 'sticky',
    top: 80,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
    backgroundColor: '#f5f5f5',
    padding: '20px',
};

interface Answer {
    questionId: number;
    answer: ChoicesType | null;
}

export default function StartExamPage({ params }: { params: { id: number } }) {
    const router = useRouter();
    const exam = useContext(ExamContext);
    const user = useAppSelector((state) => state.auth.user);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [timeStart, setTimeStart] = useState<string>('');
    const [submitExam, { isLoading }] = useSubmitExamMutation();

    useEffect(() => {
        setTimeStart(new Date().toISOString());
    }, []);

    useEffect(() => {
        if (exam?.questions) {
            const initialAnswers = exam.questions.map((q) => ({
                questionId: q.questionId ?? -1,
                answer: null,
            }));
            setAnswers(initialAnswers);
        }
    }, [exam]);

    const handleAnswerChange = (
        questionId: number | null,
        answer: ChoicesType,
    ) => {
        if (!questionId) return;
        setAnswers((prev) =>
            prev.map((a) =>
                a.questionId === questionId ? { ...a, answer } : a,
            ),
        );
    };

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isSubmit) return;
            e.preventDefault();
            e.returnValue = true;
        };

        if (!isSubmit) {
            window.addEventListener('beforeunload', handleBeforeUnload);
        }

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isSubmit]);

    if (!exam || !exam.questions) {
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

    const handleSubmit = async () => {
        const submission = {
            testId: +params.id,
            userId: user?.id,
            answers,
            timeStart,
        };

        const res = await submitExam(submission);

        if (!res.error) {
            setIsSubmit(true);
            setTimeStart('');
            notification.success({
                message: 'Nộp bài thành công',
                description: 'Bài thi của bạn đã được ghi nhận',
            });
            router.push(`/exam/${params.id}/result/${res.data.id}`);
        } else {
            setIsSubmit(false);
            notification.error({
                message: 'Nộp bài thất bại',
                description: 'Vui lòng thử lại sau',
            });
        }
    };

    return (
        <Layout className="!scroll-smooth !shadow-xl">
            <Content className="!p-4">
                <Form onFinish={handleSubmit}>
                    {exam.questions.map((question, index) => (
                        <Card
                            id={`${index}`}
                            key={question.questionId}
                            className="!mb-4"
                        >
                            {question.paragraph && (
                                <Title level={5}>{question.paragraph}</Title>
                            )}
                            <Title level={4}>
                                {question.questionId}. {question.question}
                            </Title>

                            <Radio.Group
                                onChange={(e) =>
                                    handleAnswerChange(
                                        question.questionId ?? null,
                                        e.target.value,
                                    )
                                }
                                value={
                                    answers.find(
                                        (a) =>
                                            a.questionId ===
                                            question.questionId,
                                    )?.answer
                                }
                            >
                                <Space direction="vertical">
                                    {Object.entries(question.choices).map(
                                        ([key, value]) => (
                                            <Radio key={key} value={key}>
                                                {value}
                                            </Radio>
                                        ),
                                    )}
                                </Space>
                            </Radio.Group>
                        </Card>
                    ))}
                </Form>
            </Content>

            <Sider width={250} style={siderStyle}>
                <Title level={4}>Thời gian còn lại:</Title>
                <TimeLeft
                    timeStart={timeStart}
                    duration={exam.duration}
                    onTimeUp={handleSubmit}
                />
                <Paragraph className="!mt-2 text-[#ff7a45]">
                    Chú ý: bạn có thể click vào số thứ tự câu hỏi trong bài để
                    đánh dấu review
                </Paragraph>

                <Divider />

                <Title level={4}>Part</Title>
                <div
                    className="grid grid-cols-5 gap-1"
                    style={{
                        gridTemplateRows: `repeat(${Math.ceil(
                            exam.questions.length / 5,
                        )}, max-content)`,
                    }}
                >
                    {exam.questions.map((_, index) => (
                        <Button
                            key={index}
                            type={
                                answers[index]?.answer ? 'primary' : 'default'
                            }
                            style={{ padding: '8px', height: '36px' }}
                            href={`#${index}`}
                        >
                            {index + 1}
                        </Button>
                    ))}
                </div>

                <Divider />

                <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    onClick={handleSubmit}
                    loading={isLoading}
                >
                    Nộp bài
                </Button>
            </Sider>
        </Layout>
    );
}

const TimeLeft = ({
    timeStart,
    duration,
    onTimeUp,
}: {
    timeStart?: string;
    duration: number; // in minutes
    onTimeUp: () => void;
}) => {
    const [timeLeft, setTimeLeft] = useState<number>(0);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(
            remainingSeconds,
        ).padStart(2, '0')}`;
    };

    useEffect(() => {
        if (timeStart) {
            const startTime = new Date(timeStart).getTime();
            const now = Date.now();
            const elapsedSeconds = Math.floor((now - startTime) / 1000);
            const totalDurationSeconds = duration * 60;
            const remainingSeconds = totalDurationSeconds - elapsedSeconds;

            if (remainingSeconds <= 0) {
                onTimeUp();
                setTimeLeft(0);
            } else {
                setTimeLeft(remainingSeconds);
            }
        } else {
            setTimeLeft(duration * 60);
        }
    }, [timeStart, duration, onTimeUp]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    onTimeUp();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [onTimeUp]);

    return (
        <Title className="!m-0" type="danger" level={2}>
            {formatTime(timeLeft)}
        </Title>
    );
};
