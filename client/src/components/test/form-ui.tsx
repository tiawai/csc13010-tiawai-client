import { memo } from 'react';
import { Button } from 'antd';
import Title from 'antd/es/typography/Title';
import { useCallback } from 'react';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hook';
import { Question } from '@/types/question';
import { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/store/store';

export const FormLabel = ({ label }: { label: string }) => (
    <Title className={clsx('!text-tia-jacarta')} level={4}>
        {label}
    </Title>
);

export const FormQuestionTitle = ({ title }: { title: string }) => (
    <Title
        className="!m-0 !rounded-full !bg-tia-deep-koamaru !py-2 !text-center !text-white"
        level={4}
    >
        {title}
    </Title>
);

export const FormSubmitButton = ({ isLoading }: { isLoading: boolean }) => (
    <Button
        className="!m-auto !flex !bg-tia-platinum !text-black"
        shape="round"
        htmlType="submit"
        loading={isLoading}
    >
        Đăng đề
    </Button>
);

export const FormLayout = memo(
    ({
        navigator,
        questions,
    }: {
        navigator: React.ReactNode;
        questions: React.ReactNode;
    }) => {
        return (
            <div className="flex gap-8">
                <div className="h-max rounded-3xl bg-tia-platinum-2">
                    {navigator}
                </div>
                <div className="grow">{questions}</div>
            </div>
        );
    },
);

export const FormQuestionLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return <div className="rounded-3xl bg-tia-platinum-2">{children}</div>;
};

interface FormQuestionNavigationProps {
    selectCurrentQuestionId: (state: RootState) => number;
    selectCurrentQuestions: (state: RootState) => Question[];
    setCurrentQuestionId: (id: number) => PayloadAction<number>;
}

export const FormQuestionNavigation = memo(
    ({
        selectCurrentQuestionId,
        selectCurrentQuestions,
        setCurrentQuestionId,
    }: FormQuestionNavigationProps) => {
        const dispatch = useAppDispatch();
        const currentQuestionId = useAppSelector(selectCurrentQuestionId);
        const currentQuestions = useAppSelector(selectCurrentQuestions);
        const onNavigate = useCallback(
            (id: number) => dispatch(setCurrentQuestionId(id)),
            [dispatch, setCurrentQuestionId],
        );

        return (
            <FormQuestionLayout>
                <FormQuestionTitle title="Câu hỏi" />
                <div className="grid grid-cols-[repeat(5,min-content)] gap-2 p-6">
                    {currentQuestions.map((question) => (
                        <QuestionButton
                            key={question.questionId}
                            question={question}
                            onNavigate={onNavigate}
                            isActive={
                                currentQuestionId === question.questionId ||
                                currentQuestionId === question?.parentQuestion
                            }
                        />
                    ))}
                </div>
            </FormQuestionLayout>
        );
    },
);

export const QuestionButton = memo(
    ({
        question,
        onNavigate,
        isActive,
    }: {
        question: Question;
        onNavigate: (id: number) => void;
        isActive: boolean;
    }) => {
        return (
            <Button
                onClick={() =>
                    onNavigate(question.parentQuestion ?? question.questionId)
                }
                className={clsx(
                    'hover:border-tia-deep-koamaru',
                    isActive && '!bg-tia-deep-koamaru !text-white',
                    !isActive &&
                        question.parentQuestion &&
                        '!bg-tia-deep-koamaru/50 !text-white',
                )}
            >
                {question.questionId}
            </Button>
        );
    },
    (prevProps, nextProps) =>
        prevProps.isActive === nextProps.isActive &&
        prevProps.question.parentQuestion === nextProps.question.parentQuestion,
);

interface NavigationButtonProps {
    text: string;
    onClick: () => void;
}

export const NavigationButtonCancel = ({
    text,
    onClick,
}: NavigationButtonProps) => {
    return (
        <Button
            key="cancel"
            shape="round"
            type="primary"
            danger
            onClick={onClick}
        >
            {text}
        </Button>
    );
};

export const NavigationButtonSave = ({
    text,
    onClick,
}: NavigationButtonProps) => {
    return (
        <Button
            key="save"
            className="!bg-tia-platinum"
            shape="round"
            onClick={onClick}
        >
            {text}
        </Button>
    );
};

export const NavigationButtonExport = ({
    text,
    onClick,
}: NavigationButtonProps) => {
    return (
        <Button
            key="export"
            className="!bg-tia-platinum"
            shape="round"
            onClick={onClick}
        >
            {text}
        </Button>
    );
};

FormLayout.displayName = 'FormLayout';
FormQuestionLayout.displayName = 'FormQuestionLayout';
FormQuestionNavigation.displayName = 'FormQuestionNavigation';
FormQuestionNavigation.displayName = 'FormQuestionNavigation';
QuestionButton.displayName = 'QuestionButton';
