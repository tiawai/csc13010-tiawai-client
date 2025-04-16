import { Button, Modal } from 'antd';
import { memo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hook';
import {
    resetTHPGQGTestCreator,
    setNationalIsExporting,
} from '@/lib/slices/national-test-creator.slice';
import {
    NavigationButtonCancel,
    NavigationButtonExport,
    NavigationButtonSave,
} from './form-ui';
import { useCreateNationalTestMutation } from '@/services/test.service';
import { CreateQuestionDto } from '@/types/question.type';
import { CreateNationalTestDto, TestType } from '@/types/test.type';

export const FormFooter = memo(() => {
    const dispatch = useAppDispatch();
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [createNationalTest, { isLoading }] = useCreateNationalTestMutation();
    const testState = useAppSelector((state) => state.nationalTestCreator);

    const handleSaveTest = async () => {
        const {
            title,
            startDate,
            endDate,
            duration,
            totalQuestions,
            questions,
        } = testState;

        const body: CreateNationalTestDto = {
            test: {
                title: title,
                type: TestType.NATIONAL_TEST,
                startDate: new Date(startDate).toISOString(),
                endDate: new Date(endDate).toISOString(),
                totalQuestions: totalQuestions,
                timeLength: duration,
            },

            questions: questions.map(
                (question): CreateQuestionDto => ({
                    content: question?.content,
                    paragraph: question?.paragraph,
                    explanation: question?.explanation,
                    correctAnswer: question.correctAnswer || 'A',
                    choices: question.choices,
                    points: 0.25,
                }),
            ),
        };

        await createNationalTest(body);
    };

    const handleCancelTest = () => {
        dispatch(resetTHPGQGTestCreator());
        setIsConfirmModalOpen(false);
    };

    return (
        <>
            <div className="flex justify-end gap-4">
                <NavigationButtonCancel
                    text="Hủy"
                    onClick={() => setIsConfirmModalOpen(true)}
                />
                <NavigationButtonSave
                    text="Lưu"
                    onClick={handleSaveTest}
                    loading={isLoading}
                />
                <NavigationButtonExport
                    text="Xuất bản"
                    onClick={() => dispatch(setNationalIsExporting(true))}
                />
            </div>

            <Modal
                title="Xác nhận hủy bài kiểm tra"
                open={isConfirmModalOpen}
                onCancel={() => setIsConfirmModalOpen(false)}
                footer={[
                    <Button
                        key="cancel"
                        onClick={() => setIsConfirmModalOpen(false)}
                    >
                        Hủy
                    </Button>,
                    <Button
                        key="confirm"
                        danger
                        type="primary"
                        onClick={handleCancelTest}
                    >
                        Xác nhận hủy
                    </Button>,
                ]}
            >
                <p>
                    Bạn có chắc chắn muốn hủy bài kiểm tra không? Hành động này
                    không thể hoàn tác.
                </p>
            </Modal>
        </>
    );
});

FormFooter.displayName = 'FormFooter';
