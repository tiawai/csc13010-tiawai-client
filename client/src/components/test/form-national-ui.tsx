import { Button, Modal } from 'antd';
import { memo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hook';
import {
    resetTHPGQGTestCreator,
    // setNationalIsExporting,
} from '@/lib/slices/national-test-creator.slice';
import {
    NavigationButtonCancel,
    // NavigationButtonExport,
    NavigationButtonSave,
} from './form-ui';
import { useCreateNationalTestMutation } from '@/services/test.service';
import { CreateQuestionDto } from '@/types/question.type';
import { CreateNationalTestDto, TestType } from '@/types/test.type';
import { useParams } from 'next/navigation';
import { useNotification } from '@/lib/hooks/use-notification';
import { useCreateNationalTestTeacherMutation } from '@/services/test.service';

export const FormFooter = memo(() => {
    const params = useParams();
    const classroomId = params.id as string;
    const dispatch = useAppDispatch();
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const testState = useAppSelector((state) => state.nationalTestCreator);
    const [isLoading, setIsLoading] = useState(false);
    const [createNationalTest] = useCreateNationalTestMutation();
    const [createNationalTestTeacher] = useCreateNationalTestTeacherMutation();
    const { notify } = useNotification();

    const handleSaveTest = async () => {
        setIsLoading(true);

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
                    choices: question.choices,
                    correctAnswer: question.correctAnswer || 'A',
                    points: 0.25,

                    // content: `Câu ${question.questionOrder}`,
                    // paragraph: `Đoạn văn bản câu ${question.questionOrder}`,
                    // explanation: `Giải thích câu ${question.questionOrder}`,
                    // choices: {
                    //     A: 'Đáp án A',
                    //     B: 'Đáp án B',
                    //     C: 'Đáp án C',
                    //     D: 'Đáp án D',
                    // },
                }),
            ),
        };

        let res;
        if (classroomId) {
            res = await createNationalTestTeacher({
                classroomId: classroomId,
                ...body,
            });
        } else {
            res = await createNationalTest(body);
        }

        setIsLoading(false);

        if (res?.data) {
            notify({
                message: 'Đăng đề thành công',
                description: 'Đề thi đã được đăng thành công.',
            });
        } else {
            notify({
                message: 'Đăng đề thất bại',
                description: 'Đề thi đã được đăng thất bại.',
                notiType: 'error',
            });
        }
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
                {/* <NavigationButtonExport
                    text="Xuất bản"
                    onClick={() => dispatch(setNationalIsExporting(true))}
                /> */}
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
