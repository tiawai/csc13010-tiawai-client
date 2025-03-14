import { NationalTestCreatorState } from '@/lib/slices/national-test-creator';
import { ToeicTestCreatorState } from '@/lib/slices/toeic-test-creator';
import type { PayloadAction } from '@reduxjs/toolkit';

export const ChoicesTypes = ['A', 'B', 'C', 'D'] as const;
export type ChoicesType = (typeof ChoicesTypes)[number];
export type Choices = Record<ChoicesType, string>;

export interface Question {
    questionId: number;
    paragraph?: string;
    hasParagraph?: boolean;
    question: string;
    imageUrls?: string[];
    choices: Choices;
    correctAnswer?: ChoicesType;
    subQuestions?: number[];
    parentQuestion?: number;
    explanation?: string;
}

export const initQuestion = {
    questionId: 1,
    question: '',
    choices: {
        A: '',
        B: '',
        C: '',
        D: '',
    },
};

export const initListQuestions = ({
    length,
    offset = 0,
}: {
    length: number;
    offset?: number;
}): Question[] => {
    return Array.from({ length }, (_, i) => ({
        ...initQuestion,
        questionId: offset + i + 1,
    }));
};

export type SelectQuestionFieldById = <T extends keyof Question>(
    state: {
        toeicTestCreator?: ToeicTestCreatorState;
        nationalTestCreator?: NationalTestCreatorState;
    },
    questionId: number,
    field: T,
) => Question[T] | '';

export type SetQuestionFieldById = (
    state: ToeicTestCreatorState | NationalTestCreatorState,
    action: PayloadAction<{
        questionId: number;
        field: keyof Question;
        value: Question[keyof Question];
    }>,
) => void;
