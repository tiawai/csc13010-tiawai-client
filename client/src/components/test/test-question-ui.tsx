import { Form, Input } from 'antd';
import { FormLabel } from './form-ui';
import { NationalTestCreatorState } from '@/lib/slices/national-test-creator';
import { ToeicTestCreatorState } from '@/lib/slices/toeic-test-creator';
import type { TestType } from '@/lib/hooks/test';

export interface TestQuestionProps<T extends TestType> {
    getField: <
        K extends keyof (T extends 'national'
            ? NationalTestCreatorState
            : ToeicTestCreatorState),
    >(
        field: K,
    ) => (T extends 'national'
        ? NationalTestCreatorState
        : ToeicTestCreatorState)[K];

    setField: <
        K extends keyof (T extends 'national'
            ? NationalTestCreatorState
            : ToeicTestCreatorState),
    >(
        field: K,
        value: (T extends 'national'
            ? NationalTestCreatorState
            : ToeicTestCreatorState)[K],
    ) => void;
}

export const TestQuestionTitle = <T extends TestType>({
    getField,
    setField,
}: TestQuestionProps<T>) => {
    const title = getField('title');
    return (
        <Form.Item
            label={<FormLabel label="Tên đề" />}
            name="title"
            rules={[
                {
                    required: true,
                    message: 'Tên đề không được bỏ trống',
                },
            ]}
        >
            <Input
                placeholder="Nhập tên đề"
                className="!rounded-full !bg-[#E9DAE9] !placeholder-black/50"
                variant="filled"
                value={title}
                onChange={(e) => setField('title', e.target.value)}
            />
        </Form.Item>
    );
};

export const TestQuestionTotalQuestions = <T extends 'national'>({
    getField,
    setField,
}: TestQuestionProps<T>) => {
    const totalQuestions = getField('totalQuestions');
    return (
        <Form.Item
            label={<FormLabel label="Số lượng câu hỏi" />}
            name="totalQuestions"
            rules={[
                {
                    required: true,
                    message: 'Số lượng câu hỏi không được bỏ trống',
                },
            ]}
        >
            <Input
                placeholder="Nhập số lượng câu hỏi"
                className="!rounded-full !bg-[#E9DAE9] !placeholder-black/50"
                value={totalQuestions}
                variant="filled"
                type="number"
                min={1}
                max={100}
                onChange={(e) => setField('totalQuestions', +e.target.value)}
            />
        </Form.Item>
    );
};

export const TestQuestionDuration = <T extends TestType>({
    getField,
    setField,
}: TestQuestionProps<T>) => {
    const duration = getField('duration');
    return (
        <Form.Item
            label={<FormLabel label="Thời gian làm bài" />}
            name="duration"
            rules={[
                {
                    required: true,
                    message: 'Thời gian làm bài không được bỏ trống',
                },
            ]}
        >
            <Input
                placeholder="Nhập thời gian làm bài (phút)"
                className="!rounded-full !bg-[#E9DAE9] !placeholder-black/50"
                value={duration}
                variant="filled"
                type="number"
                min={1}
                onChange={(e) => setField('duration', +e.target.value)}
            />
        </Form.Item>
    );
};
