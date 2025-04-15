'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question, QuestionUtils } from '@/types/question.type';
import type { SelectQuestionFieldById } from '@/types/question.type';

export const TOEIC_READING_PARTS = {
    part5: 30,
    part6: 16,
    part7: 54,
};
export const TOEIC_LISTENING_PARTS = {
    part1: 6,
    part2: 25,
    part3: 39,
    part4: 30,
};

export type ReadingPart = 'part5' | 'part6' | 'part7';
export type ListeningPart = 'part1' | 'part2' | 'part3' | 'part4';
export type ToeicTestType = 'reading' | 'listening';

export const toeicTestInfo: Record<
    ToeicTestType,
    {
        duration: number;
        firstPart: string;
        lastPart: string;
        parts: string[];
        init: Record<string, Question[]>;
    }
> = {
    reading: {
        duration: 75,
        firstPart: 'part5',
        lastPart: 'part7',
        parts: ['part5', 'part6', 'part7'],
        init: {
            part5: QuestionUtils.initListQuestions(
                TOEIC_READING_PARTS.part5,
                0,
            ),
            part6: QuestionUtils.initListQuestions(
                TOEIC_READING_PARTS.part6,
                TOEIC_READING_PARTS.part5,
            ),
            part7: QuestionUtils.initListQuestions(
                TOEIC_READING_PARTS.part7,
                TOEIC_READING_PARTS.part5 + TOEIC_READING_PARTS.part6,
            ),
        },
    },
    listening: {
        duration: 45,
        firstPart: 'part1',
        lastPart: 'part4',
        parts: ['part1', 'part2', 'part3', 'part4'],
        init: {
            part1: QuestionUtils.initListQuestions(
                TOEIC_LISTENING_PARTS.part1,
                0,
            ),
            part2: QuestionUtils.initListQuestions(
                TOEIC_LISTENING_PARTS.part2,
                TOEIC_LISTENING_PARTS.part1,
            ),
            part3: QuestionUtils.initListQuestions(
                TOEIC_LISTENING_PARTS.part3,
                TOEIC_LISTENING_PARTS.part1 + TOEIC_LISTENING_PARTS.part2,
            ),
            part4: QuestionUtils.initListQuestions(
                TOEIC_LISTENING_PARTS.part4,
                TOEIC_LISTENING_PARTS.part1 +
                    TOEIC_LISTENING_PARTS.part2 +
                    TOEIC_LISTENING_PARTS.part3,
            ),
        },
    },
};

export interface ToeicTestCreatorState {
    testType: ToeicTestType;
    title: string;
    startDate: string;
    endDate: string;
    duration: number;
    currentPart: string;
    currentPartLength: number;
    currentQuestionId: number;
    isSelectBasic: boolean;
    basic: Record<ToeicTestType, Basic>;
    questions: Record<string, Question[]>;
    readonly totalQuestions: number;
    isExporting: boolean;
}

export interface Basic {
    title: string;
    startDate: string;
    endDate: string;
    isSelectBasic: boolean;
}

const initialState: ToeicTestCreatorState = {
    testType: 'reading',
    title: '',
    startDate: '',
    endDate: '',
    duration: toeicTestInfo.reading.duration,
    currentPart: toeicTestInfo.reading.firstPart,
    currentPartLength: TOEIC_READING_PARTS.part5,
    currentQuestionId: 1,
    isSelectBasic: true,
    basic: {
        reading: {
            title: '',
            startDate: '',
            endDate: '',
            isSelectBasic: true,
        },
        listening: {
            title: '',
            startDate: '',
            endDate: '',
            isSelectBasic: true,
        },
    },
    questions: {
        ...toeicTestInfo.reading.init,
        ...toeicTestInfo.listening.init,
    },
    totalQuestions: 100,
    isExporting: false,
};

const toeicTestCreatorSlice = createSlice({
    name: 'toeicTestCreator',
    initialState,
    reducers: {
        resetToeicTestCreator: () => initialState,

        resetQuestiionsByTestType: (state) => {
            state.currentPart = toeicTestInfo[state.testType].firstPart;
            state.currentPartLength = state.questions[state.currentPart].length;
            state.currentQuestionId = 1;
            state.questions = {
                ...state.questions,
                ...toeicTestInfo[state.testType].init,
            };
        },

        setToeicTestType: (state, action: PayloadAction<ToeicTestType>) => {
            const preType = state.testType;
            state.basic[preType].title = state.title;
            state.basic[preType].startDate = state.startDate;
            state.basic[preType].endDate = state.endDate;
            state.basic[preType].isSelectBasic = state.isSelectBasic;

            const testType = action.payload;
            state.testType = testType;
            state.title = state.basic[testType].title;
            state.startDate = state.basic[testType].startDate;
            state.endDate = state.basic[testType].endDate;
            state.isSelectBasic = state.basic[testType].isSelectBasic;
            state.currentPart = toeicTestInfo[testType].firstPart;
            state.currentPartLength = state.questions[state.currentPart].length;
            state.duration = toeicTestInfo[testType].duration;
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
            state.currentQuestionId = state.questions[part][0].questionOrder;
        },

        setCurrentQuestionId: (state, action: PayloadAction<number>) => {
            const questionsPart = state.questions[state.currentPart];
            const indexInPart = questionsPart.findIndex(
                (q) => q.questionOrder === action.payload,
            );
            if (indexInPart >= 0 && indexInPart < questionsPart.length) {
                state.currentQuestionId = action.payload;
            }
        },

        setToeicQuestionFieldById: (
            state: ToeicTestCreatorState,
            action: PayloadAction<{
                questionOrder: number;
                field: keyof Question;
                value: Question[keyof Question];
            }>,
        ) => {
            const { questionOrder, field, value } = action.payload;
            const currentPart = state.questions[state.currentPart];
            const indexInPart = currentPart.findIndex(
                (q) => q.questionOrder === questionOrder,
            );
            if (indexInPart >= 0 && indexInPart < currentPart.length) {
                if (field === 'subQuestions') {
                    handleSubQuestions(state, questionOrder, value as number);
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
                (q) => q.questionOrder === currentQuestionId,
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
                subQuestions.push(subQuestion.questionOrder);
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
    questionOrder: number,
    numberSubQuestions: number,
) => {
    const currentPart = state.currentPart;
    const indexInPart = state.questions[currentPart].findIndex(
        (q) => q.questionOrder === questionOrder,
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
                state.questions[currentPart][i].parentQuestion === questionOrder
            ) {
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
        subQuestions.push(subQuestion.questionOrder);
        subQuestion.parentQuestion = questionOrder;
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
    questionOrder,
    field,
) => {
    if (!state.toeicTestCreator) {
        return '';
    }

    const { currentPart, questions } = state.toeicTestCreator;
    const question =
        questions[currentPart].find(
            (q: Question) => q.questionOrder === questionOrder,
        ) || questions[currentPart][0];
    return question?.[field] ?? '';
};

export const selectQuestionById = (
    state: { toeicTestCreator: ToeicTestCreatorState },
    questionOrder: number,
) => {
    const { currentPart, questions } = state.toeicTestCreator;
    return (
        questions[currentPart].find((q) => q.questionOrder === questionOrder) ||
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
    const parts = toeicTestInfo[testType].parts;
    const index = parts.indexOf(currentPart);
    return parts[index - 1] || currentPart;
};

export const selectNextPart = (state: {
    toeicTestCreator: ToeicTestCreatorState;
}) => {
    const { currentPart, testType } = state.toeicTestCreator;
    const parts = toeicTestInfo[testType].parts;
    const index = parts.indexOf(currentPart);
    return parts[index + 1] || currentPart;
};

export const selectFirstPart = (state: {
    toeicTestCreator: ToeicTestCreatorState;
}) => toeicTestInfo[state.toeicTestCreator.testType].firstPart;

export const selectLastPart = (state: {
    toeicTestCreator: ToeicTestCreatorState;
}) => toeicTestInfo[state.toeicTestCreator.testType].lastPart;

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
            (q) => q.questionOrder === currentQuestionId,
        ) || questions[currentPart][0]
    );
};

export const selectReadingQuestions = (state: {
    toeicTestCreator: ToeicTestCreatorState;
}) => {
    const { questions } = state.toeicTestCreator;
    return Object.keys(questions)
        .filter((part) => part in TOEIC_READING_PARTS)
        .reduce((acc, part) => {
            return [...acc, ...questions[part]];
        }, [] as Question[]);
};

export const selectListeningQuestions = (state: {
    toeicTestCreator: ToeicTestCreatorState;
}) => {
    const { questions } = state.toeicTestCreator;
    return Object.keys(questions)
        .filter((part) => part in TOEIC_LISTENING_PARTS)
        .reduce((acc, part) => {
            return [...acc, ...questions[part]];
        }, [] as Question[]);
};

export const selectIsExporting = (state: {
    toeicTestCreator: ToeicTestCreatorState;
}) => state.toeicTestCreator.isExporting;
