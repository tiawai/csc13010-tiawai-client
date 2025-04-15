'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Test } from '@/types/test.type';
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
}

const initialState: TestState = {
    test: {} as Test,
    questions: [],
    answers: [],
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
        },

        resetTest: (state) => {
            state.test = {} as Test;
            state.questions = [];
            state.answers = [];
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
    },
});

export const { setTest, resetTest, setAnswer } = testSlice.actions;
export default testSlice.reducer;

export const selectAnswerByQuestionOrder =
    (questionOrder: number) =>
    (state: RootState): Answer =>
        state.test.answers[questionOrder - 1];
