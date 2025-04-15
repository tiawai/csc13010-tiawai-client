import { memo } from 'react';
import { Button } from 'antd';
import Title from 'antd/es/typography/Title';
import { useCallback } from 'react';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hook';
import { Question } from '@/types/question.type';
import { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/store/store';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

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
            <div className="flex gap-8 max-lg:flex-col">
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
                <div className="grid grid-cols-3 justify-items-center gap-2 p-6 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5">
                    {currentQuestions.map((question) => (
                        <QuestionButton
                            key={question.questionOrder}
                            question={question}
                            onNavigate={onNavigate}
                            isActive={
                                currentQuestionId === question.questionOrder ||
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
                    onNavigate(
                        question.parentQuestion ?? question.questionOrder,
                    )
                }
                className={clsx(
                    'w-min hover:border-tia-deep-koamaru',
                    isActive && '!bg-tia-deep-koamaru !text-white',
                    !isActive &&
                        question.parentQuestion &&
                        '!bg-tia-deep-koamaru/50 !text-white',
                )}
            >
                {question.questionOrder}
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
    loading?: boolean;
}

export const NavigationButtonBack = ({
    text,
    onClick,
    loading = false,
}: NavigationButtonProps) => {
    return (
        <Button
            className="!bg-tia-platinum-2"
            icon={<ArrowLeftOutlined />}
            iconPosition="start"
            shape="round"
            onClick={onClick}
            loading={loading}
        >
            {text}
        </Button>
    );
};

export const NavigationButtonNext = ({
    text,
    onClick,
    loading = false,
}: NavigationButtonProps) => {
    return (
        <Button
            className="!bg-tia-platinum-2"
            icon={<ArrowRightOutlined />}
            iconPosition="end"
            shape="round"
            onClick={onClick}
            loading={loading}
        >
            {text}
        </Button>
    );
};

export const NavigationButtonCancel = ({
    text,
    onClick,
    loading = false,
}: NavigationButtonProps) => {
    return (
        <Button
            key="cancel"
            shape="round"
            type="primary"
            onClick={onClick}
            loading={loading}
            danger
        >
            {text}
        </Button>
    );
};

export const NavigationButtonSave = ({
    text,
    onClick,
    loading = false,
}: NavigationButtonProps) => {
    return (
        <Button
            key="save"
            className="!bg-tia-platinum"
            shape="round"
            onClick={onClick}
            loading={loading}
        >
            {text}
        </Button>
    );
};

export const NavigationButtonExport = ({
    text,
    onClick,
    loading = false,
}: NavigationButtonProps) => {
    return (
        <Button
            key="export"
            className="!bg-tia-platinum"
            shape="round"
            onClick={onClick}
            loading={loading}
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
