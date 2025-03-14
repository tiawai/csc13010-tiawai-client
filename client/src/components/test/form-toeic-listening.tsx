'use client';
import { memo, useState, useEffect, Fragment } from 'react';
import { Form } from 'antd';
import { useAppSelector, useAppDispatch } from '@/lib/hooks/hook';
import {
    selectCurrentPart,
    selectCurrentQuestionId,
    selectToeicQuestionFieldById,
    ListeningPart,
    setToeicTestType,
    setSubQuestions,
    setCurrentQuestionId,
    selectCurrentQuestions,
} from '@/lib/slices/toeic-test-creator';
import {
    FormQuestionLayout,
    FormQuestionTitle,
    FormLayout,
    FormQuestionNavigation,
} from './form-ui';
import {
    PartNavigation,
    PartTitle,
    PartDescription,
    PartNavigationFooter,
} from './part-toeic-ui';
import { BasicQuestion, QuestionNavigation } from './question-ui';

const partMap: Record<ListeningPart, { title: string; description: string }> = {
    part1: {
        title: 'Part 1',
        description: '(Bao gồm 6 câu hỏi về mô tả hình ảnh)',
    },
    part2: {
        title: 'Part 2',
        description: '(Bao gồm 25 câu hỏi về hỏi đáp)',
    },
    part3: {
        title: 'Part 3',
        description: '(Bao gồm 39 câu hỏi về hội thoại ngắn)',
    },
    part4: {
        title: 'Part 4',
        description: '(Bao gồm 30 câu hỏi về bài nói ngắn)',
    },
};

export const FormToeicListening = memo(() => {
    const dispatch = useAppDispatch();
    const currentPart = useAppSelector(selectCurrentPart) as ListeningPart;

    const [form] = Form.useForm();
    const onFinish = (values: string) => {
        console.log('onFinish', values);
    };

    useEffect(() => {
        dispatch(setToeicTestType('listening'));
    }, [dispatch]);

    if (!partMap[currentPart]) return null;

    return (
        <Form form={form} layout="vertical" size="large" onFinish={onFinish}>
            <div className="space-y-6">
                <PartNavigation partMap={partMap} />
                <PartTitle title={partMap[currentPart].title} />
                <PartDescription
                    description={partMap[currentPart].description}
                />
                <FormLayout
                    navigator={
                        <FormQuestionNavigation
                            selectCurrentQuestionId={selectCurrentQuestionId}
                            selectCurrentQuestions={selectCurrentQuestions}
                            setCurrentQuestionId={setCurrentQuestionId}
                        />
                    }
                    questions={<FormPartQuestions />}
                />
                <PartNavigationFooter partMap={partMap} />
            </div>
        </Form>
    );
});
FormToeicListening.displayName = 'FormToeicListening';

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

    return (
        <FormQuestionLayout>
            <FormQuestionTitle title={`Câu ${currentQuestionId}`} />
            <div className="p-6">
                {currentPart !== 'part1' && (
                    <Form.Item>
                        <QuestionNavigation
                            currentType={questionType}
                            types={['Câu hỏi chữ', 'Câu hỏi hình']}
                            onNavigate={(index) => setQuestionType(index)}
                        />
                    </Form.Item>
                )}

                {questionType === 0 ? (
                    <BasicQuestion questionId={currentQuestionId} />
                ) : (
                    <>
                        <BasicQuestion
                            questionId={currentQuestionId}
                            showQuestion={false}
                            showQuestionImage={true}
                        />

                        {subQuestions?.map((subQuestion) => (
                            <Fragment key={subQuestion}>
                                <Form.Item className="!m-0">
                                    <div className="h-px w-full bg-tia-deep-koamaru"></div>
                                </Form.Item>
                                <BasicQuestion
                                    questionId={subQuestion}
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
