'use client';
import { memo, useState, useEffect, Fragment } from 'react';
import { Form } from 'antd';
import { useAppSelector, useAppDispatch } from '@/lib/hooks/hook';
import {
    setToeicTestType,
    setSubQuestions,
    setCurrentQuestionId,
    selectCurrentPart,
    selectCurrentQuestionId,
    selectToeicQuestionFieldById,
    selectCurrentQuestions,
    ReadingPart,
    selectFirstPart,
    setToeicTestField,
} from '@/lib/slices/toeic-test-creator.slice';
import {
    FormQuestionLayout,
    FormQuestionTitle,
    FormLayout,
    FormQuestionNavigation,
    NavigationButtonNext,
} from './form-ui';
import {
    PartNavigation,
    PartTitle,
    PartDescription,
    PartNavigationFooter,
} from './part-toeic-ui';
import { BasicQuestion, QuestionNavigation } from './question-ui';
import { useTestField } from '@/lib/hooks/use-test-field';
import {
    TestQuestionEndDate,
    TestQuestionStartDate,
    TestQuestionTitle,
} from './test-question-ui';

const partMap: Record<ReadingPart, { title: string; description: string }> = {
    part5: {
        title: 'Part 5',
        description: '(Bao gồm 16 câu hỏi về hoàn thành câu)',
    },
    part6: {
        title: 'Part 6',
        description: '(Bao gồm 30 câu hỏi về hoàn thành đoạn văn)',
    },
    part7: {
        title: 'Part 7',
        description: '(Bao gồm 54 câu hỏi về đọc hiểu)',
    },
};

export const FormToeicReading = memo(() => {
    const dispatch = useAppDispatch();
    const currentPart = useAppSelector(selectCurrentPart) as ReadingPart;
    const firstPart = useAppSelector(selectFirstPart) as ReadingPart;
    const isSelectbasic = useAppSelector(
        (state) => state.toeicTestCreator.isSelectBasic,
    );

    const [form] = Form.useForm();
    const onFinish = (values: string) => {
        console.log('onFinish', values);
    };

    useEffect(() => {
        dispatch(setToeicTestType('reading'));
    }, [dispatch]);

    if (!partMap[currentPart]) return null;

    return (
        <Form form={form} layout="vertical" size="large" onFinish={onFinish}>
            <div className="space-y-6">
                {isSelectbasic ? (
                    <>
                        <FormBasic />
                        <div className="flex justify-end">
                            <NavigationButtonNext
                                text={partMap[firstPart].title}
                                onClick={() =>
                                    dispatch(
                                        setToeicTestField({
                                            field: 'isSelectBasic',
                                            value: false,
                                        }),
                                    )
                                }
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <PartNavigation partMap={partMap} />
                        <PartTitle title={partMap[currentPart].title} />
                        <PartDescription
                            description={partMap[currentPart].description}
                        />
                        <FormLayout
                            navigator={
                                <FormQuestionNavigation
                                    selectCurrentQuestionId={
                                        selectCurrentQuestionId
                                    }
                                    selectCurrentQuestions={
                                        selectCurrentQuestions
                                    }
                                    setCurrentQuestionId={setCurrentQuestionId}
                                />
                            }
                            questions={<FormPartQuestions />}
                        />
                        <PartNavigationFooter partMap={partMap} />
                    </>
                )}
            </div>
        </Form>
    );
});

FormToeicReading.displayName = 'FormToeicReading';

const FormBasic = memo(() => {
    const { getField, setField } = useTestField('toeic');
    return (
        <>
            <TestQuestionTitle<'toeic'>
                getField={getField}
                setField={setField}
            />
            <div className="grid grid-cols-2 gap-x-8">
                <TestQuestionStartDate<'toeic'>
                    getField={getField}
                    setField={setField}
                />
                <TestQuestionEndDate<'toeic'>
                    getField={getField}
                    setField={setField}
                />
            </div>
        </>
    );
});

FormBasic.displayName = 'FormBasic';

const FormPartQuestions = memo(() => {
    const dispatch = useAppDispatch();
    const currentQuestionId = useAppSelector(selectCurrentQuestionId);
    const currentPart = useAppSelector(selectCurrentPart);

    const subQuestions =
        useAppSelector((state) =>
            selectToeicQuestionFieldById(
                state,
                currentQuestionId,
                'subQuestions',
            ),
        ) || [];

    const [questionType, setQuestionType] = useState<number>(0);

    useEffect(() => {
        if (questionType === 0) {
            dispatch(setSubQuestions(0));
        }
    }, [dispatch, questionType]);

    useEffect(() => {
        if (subQuestions.length > 0) {
            setQuestionType(1);
        }
    }, [currentQuestionId, subQuestions.length]);

    useEffect(() => {
        if (currentPart === 'part5') {
            setQuestionType(0);
        }
    }, [currentPart]);

    return (
        <FormQuestionLayout>
            <FormQuestionTitle title={`Câu ${currentQuestionId}`} />
            <div className="p-6">
                {currentPart !== 'part5' && (
                    <Form.Item>
                        <QuestionNavigation
                            currentType={questionType}
                            types={['Câu hỏi chữ', 'Câu hỏi hình']}
                            onNavigate={(index) => setQuestionType(index)}
                        />
                    </Form.Item>
                )}

                {questionType === 0 ? (
                    <BasicQuestion questionOrder={currentQuestionId} />
                ) : (
                    <>
                        <BasicQuestion
                            questionOrder={currentQuestionId}
                            showQuestion={false}
                            showQuestionImage={true}
                        />

                        {subQuestions?.map((subQuestion) => (
                            <Fragment key={subQuestion}>
                                <Form.Item>
                                    <div className="h-px w-full bg-tia-deep-koamaru"></div>
                                </Form.Item>
                                <BasicQuestion
                                    questionOrder={subQuestion}
                                    showQuestion={false}
                                />
                            </Fragment>
                        ))}
                    </>
                )}
            </div>
        </FormQuestionLayout>
    );
});

FormPartQuestions.displayName = 'FormPartQuestions';
