import { Form, Input } from 'antd';
import { FormLabel } from './form-ui';
import { NationalTestCreatorState } from '@/lib/slices/national-test-creator.slice';
import { ToeicTestCreatorState } from '@/lib/slices/toeic-test-creator.slice';
import type { TestType } from '@/lib/hooks/use-test-field';

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
            initialValue={title}
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

export const TestQuestionStartDate = <T extends TestType>({
    getField,
    setField,
}: TestQuestionProps<T>) => {
    const startDate = getField('startDate');
    return (
        <Form.Item
            label={<FormLabel label="Ngày bắt đầu" />}
            initialValue={startDate}
            name="startDate"
            rules={[
                {
                    required: true,
                    message: 'Ngày bắt đầu không được bỏ trống',
                },
            ]}
        >
            <Input
                placeholder="Nhập ngày bắt đầu (YYYY-MM-DD)"
                className="!rounded-full !bg-[#E9DAE9] !placeholder-black/50"
                variant="filled"
                type="date"
                value={startDate}
                onChange={(e) => setField('startDate', e.target.value)}
            />
        </Form.Item>
    );
};

export const TestQuestionEndDate = <T extends TestType>({
    getField,
    setField,
}: TestQuestionProps<T>) => {
    const endDate = getField('endDate');

    return (
        <Form.Item
            label={<FormLabel label="Ngày kết thúc" />}
            initialValue={endDate}
            name="endDate"
            rules={[
                {
                    required: true,
                    message: 'Ngày kết thúc không được bỏ trống',
                },
            ]}
        >
            <Input
                placeholder="Nhập ngày kết thúc (YYYY-MM-DD)"
                className="!rounded-full !bg-[#E9DAE9] !placeholder-black/50"
                variant="filled"
                type="date"
                value={endDate}
                onChange={(e) => setField('endDate', e.target.value)}
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
