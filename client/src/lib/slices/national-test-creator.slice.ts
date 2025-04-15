'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    Question,
    initQuestion,
    initListQuestions,
} from '@/types/question.type';
import type { SelectQuestionFieldById } from '@/types/question.type';
import type { RootState } from '@/lib/store/store';

export interface NationalTestCreatorState {
    title: string;
    startDate: string;
    endDate: string;
    duration: number;
    totalQuestions: number;
    currentQuestionId: number;
    questions: Question[];
    isExporting: boolean;
}

const initialState: NationalTestCreatorState = {
    title: '',
    startDate: '',
    endDate: '',
    duration: 120,
    totalQuestions: 50,
    currentQuestionId: 1,
    questions: initListQuestions({ length: 50 }),
    isExporting: false,
};

const nationalTestCreatorSlice = createSlice({
    name: 'nationalTestCreator',
    initialState,
    reducers: {
        resetTHPGQGTestCreator: () => {
            return { ...initialState };
        },

        setNationalIsExporting: (state, action: PayloadAction<boolean>) => {
            state.isExporting = action.payload;
        },

        setNationalCurrentQuestionId: (
            state,
            action: PayloadAction<number>,
        ) => {
            state.currentQuestionId = action.payload;
        },

        setNationalQuestionFieldById: (
            state: NationalTestCreatorState,
            action: PayloadAction<{
                questionOrder: number;
                field: keyof Question;
                value: Question[keyof Question];
            }>,
        ) => {
            const { questionOrder, field, value } = action.payload;
            const indexInQuestions = state.questions.findIndex(
                (question) => question.questionOrder === questionOrder,
            );
            if (state.questions[indexInQuestions]) {
                state.questions[indexInQuestions] = {
                    ...state.questions[indexInQuestions],
                    [field]: value,
                };
            }
        },

        setNationalTestField: <K extends keyof NationalTestCreatorState>(
            state: NationalTestCreatorState,
            action: PayloadAction<{
                field: K;
                value: NationalTestCreatorState[K];
            }>,
        ) => {
            if (action.payload.field === 'totalQuestions') {
                const newTotal = action.payload.value as number;
                if (newTotal < 1 || newTotal > 100) return;

                const currentTotal = state.totalQuestions;

                if (newTotal < currentTotal) {
                    state.questions.splice(newTotal, currentTotal - newTotal);
                } else {
                    for (let i = currentTotal; i < newTotal; i++) {
                        state.questions.push({
                            ...initQuestion,
                            questionOrder: i + 1,
                        });
                    }
                }
                state.totalQuestions = newTotal;
                return;
            }
            (state[action.payload.field] as typeof action.payload.value) =
                action.payload.value;
        },

        setNationalTotalQuestions: (state, action: PayloadAction<number>) => {
            const newTotal = action.payload;
            if (newTotal < 1 || newTotal > 100) return;

            const newQuestions = { ...state.questions };
            const currentTotal = state.totalQuestions;

            if (newTotal < currentTotal) {
                for (let i = newTotal; i < currentTotal; i++) {
                    delete newQuestions[i];
                }
            } else {
                for (let i = currentTotal; i < newTotal; i++) {
                    newQuestions[i] = { ...initQuestion };
                }
            }

            state.totalQuestions = newTotal;
            state.questions = newQuestions;
        },
    },
});

export const {
    resetTHPGQGTestCreator,
    setNationalIsExporting,
    setNationalCurrentQuestionId,
    setNationalQuestionFieldById,
    setNationalTestField,
    setNationalTotalQuestions,
} = nationalTestCreatorSlice.actions;
export default nationalTestCreatorSlice.reducer;

export const selectNationalTestField = <
    T extends keyof NationalTestCreatorState,
>(
    state: { nationalTestCreator: NationalTestCreatorState },
    field: T,
): NationalTestCreatorState[T] => state.nationalTestCreator[field];

export const selectNationalQuestionFieldById: SelectQuestionFieldById = (
    state,
    questionOrder,
    field,
) => {
    if (!state.nationalTestCreator) return '';
    const indexInQuestions = questionOrder - 1;
    return state.nationalTestCreator.questions[indexInQuestions][field];
};

export const selectNationalCurrentQuestionId = (state: RootState) =>
    state.nationalTestCreator.currentQuestionId;

export const selectNationalQuestions = (state: RootState) =>
    state.nationalTestCreator.questions;
