/* eslint-disable */
import { useAppDispatch, useAppSelector } from './hook';
import { Question } from '@/types/question.type';
import {
    selectNationalQuestionFieldById,
    setNationalQuestionFieldById,
} from '@/lib/slices/national-test-creator.slice';
import {
    selectToeicQuestionFieldById,
    setToeicQuestionFieldById,
} from '@/lib/slices/toeic-test-creator.slice';

export type TestType = 'national' | 'toeic';

const testConfig = {
    national: {
        selectQuestionField: selectNationalQuestionFieldById,
        setQuestionField: setNationalQuestionFieldById,
    },
    toeic: {
        selectQuestionField: selectToeicQuestionFieldById,
        setQuestionField: setToeicQuestionFieldById,
    },
};

export const useQuestionField = (testType: TestType, questionOrder: number) => {
    const dispatch = useAppDispatch();

    const getField = (field: keyof Question) =>
        useAppSelector((state) => {
            const selectQuestionField =
                testConfig[testType].selectQuestionField;
            return selectQuestionField(state, questionOrder, field);
        });

    const setField = (
        field: keyof Question,
        value: Question[keyof Question],
    ) => {
        const setQuestionField = testConfig[testType].setQuestionField;
        dispatch(setQuestionField({ questionOrder, field, value }));
    };

    return { getField, setField };
};
