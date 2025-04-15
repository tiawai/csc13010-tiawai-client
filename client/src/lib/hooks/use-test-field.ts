/* eslint-disable */
import { useAppDispatch, useAppSelector } from './hook';
import {
    selectNationalTestField,
    setNationalTestField,
} from '@/lib/slices/national-test-creator.slice';
import {
    selectToeicTestField,
    setToeicTestField,
} from '@/lib/slices/toeic-test-creator.slice';
import type { NationalTestCreatorState } from '@/lib/slices/national-test-creator.slice';
import type { ToeicTestCreatorState } from '@/lib/slices/toeic-test-creator.slice';
import type { RootState } from '@/lib/store/store';

export type TestType = 'national' | 'toeic';

const testConfig = {
    national: {
        selectField: selectNationalTestField,
        setField: setNationalTestField,
    },
    toeic: {
        selectField: selectToeicTestField,
        setField: setToeicTestField,
    },
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
