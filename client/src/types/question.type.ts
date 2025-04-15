import { NationalTestCreatorState } from '@/lib/slices/national-test-creator.slice';
import { ToeicTestCreatorState } from '@/lib/slices/toeic-test-creator.slice';
import type { PayloadAction } from '@reduxjs/toolkit';

export const ChoicesTypes = ['A', 'B', 'C', 'D'] as const;
export type ChoicesType = (typeof ChoicesTypes)[number];
export type Choices = Record<ChoicesType, string>;

export interface Question {
    id?: string;
    questionOrder: number;
    paragraph?: string;
    hasParagraph?: boolean;
    content: string;
    imageUrls?: string[];
    choices: Choices;
    correctAnswer?: ChoicesType;
    subQuestions?: number[];
    parentQuestion?: number;
    explanation?: string;
}

export interface Answer {
    questionId: string;
    answer: ChoicesType | null;
}

export interface CreateQuestionDto {
    paragraph?: string;
    content?: string;
    images?: string[];
    explanation?: string;
    points: number;
    correctAnswer: ChoicesType;
    choices: Choices;
}

export class QuestionUtils {
    static initQuestion(questionOrder = 1): Question {
        return {
            questionOrder: questionOrder,
            content: '',
            choices: {
                A: '',
                B: '',
                C: '',
                D: '',
            },
        };
    }

    static initListQuestions(length: number, offset: number = 0): Question[] {
        return Array.from({ length }, (_, i) =>
            QuestionUtils.initQuestion(offset + i + 1),
        );
    }

    static initListAnswers(questions: Question[]): Answer[] {
        return questions.map((question) => ({
            questionId: question.id || '',
            answer: null,
        }));
    }
}

export type SelectQuestionFieldById = <T extends keyof Question>(
    state: {
        toeicTestCreator?: ToeicTestCreatorState;
        nationalTestCreator?: NationalTestCreatorState;
    },
    questionOrder: number,
    field: T,
) => Question[T] | '';

export type SetQuestionFieldById = (
    state: ToeicTestCreatorState | NationalTestCreatorState,
    action: PayloadAction<{
        questionOrder: number;
        field: keyof Question;
        value: Question[keyof Question];
    }>,
) => void;
