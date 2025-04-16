'use client';
import { useState, useEffect, memo } from 'react';
import {
    Button,
    Typography,
    Card,
    Radio,
    Space,
    Divider,
    Layout,
    RadioChangeEvent,
    Tabs,
    TabsProps,
} from 'antd';
import { useRouter } from 'next/navigation';
import { ChoicesType } from '@/types/exam';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hook';
import { useSubmitExamMutation } from '@/services/exam';
import { useNotification } from '@/lib/hooks/use-notification';
import { ChoicesTypes, Question } from '@/types/question.type';
import clsx from 'clsx';
import { TestType } from '@/types/test.type';
import {
    ListeningPart,
    ReadingPart,
    TOEIC_LISTENING_PARTS,
    TOEIC_READING_PARTS,
    ToeicTestType,
} from '@/lib/slices/toeic-test-creator.slice';
import { toeicTestInfo } from '@/lib/slices/toeic-test-creator.slice';
import {
    selectAnswerByQuestionOrder,
    setAnswer,
} from '@/lib/slices/test.slice';

const { Title, Paragraph } = Typography;
const { Sider, Content } = Layout;

const siderStyle: React.CSSProperties = {
    overflowY: 'auto',
    maxHeight: '85vh',
    position: 'sticky',
    top: 80,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
};

const mapPartListening: Record<ListeningPart, string> = {
    part1: 'Part 1',
    part2: 'Part 2',
    part3: 'Part 3',
    part4: 'Part 4',
};

const mapPartReading: Record<ReadingPart, string> = {
    part5: 'Part 5',
    part6: 'Part 6',
    part7: 'Part 7',
};

export const StartNationalTest = () => {
    const questions = useAppSelector((state) => state.test.questions);

    const QuestionCardsNational = () => {
        return (
            <>
                {questions.map((question) => (
                    <QuestionCard
                        key={question.questionOrder}
                        question={question}
                    />
                ))}
            </>
        );
    };

    return (
        <PageLayout
            formQuestion={<QuestionCardsNational />}
            formQuestionNav={<NationalTestQuestionsNav />}
        />
    );
};

export const StartToeicTest = () => {
    const testType = useAppSelector((state) => state.test.test.type);
    const questions = useAppSelector((state) => state.test.questions);
    const toeicType = (
        testType === TestType.TOEIC_LISTENING ? 'listening' : 'reading'
    ) as ToeicTestType;

    const testInfo = toeicTestInfo[toeicType];
    const [currentPart, setCurrentPart] = useState<string>(testInfo.firstPart);
    const parts = testInfo.parts;

    const generatePartQuestions = (part: string) => {
        const partIndex = parts.indexOf(part);
        const offset = parts
            .slice(0, partIndex)
            .reduce((sum, p) => sum + testInfo.init[p].length, 0);
        const totalQuestions = testInfo.init[part].length;

        return (
            <>
                {questions.slice(offset, offset + totalQuestions).map((q) => (
                    <QuestionCard key={q.questionOrder} question={q} />
                ))}
            </>
        );
    };

    const items: TabsProps['items'] = parts.map((part) => ({
        key: part,
        label: `${mapPartReading[part as keyof typeof mapPartReading]}`,
        children: generatePartQuestions(part),
    }));

    return (
        <PageLayout
            formQuestion={
                <Tabs
                    activeKey={currentPart}
                    onChange={(key) => setCurrentPart(key)}
                    centered
                    type="card"
                    size="large"
                    items={items}
                />
            }
            formQuestionNav={<ToeicTestQuestionsNav setPart={setCurrentPart} />}
        />
    );
};

const CardTitle = ({
    title,
    className,
}: {
    title: string;
    className?: string;
}) => {
    return (
        <Title level={4} className={clsx(className)}>
            {title}
        </Title>
    );
};

export const PageLayout = memo(
    ({
        formQuestion,
        formQuestionNav,
    }: {
        formQuestion: React.ReactNode;
        formQuestionNav: React.ReactNode;
    }) => {
        const router = useRouter();
        const user = useAppSelector((state) => state.auth.user);
        const {
            id: testId,
            title,
            timeLength,
        } = useAppSelector((state) => state.test.test);
        const answers = useAppSelector((state) => state.test.answers);
        const [timeStart, setTimeStart] = useState<string>('');
        const [isSubmit, setIsSubmit] = useState<boolean>(false);
        const [submitExam, { isLoading }] = useSubmitExamMutation();
        const { notify } = useNotification();

        useEffect(() => {
            setTimeStart(new Date().toISOString());
        }, []);

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

        const handleSubmit = async () => {
            const submission = {
                testId: testId,
                userId: user.id,
                answers,
                timeStart,
            };

            const res = await submitExam(submission);

            if (!res.error) {
                setIsSubmit(true);
                setTimeStart('');
                notify({
                    message: 'Nộp bài thành công',
                    description: 'Bài thi của bạn đã được ghi nhận',
                });
                router.push(`/test/${testId}/result/${res.data.id}`);
            } else {
                setIsSubmit(false);
                notify({
                    message: 'Nộp bài thất bại',
                    description: 'Vui lòng thử lại sau',
                    notiType: 'error',
                });
            }
        };

        return (
            <>
                <Title level={3} className="text-center">
                    {title}
                </Title>
                <Layout className="!scroll-smooth p-4 !shadow-xl">
                    <Content className="mr-4 space-y-4">{formQuestion}</Content>

                    <Sider
                        width={250}
                        style={siderStyle}
                        className="!bg-transparent"
                    >
                        <Card>
                            <CardTitle title="Thời gian còn lại" />
                            <TimeLeft
                                timeStart={timeStart}
                                duration={timeLength}
                                onTimeUp={handleSubmit}
                            />
                            <Paragraph className="!mt-2 !text-[#ff7a45]">
                                Chú ý: bạn có thể click vào số thứ tự câu hỏi
                                trong bài để đánh dấu review
                            </Paragraph>
                            <Divider />
                            {formQuestionNav}

                            <Divider />
                            <div className="flex justify-between gap-4">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="!flex-[1]"
                                    onClick={handleSubmit}
                                    loading={isLoading}
                                >
                                    Nộp bài
                                </Button>

                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    danger
                                    className="!flex-[1]"
                                    onClick={handleSubmit}
                                >
                                    Thoát
                                </Button>
                            </div>
                        </Card>
                    </Sider>
                </Layout>
            </>
        );
    },
);

PageLayout.displayName = 'PageLayout';

const QuestionCard = memo(({ question }: { question: Question }) => {
    const dispatch = useAppDispatch();
    const { answer } = useAppSelector(
        selectAnswerByQuestionOrder(question.questionOrder),
    );

    const handleAnswerChange = (e: RadioChangeEvent) => {
        const selectedAnswer = e.target.value as ChoicesType;
        dispatch(
            setAnswer({
                questionOrder: question.questionOrder,
                choice: selectedAnswer,
            }),
        );
    };

    return (
        <Card
            id={`${question.questionOrder}`}
            key={question.questionOrder}
            className="!mb-4"
        >
            {question.paragraph && (
                <Title level={5}>{question.paragraph}</Title>
            )}
            <CardTitle
                title={`${question.questionOrder}. ${question.content}`}
            />

            <Radio.Group onChange={handleAnswerChange} value={answer}>
                <Space direction="vertical">
                    {Object.entries(question.choices).map(
                        ([key, value]) =>
                            ChoicesTypes.includes(key as ChoicesType) && (
                                <Radio key={key} value={key}>
                                    {value}
                                </Radio>
                            ),
                    )}
                </Space>
            </Radio.Group>
        </Card>
    );
});

QuestionCard.displayName = 'QuestionCard';

const NationalTestQuestionsNav = () => {
    const questions = useAppSelector((state) => state.test.questions);
    const answers = useAppSelector((state) => state.test.answers);
    return (
        <>
            <CardTitle title="Part" />
            <div className="grid grid-cols-5 gap-1">
                {questions.map((_, index) => (
                    <Button
                        key={index}
                        type={answers[index]?.answer ? 'primary' : 'default'}
                        style={{ padding: '8px', height: '36px' }}
                        href={`#${index}`}
                    >
                        {index + 1}
                    </Button>
                ))}
            </div>
        </>
    );
};

const ToeicTestQuestionsNav = ({
    setPart,
}: {
    setPart: (part: ReadingPart | ListeningPart) => void;
}) => {
    const testType = useAppSelector((state) => state.test.test.type);
    const answers = useAppSelector((state) => state.test.answers);

    const mapPart =
        testType === TestType.TOEIC_LISTENING
            ? mapPartListening
            : mapPartReading;

    const TOEIC_PARTS =
        testType === TestType.TOEIC_LISTENING
            ? TOEIC_LISTENING_PARTS
            : TOEIC_READING_PARTS;

    const onNavigate = (part: keyof typeof mapPart) => {
        setPart(part);
        console.log('onNavigate', part);
        const element = document.getElementById(part);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            {
                Object.entries(TOEIC_PARTS).reduce(
                    ({ elements, offset }, [key, value]) => {
                        const partElements = (
                            <div key={key} className="mb-4">
                                <CardTitle
                                    title={mapPart[key as keyof typeof mapPart]}
                                />
                                <div className="grid grid-cols-5 gap-1">
                                    {Array.from(
                                        { length: value },
                                        (_, index) => {
                                            const globalIndex = offset + index;
                                            return (
                                                <Button
                                                    key={globalIndex}
                                                    type={
                                                        answers[globalIndex]
                                                            ?.answer
                                                            ? 'primary'
                                                            : 'default'
                                                    }
                                                    style={{
                                                        padding: '8px',
                                                        height: '36px',
                                                    }}
                                                    href={`#${globalIndex}`}
                                                    onClick={() =>
                                                        onNavigate(
                                                            key as keyof typeof mapPart,
                                                        )
                                                    }
                                                >
                                                    {globalIndex + 1}
                                                </Button>
                                            );
                                        },
                                    )}
                                </div>
                            </div>
                        );

                        return {
                            elements: [...elements, partElements],
                            offset: offset + value,
                        };
                    },
                    { elements: [] as JSX.Element[], offset: 0 },
                ).elements
            }
        </>
    );
};

const TimeLeft = ({
    timeStart,
    duration,
    onTimeUp,
}: {
    timeStart?: string;
    duration: number;
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
