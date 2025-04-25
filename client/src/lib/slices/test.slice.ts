'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Test, TestResult } from '@/types/test.type';
import {
    Question,
    Answer,
    QuestionUtils,
    ChoicesType,
} from '@/types/question.type';
import { RootState } from '../store/store';

export interface TestState {
    test: Test;
    questions: Question[];
    answers: Answer[];
    result?: TestResult;
    timeStart?: string;
    timeConsumed: number;
}

const initialState: TestState = {
    test: {} as Test,
    questions: [],
    answers: [],
    result: undefined,
    timeStart: undefined,
    timeConsumed: 0,
};

const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        setTest: (
            state,
            action: PayloadAction<{
                test: Test;
                questions: Question[];
            }>,
        ) => {
            state.test = action.payload.test;
            state.questions = action.payload.questions;
            state.answers = QuestionUtils.initListAnswers(
                action.payload.questions,
            );
            state.result = undefined;
        },

        resetTest: (state) => {
            state.test = {} as Test;
            state.questions = [];
            state.answers = [];
            state.timeConsumed = 0;
            state.result = undefined;
        },

        setAnswer: (
            state,
            action: PayloadAction<{
                questionOrder: number;
                choice: ChoicesType;
            }>,
        ) => {
            const { questionOrder, choice } = action.payload;
            state.answers[questionOrder - 1].answer = choice;
        },

        setResetSubmit: (state) => {
            state.answers = QuestionUtils.initListAnswers(state.questions);
            state.timeConsumed = 0;
        },

        setResults: (state, action: PayloadAction<TestResult>) => {
            state.result = action.payload;
        },

        setTimeConsumed: (state, action: PayloadAction<number>) => {
            state.timeConsumed = action.payload;
        },
    },
});

export const {
    setTest,
    resetTest,
    setAnswer,
    setResults,
    setTimeConsumed,
    setResetSubmit,
} = testSlice.actions;
export default testSlice.reducer;

export const selectAnswerByQuestionOrder =
    (questionOrder: number) =>
    (state: RootState): Answer =>
        state.test.answers.find(
            (answer) => answer.questionOrder === questionOrder,
        ) || state.test.answers[questionOrder - 1];
