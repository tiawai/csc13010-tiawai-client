/* eslint-disable */
import { useAppDispatch, useAppSelector } from './hook';
import { Question } from '@/types/question';
import {
    selectNationalTestField,
    selectNationalQuestionFieldById,
    setNationalQuestionFieldById,
    setNationalTestField,
} from '@/lib/slices/national-test-creator';
import {
    selectToeicTestField,
    selectToeicQuestionFieldById,
    setToeicQuestionFieldById,
    setToeicTestField,
} from '@/lib/slices/toeic-test-creator';
import type { NationalTestCreatorState } from '@/lib/slices/national-test-creator';
import type { ToeicTestCreatorState } from '@/lib/slices/toeic-test-creator';
import type { RootState } from '@/lib/store/store';

export type TestType = 'national' | 'toeic';

const testConfig = {
    national: {
        selectField: selectNationalTestField,
        setField: setNationalTestField,
        selectQuestionField: selectNationalQuestionFieldById,
        setQuestionField: setNationalQuestionFieldById,
    },
    toeic: {
        selectField: selectToeicTestField,
        setField: setToeicTestField,
        selectQuestionField: selectToeicQuestionFieldById,
        setQuestionField: setToeicQuestionFieldById,
    },
};

export const useQuestionField = (testType: TestType, questionId: number) => {
    const dispatch = useAppDispatch();

    const getField = (field: keyof Question) =>
        useAppSelector((state) => {
            const selectQuestionField =
                testConfig[testType].selectQuestionField;
            return selectQuestionField(state, questionId, field);
        });

    const setField = (
        field: keyof Question,
        value: Question[keyof Question],
    ) => {
        const setQuestionField = testConfig[testType].setQuestionField;
        dispatch(setQuestionField({ questionId, field, value }));
    };

    return { getField, setField };
};

export const useTestField = <T extends TestType>(testType: T) => {
    const dispatch = useAppDispatch();

    const getField = <
        K extends keyof (T extends 'national'
            ? NationalTestCreatorState
            : ToeicTestCreatorState),
    >(
        field: K,
    ) => {
        const selector = testConfig[testType].selectField as unknown as (
            state: RootState,
            field: K,
        ) => (T extends 'national'
            ? NationalTestCreatorState
            : ToeicTestCreatorState)[K];

        return useAppSelector((state) => selector(state, field));
    };

    const setField = <
        K extends keyof (T extends 'national'
            ? NationalTestCreatorState
            : ToeicTestCreatorState),
    >(
        field: K,
        value: (T extends 'national'
            ? NationalTestCreatorState
            : ToeicTestCreatorState)[K],
    ) => {
        const actionCreator = testConfig[testType]
            .setField as unknown as (payload: {
            field: K;
            value: typeof value;
        }) => { type: string; payload: { field: K; value: typeof value } };
        dispatch(actionCreator({ field, value }));
    };

    return { getField, setField };
};
