'use client';
import { useEffect, memo } from 'react';
import { Form } from 'antd';
// import { useCreateExamMutation } from "@/services/admin";
import { useAppSelector, useAppDispatch } from '@/lib/hooks/hook';
import {
    selectNationalQuestions,
    // setNationalTestCreatorField,
    setNationalCurrentQuestionId,
    selectNationalCurrentQuestionId,
    // selectTHPTGQTestCreatorField,
} from '@/lib/slices/national-test-creator';
import { FormLayout, FormQuestionNavigation } from './form-ui';
import { FormFooter } from './form-national-ui';
import {
    TestQuestionTitle,
    TestQuestionDuration,
    TestQuestionTotalQuestions,
} from './test-question-ui';
import {
    QuestionContent,
    QuestionParagraph,
    QuestionChoices,
    QuestionExplanation,
} from './question-ui';
import { FormQuestionTitle, FormQuestionLayout } from './form-ui';
import { useTestField, useQuestionField } from '@/lib/hooks/test';

export const FormNational = memo(() => {
    const dispatch = useAppDispatch();

    // const [createExam, { isLoading }] = useCreateExamMutation();
    const [form] = Form.useForm();
    const duration = useAppSelector(
        (state) => state.nationalTestCreator.duration,
    );
    const totalQuestions = useAppSelector(
        (state) => state.nationalTestCreator.totalQuestions,
    );

    const onFinish = async () => {
        // const values = form.getFieldsValue();
        // const exam: Exam = {
        //     title: values.title,
        //     totalQuestions: +values.totalQuestions,
        //     duration: +values.duration,
        //     questions: Object.values(questions).map((question) => {
        //         if (!question.hasParagraph && question.paragraph) {
        //             delete question.paragraph;
        //         }
        //         return question;
        //     }),
        // };
        // const res = await createExam(exam);
        // if (!res || res) {
        //     notification.success({
        //         message: "Đăng đề thành công",
        //         description: "Đề thi đã được đăng thành công.",
        //     });
        //     await dispatch(resetTestCreator());
        //     form.resetFields();
        //     setReset(!reset);
        // } else {
        //     notification.error({
        //         message: "Đăng đề thất bại",
        //         description: "Vui lòng kiểm tra lại.",
        //     });
        // }
    };

    useEffect(() => {
        form.setFieldsValue({ totalQuestions, duration });
    }, [form, totalQuestions, duration]);

    useEffect(() => {
        dispatch(setNationalCurrentQuestionId(1));
        // form.setFieldsValue({ totalQuestions, duration });
    }, [dispatch]);

    return (
        <Form
            form={form}
            layout="vertical"
            size="large"
            onFinish={onFinish}
            initialValues={{ remember: false }}
        >
            <div className="space-y-6">
                <FormBasic />
                <FormLayout
                    navigator={
                        <FormQuestionNavigation
                            selectCurrentQuestionId={
                                selectNationalCurrentQuestionId
                            }
                            selectCurrentQuestions={selectNationalQuestions}
                            setCurrentQuestionId={setNationalCurrentQuestionId}
                        />
                    }
                    questions={<FormQuestions />}
                />
                <FormFooter />
            </div>
        </Form>
    );
});

FormNational.displayName = 'FormNational';

const FormBasic = memo(() => {
    const { getField, setField } = useTestField('national');
    return (
        <>
            <TestQuestionTitle<'national'>
                getField={getField}
                setField={setField}
            />
            <div className="grid grid-cols-2 gap-8">
                <TestQuestionTotalQuestions
                    getField={getField}
                    setField={setField}
                />
                <TestQuestionDuration<'national'>
                    getField={getField}
                    setField={setField}
                />
            </div>
        </>
    );
});

FormBasic.displayName = 'FormBasic';

const FormQuestions = memo(() => {
    const currentQuestionId = useAppSelector(selectNationalCurrentQuestionId);
    const { getField, setField } = useQuestionField(
        'national',
        currentQuestionId,
    );

    return (
        <FormQuestionLayout>
            <FormQuestionTitle title={`Câu ${currentQuestionId}`} />
            <div className="p-6">
                <QuestionParagraph getField={getField} setField={setField} />
                <QuestionContent getField={getField} setField={setField} />
                <QuestionChoices getField={getField} setField={setField} />
                <QuestionExplanation getField={getField} setField={setField} />
            </div>
        </FormQuestionLayout>
    );
});

FormQuestions.displayName = 'FormQuestions';
