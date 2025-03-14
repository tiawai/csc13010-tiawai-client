'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question, initListQuestions } from '@/types/question';
import type { SelectQuestionFieldById } from '@/types/question';

const TOEIC_READING_PARTS = {
    part5: 16,
    part6: 30,
    part7: 54,
};
const TOEIC_LISTENING_PARTS = {
    part1: 6,
    part2: 25,
    part3: 39,
    part4: 30,
};

export type ReadingPart = 'part5' | 'part6' | 'part7';
export type ListeningPart = 'part1' | 'part2' | 'part3' | 'part4';
export type ToeicTestType = 'reading' | 'listening';

const testInfo: Record<
    ToeicTestType,
    {
        title: string;
        duration: number;
        firstPart: string;
        lastPart: string;
        parts: string[];
        init: Record<string, Question[]>;
    }
> = {
    reading: {
        title: 'Reading',
        duration: 75,
        firstPart: 'part5',
        lastPart: 'part7',
        parts: ['part5', 'part6', 'part7'],
        init: {
            part5: initListQuestions({
                length: TOEIC_READING_PARTS.part5,
                offset: 0,
            }),
            part6: initListQuestions({
                length: TOEIC_READING_PARTS.part6,
                offset: TOEIC_READING_PARTS.part5,
            }),
            part7: initListQuestions({
                length: TOEIC_READING_PARTS.part7,
                offset: TOEIC_READING_PARTS.part5 + TOEIC_READING_PARTS.part6,
            }),
        },
    },
    listening: {
        title: 'Listening',
        duration: 45,
        firstPart: 'part1',
        lastPart: 'part4',
        parts: ['part1', 'part2', 'part3', 'part4'],
        init: {
            part1: initListQuestions({
                length: TOEIC_LISTENING_PARTS.part1,
                offset: 0,
            }),
            part2: initListQuestions({
                length: TOEIC_LISTENING_PARTS.part2,
                offset: TOEIC_LISTENING_PARTS.part1,
            }),
            part3: initListQuestions({
                length: TOEIC_LISTENING_PARTS.part3,
                offset:
                    TOEIC_LISTENING_PARTS.part1 + TOEIC_LISTENING_PARTS.part2,
            }),
            part4: initListQuestions({
                length: TOEIC_LISTENING_PARTS.part4,
                offset:
                    TOEIC_LISTENING_PARTS.part1 +
                    TOEIC_LISTENING_PARTS.part2 +
                    TOEIC_LISTENING_PARTS.part3,
            }),
        },
    },
};

export interface ToeicTestCreatorState {
    testType: ToeicTestType;
    title: string;
    duration: number;
    currentPart: string;
    currentPartLength: number;
    currentQuestionId: number;
    questions: Record<string, Question[]>;
    isExporting: boolean;
}

const initialState: ToeicTestCreatorState = {
    testType: 'reading',
    title: testInfo.reading.title,
    duration: testInfo.reading.duration,
    currentPart: testInfo.reading.firstPart,
    currentPartLength: TOEIC_READING_PARTS.part5,
    currentQuestionId: 1,
    questions: {
        ...testInfo.reading.init,
        ...testInfo.listening.init,
    },
    isExporting: false,
};

const toeicTestCreatorSlice = createSlice({
    name: 'toeicTestCreator',
    initialState,
    reducers: {
        resetToeicTestCreator: () => initialState,

        resetQuestiionsByTestType: (state) => {
            state.currentPart = testInfo[state.testType].firstPart;
            state.currentPartLength = state.questions[state.currentPart].length;
            state.currentQuestionId = 1;
            state.questions = {
                ...state.questions,
                ...testInfo[state.testType].init,
            };
        },

        setToeicTestType: (state, action: PayloadAction<ToeicTestType>) => {
            const testType = action.payload;
            state.testType = testType;
            state.title = testInfo[testType].title;
            state.currentPart = testInfo[testType].firstPart;
            state.currentPartLength = state.questions[state.currentPart].length;
            state.duration = testInfo[testType].duration;
            state.currentQuestionId = 1;
        },

        setToeicTestField: <K extends keyof ToeicTestCreatorState>(
            state: ToeicTestCreatorState,
            action: PayloadAction<{
                field: K;
                value: ToeicTestCreatorState[K];
            }>,
        ) => {
            state[action.payload.field] = action.payload.value;
        },

        setCurrentPart: (state, action: PayloadAction<string>) => {
            const part = action.payload;
            state.currentPart = part;
            state.currentPartLength = state.questions[part].length;
            state.currentQuestionId = state.questions[part][0].questionId;
        },

        setCurrentQuestionId: (state, action: PayloadAction<number>) => {
            const questionsPart = state.questions[state.currentPart];
            const indexInPart = questionsPart.findIndex(
                (q) => q.questionId === action.payload,
            );
            if (indexInPart >= 0 && indexInPart < questionsPart.length) {
                state.currentQuestionId = action.payload;
            }
        },

        setToeicQuestionFieldById: (
            state: ToeicTestCreatorState,
            action: PayloadAction<{
                questionId: number;
                field: keyof Question;
                value: Question[keyof Question];
            }>,
        ) => {
            const { questionId, field, value } = action.payload;
            const currentPart = state.questions[state.currentPart];
            const indexInPart = currentPart.findIndex(
                (q) => q.questionId === questionId,
            );
            if (indexInPart >= 0 && indexInPart < currentPart.length) {
                if (field === 'subQuestions') {
                    handleSubQuestions(state, questionId, value as number);
                } else {
                    (currentPart[indexInPart][field] as typeof value) = value;
                }
            }
        },

        setSubQuestions: (state, action: PayloadAction<number>) => {
            const numberSubQuestions = action.payload;
            const currentPart = state.currentPart;
            const currentQuestionId = state.currentQuestionId;
            const indexInPart = state.questions[currentPart].findIndex(
                (q) => q.questionId === currentQuestionId,
            );
            const question = state.questions[currentPart][indexInPart];

            if (!numberSubQuestions || question.subQuestions) {
                delete state.questions[currentPart][indexInPart].subQuestions;
                for (
                    let i = indexInPart;
                    i < Math.min(indexInPart + 5, state.currentPartLength);
                    i++
                ) {
                    if (
                        state.questions[currentPart][i].parentQuestion ===
                        currentQuestionId
                    ) {
                        delete state.questions[currentPart][i].parentQuestion;
                    }
                }
            }

            const subQuestions = [];
            for (
                let i = indexInPart;
                i <
                Math.min(
                    indexInPart + numberSubQuestions,
                    state.currentPartLength,
                );
                i++
            ) {
                const subQuestion = state.questions[currentPart][i];
                if (subQuestion?.parentQuestion) {
                    break;
                }
                subQuestions.push(subQuestion.questionId);
                subQuestion.parentQuestion = currentQuestionId;
            }

            if (subQuestions.length <= 1) {
                delete state.questions[currentPart][indexInPart].subQuestions;
                delete state.questions[currentPart][indexInPart].parentQuestion;
                return;
            }

            state.questions[currentPart][indexInPart].subQuestions =
                subQuestions;
        },

        setIsExporting: (state, action: PayloadAction<boolean>) => {
            state.isExporting = action.payload;
        },
    },
});

export const {
    // reset
    resetToeicTestCreator,
    resetQuestiionsByTestType,

    // set test fields
    setToeicTestType,
    setToeicTestField,
    setCurrentPart,
    setCurrentQuestionId,

    // set question fields
    setToeicQuestionFieldById,
    setSubQuestions,
    setIsExporting,
} = toeicTestCreatorSlice.actions;

export default toeicTestCreatorSlice.reducer;

const handleSubQuestions = (
    state: ToeicTestCreatorState,
    questionId: number,
    numberSubQuestions: number,
) => {
    const currentPart = state.currentPart;
    const indexInPart = state.questions[currentPart].findIndex(
        (q) => q.questionId === questionId,
    );
    const question = state.questions[currentPart][indexInPart];

    if (!numberSubQuestions || question.subQuestions) {
        delete state.questions[currentPart][indexInPart].subQuestions;
        for (
            let i = indexInPart;
            i < Math.min(indexInPart + 5, state.currentPartLength);
            i++
        ) {
            if (state.questions[currentPart][i].parentQuestion === questionId) {
                delete state.questions[currentPart][i].parentQuestion;
            }
        }
    }

    const subQuestions = [];
    for (
        let i = indexInPart;
        i < Math.min(indexInPart + numberSubQuestions, state.currentPartLength);
        i++
    ) {
        const subQuestion = state.questions[currentPart][i];
        if (subQuestion?.parentQuestion) {
            break;
        }
        subQuestions.push(subQuestion.questionId);
        subQuestion.parentQuestion = questionId;
    }

    if (subQuestions.length <= 1) {
        delete state.questions[currentPart][indexInPart].subQuestions;
        delete state.questions[currentPart][indexInPart].parentQuestion;
        return;
    }

    state.questions[currentPart][indexInPart].subQuestions = subQuestions;
};

export const selectToeicTestField = <K extends keyof ToeicTestCreatorState>(
    state: { toeicTestCreator: ToeicTestCreatorState },
    field: K,
) => state.toeicTestCreator[field];

export const selectToeicQuestionFieldById: SelectQuestionFieldById = (
    state,
    questionId,
    field,
) => {
    if (!state.toeicTestCreator) {
        return '';
    }

    const { currentPart, questions } = state.toeicTestCreator;
    const question =
        questions[currentPart].find(
            (q: Question) => q.questionId === questionId,
        ) || questions[currentPart][0];
    return question?.[field] ?? '';
};

export const selectQuestionById = (
    state: { toeicTestCreator: ToeicTestCreatorState },
    questionId: number,
) => {
    const { currentPart, questions } = state.toeicTestCreator;
    return (
        questions[currentPart].find((q) => q.questionId === questionId) ||
        questions[currentPart][0]
    );
};

export const selectTestType = (state: {
    toeicTestCreator: ToeicTestCreatorState;
}) => state.toeicTestCreator.testType;

export const selectCurrentPart = (state: {
    toeicTestCreator: ToeicTestCreatorState;
}) => state.toeicTestCreator.currentPart;

export const selectPreviousPart = (state: {
    toeicTestCreator: ToeicTestCreatorState;
}) => {
    const { currentPart, testType } = state.toeicTestCreator;
    const parts = testInfo[testType].parts;
    const index = parts.indexOf(currentPart);
    return parts[index - 1] || currentPart;
};

export const selectNextPart = (state: {
    toeicTestCreator: ToeicTestCreatorState;
}) => {
    const { currentPart, testType } = state.toeicTestCreator;
    const parts = testInfo[testType].parts;
    const index = parts.indexOf(currentPart);
    return parts[index + 1] || currentPart;
};

export const selectLastPart = (state: {
    toeicTestCreator: ToeicTestCreatorState;
}) => testInfo[state.toeicTestCreator.testType].lastPart;

export const selectCurrentQuestionId = (state: {
    toeicTestCreator: ToeicTestCreatorState;
}) => state.toeicTestCreator.currentQuestionId;

export const selectCurrentQuestions = (state: {
    toeicTestCreator: ToeicTestCreatorState;
}) => state.toeicTestCreator.questions[state.toeicTestCreator.currentPart];

export const selectCurrentQuestion = (state: {
    toeicTestCreator: ToeicTestCreatorState;
}) => {
    const { currentPart, currentQuestionId, questions } =
        state.toeicTestCreator;
    return (
        questions[currentPart].find(
            (q) => q.questionId === currentQuestionId,
        ) || questions[currentPart][0]
    );
};

export const selectIsExporting = (state: {
    toeicTestCreator: ToeicTestCreatorState;
}) => state.toeicTestCreator.isExporting;
