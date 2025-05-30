'use client';
import { useState, useEffect, memo, useCallback } from 'react';
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
    Modal,
} from 'antd';
import { useRouter } from 'next/navigation';
import { ChoicesType } from '@/types/exam';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hook';
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
    setResetSubmit,
    setResults,
    setTimeConsumed,
} from '@/lib/slices/test.slice';
import Image from 'next/image';
import {
    useSubmitTestByIdMutation,
    useCreateTrackAbandonedMutation,
    useDeleteTrackAbandonedMutation,
} from '@/services/test.service';

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
    const mapPart =
        testType === TestType.TOEIC_LISTENING
            ? mapPartListening
            : mapPartReading;

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
        label: `${mapPart[part as keyof typeof mapPart]}`,
        children: generatePartQuestions(part),
    }));

    return (
        <PageLayout
            formQuestion={
                <Tabs
                    activeKey={currentPart}
                    onChange={(key) => setCurrentPart(key)}
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
        const {
            id: testId,
            title,
            audioUrl,
        } = useAppSelector((state) => state.test.test);
        const dispatch = useAppDispatch();
        const answers = useAppSelector((state) => state.test.answers);
        const timeConsumed = useAppSelector((state) => state.test.timeConsumed);
        const [submitTest, { isLoading }] = useSubmitTestByIdMutation();
        const { notify } = useNotification();
        const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
        const [pendingUrl, setPendingUrl] = useState<string | null>(null);
        const [modalAction, setModalAction] = useState<
            'submit' | 'exit' | null
        >(null);

        const [createTrack] = useCreateTrackAbandonedMutation();
        const [deleteTrack] = useDeleteTrackAbandonedMutation();

        useEffect(() => {
            window.history.pushState(null, '', window.location.pathname);
            const handlePopState = async () => {
                createTrack(testId);
            };
            window.addEventListener('popstate', handlePopState);
            return () => {
                window.removeEventListener('popstate', handlePopState);
            };
        }, [createTrack]);

        useEffect(() => {
            const handleDeleteTrack = async () => {
                deleteTrack(testId);
            };
            handleDeleteTrack();
        }, [deleteTrack, testId]);

        // useEffect(() => {
        //     if (ref.current !== pathname) {
        //         createTrack(testId);
        //     }
        //     ref.current = pathname;
        // }, [pathname]);

        // useEffect(() => {
        //     const handlePopState = async (
        //         e: PopStateEvent | BeforeUnloadEvent,
        //     ) => {
        //         console.log('handlePopState', e);
        //         await createTrack(testId);
        //         e.preventDefault();
        //         e.returnValue = '';
        //         return 'Bạn có chắc chắn muốn thoát? Các thay đổi chưa lưu sẽ bị mất.';
        //     };

        //     window.addEventListener('popstate', handlePopState);
        //     window.addEventListener('beforeunload', handlePopState);
        //     return () => {
        //         window.removeEventListener('popstate', handlePopState);
        //         window.addEventListener('beforeunload', handlePopState);
        //     };
        // }, []);

        const handleConfirmAction = useCallback(async () => {
            setIsModalVisible(false);
            if (modalAction === 'submit') {
                await handleSubmit();
            } else if (modalAction === 'exit') {
                await router.push('/');
            }
            setPendingUrl(null);
            setModalAction(null);
        }, [pendingUrl, modalAction, router]);

        const handleCancelAction = useCallback(async () => {
            setIsModalVisible(false);
            setPendingUrl(null);
            setModalAction(null);
            dispatch(setResetSubmit);
            await createTrack(testId);
        }, []);

        const showSubmitConfirmation = () => {
            setModalAction('submit');
            setIsModalVisible(true);
        };

        const showExitConfirmation = () => {
            setModalAction('exit');
            setIsModalVisible(true);
        };

        const handleSubmit = async () => {
            await deleteTrack(testId);
            const submitPayload = {
                testId: testId,
                timeConsumed: timeConsumed,
                answers: answers.map((answer) => ({
                    ...answer,
                    answer: answer?.answer,
                })),
            };

            const res = await submitTest(submitPayload);
            dispatch(setTimeConsumed(0));

            if (!res.error) {
                notify({
                    message: 'Nộp bài thành công',
                    description: 'Bài thi của bạn đã được ghi nhận',
                });
                const { data } = res;
                const submissionId = data.submissionId;
                dispatch(setResults(data));
                router.push(`result/${submissionId}`);
            } else {
                notify({
                    message: 'Nộp bài thất bại',
                    description: 'Vui lòng thử lại sau',
                    notiType: 'error',
                });
            }
        };

        const getModalConfig = () => {
            switch (modalAction) {
                case 'submit':
                    return {
                        title: 'Xác nhận nộp bài',
                        content: 'Bạn có chắc chắn muốn nộp bài không?',
                        okText: 'Nộp bài',
                        cancelText: 'Hủy',
                    };
                case 'exit':
                    return {
                        title: 'Xác nhận thoát',
                        content:
                            'Bạn có chắc chắn muốn thoát? Dữ liệu bài làm sẽ không được lưu.',
                        okText: 'Thoát',
                        cancelText: 'Hủy',
                    };
                default:
                    return {
                        title: 'Xác nhận rời trang',
                        content:
                            'Bạn có chắc chắn muốn rời trang này? Dữ liệu bài làm sẽ không được lưu.',
                        okText: 'Rời trang',
                        cancelText: 'Ở lại',
                    };
            }
        };

        const modalConfig = getModalConfig();

        return (
            <>
                <Title level={3} className="text-center">
                    {title}
                </Title>
                <Layout className="!scroll-smooth p-4 !shadow-xl">
                    <Content className="mr-4 space-y-4">
                        {audioUrl && (
                            <Card>
                                <audio
                                    controls
                                    className="w-full"
                                    src={audioUrl}
                                    preload="auto"
                                >
                                    <track
                                        kind="captions"
                                        srcLang="en"
                                        src={audioUrl}
                                    />
                                    Your browser does not support the audio
                                    element.
                                </audio>
                            </Card>
                        )}
                        {formQuestion}
                    </Content>

                    <Sider
                        width={250}
                        style={siderStyle}
                        className="!bg-transparent"
                    >
                        <Card>
                            <CardTitle title="Thời gian còn lại" />
                            <TimeLeft onTimeUp={handleSubmit} />
                            <Paragraph className="!mt-2 !text-[#ff7a45]">
                                Chú ý: bạn có thể click vào số thứ tự câu hỏi
                                trong bài để đánh dấu review
                            </Paragraph>
                            <Divider />
                            {/* Add data attribute to mark internal navigation */}
                            <div data-internal-nav="true">
                                {formQuestionNav}
                            </div>

                            <Divider />
                            <div className="flex justify-between gap-4">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="!flex-[1]"
                                    onClick={showSubmitConfirmation}
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
                                    onClick={showExitConfirmation}
                                >
                                    Thoát
                                </Button>
                            </div>
                        </Card>
                    </Sider>
                </Layout>

                <Modal
                    title={modalConfig.title}
                    open={isModalVisible}
                    onOk={handleConfirmAction}
                    onCancel={handleCancelAction}
                    okText={modalConfig.okText}
                    cancelText={modalConfig.cancelText}
                    closeIcon={false}
                >
                    <p>{modalConfig.content}</p>
                </Modal>
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

            {question.images &&
                question.images.map((url) => (
                    <Image
                        key={url}
                        src={url}
                        alt="question-image"
                        height={512}
                        width={512}
                        className="mb-2 w-full object-cover"
                    />
                ))}

            <CardTitle
                title={`${question.questionOrder}. ${question?.content || ''}`}
            />

            <Radio.Group onChange={handleAnswerChange} value={answer}>
                <Space direction="vertical">
                    {Object.entries(question.choices).map(
                        ([key, value]) =>
                            ChoicesTypes.includes(key as ChoicesType) && (
                                <Radio key={key} value={key}>
                                    {`${key}${value ? `. ${value}` : ''}`}
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

const TimeLeft = ({ onTimeUp }: { onTimeUp: () => void }) => {
    const dispatch = useAppDispatch();
    const timeLength = useAppSelector((state) => state.test.test.timeLength);
    const timeConsumed = useAppSelector((state) => state.test.timeConsumed);
    const timeLeft = timeLength * 60 - timeConsumed;

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(
            remainingSeconds,
        ).padStart(2, '0')}`;
    };

    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeConsumed = timeConsumed + 1;
            dispatch(setTimeConsumed(newTimeConsumed));
            if (!timeLeft) {
                clearInterval(timer);
                onTimeUp();
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [onTimeUp, timeConsumed]);

    return (
        <Title className="!m-0" type="danger" level={2}>
            {formatTime(timeLeft)}
        </Title>
    );
};
