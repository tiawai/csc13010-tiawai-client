import { useCallback, useState, memo } from 'react';
import { Button, Modal } from 'antd';
import Title from 'antd/es/typography/Title';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hook';
import {
    resetQuestiionsByTestType,
    selectCurrentPart,
    selectFirstPart,
    selectLastPart,
    selectNextPart,
    selectPreviousPart,
    // selectReadingQuestions,
    setCurrentPart,
    // setIsExporting,
    setToeicTestField,
    ToeicTestType,
} from '@/lib/slices/toeic-test-creator.slice';
import {
    // Listening test hooks
    useCreateToeicListeningTestMutation,
    useUploadAudioTLMutation,
    useUploadImagesTLMutation,
    useCreatePart1TLMutation,
    useCreatePart2TLMutation,
    useCreatePart3TLMutation,
    useCreatePart4TLMutation,

    // Reading test hooks
    useUploadImagesTRMutation,
    useCreatePart1TRMutation,
    useCreatePart2TRMutation,
    useCreatePart3TRMutation,
    useCreateToeicReadingTestMutation,
} from '@/services/test.service';
import {
    useCreateToeicListeningTestClassroomMutation,
    useCreateToeicReadingTestClassroomMutation,
} from '@/services/classroom';
import { TestType } from '@/types/test.type';
import {
    NavigationButtonBack,
    NavigationButtonCancel,
    // NavigationButtonExport,
    NavigationButtonNext,
    NavigationButtonSave,
} from './form-ui';
import { CreateQuestionDto, Question } from '@/types/question.type';
import { useParams } from 'next/navigation';

export const PartTitle = ({ title }: { title: string }) => {
    return <Title className="!text-center">{title}</Title>;
};

export const PartDescription = ({ description }: { description: string }) => {
    return (
        <Title className="!text-center !font-normal" level={4}>
            {description}
        </Title>
    );
};

export interface PartMap {
    title: string;
    description: string;
}

export interface PartNavigationProps<T extends string> {
    partMap: Record<T, { title: string; description: string }>;
}

export const PartNavigation = memo(
    <T extends string>({ partMap }: PartNavigationProps<T>) => {
        const currentPart = useAppSelector(selectCurrentPart);
        const dispatch = useAppDispatch();
        const onNavigate = useCallback(
            (part: T) => {
                dispatch(setCurrentPart(part));
            },
            [dispatch],
        );

        return (
            <div className="flex justify-center gap-4">
                {Object.keys(partMap).map((part) => (
                    <Button
                        key={part}
                        className={clsx(
                            'hover:!border-tia-slate-blue',
                            currentPart === part &&
                                '!border-tia-slate-blue !bg-tia-alice-blue !text-tia-slate-blue',
                        )}
                        onClick={() => onNavigate(part as T)}
                        size="large"
                    >
                        {partMap[part as T].title}
                    </Button>
                ))}
            </div>
        );
    },
);

export const PartNavigationFooter = memo(
    <T extends string>({ partMap }: PartNavigationProps<T>) => {
        const params = useParams();
        const classroomId = params.id as string;
        const dispatch = useAppDispatch();
        const currentPart = useAppSelector(selectCurrentPart);
        const firstpart = useAppSelector(selectFirstPart);
        const lastPart = useAppSelector(selectLastPart);
        const prevPart = useAppSelector(selectPreviousPart);
        const nextPart = useAppSelector(selectNextPart);
        const isSelectbasic = useAppSelector(
            (state) => state.toeicTestCreator.isSelectBasic,
        );

        const testType = useAppSelector(
            (state) => state.toeicTestCreator.testType,
        );
        const title = useAppSelector((state) => state.toeicTestCreator.title);
        const duration = useAppSelector(
            (state) => state.toeicTestCreator.duration,
        );
        const startDate = useAppSelector(
            (state) => state.toeicTestCreator.startDate,
        );
        const endDate = useAppSelector(
            (state) => state.toeicTestCreator.endDate,
        );
        const questions = useAppSelector(
            (state) => state.toeicTestCreator.questions,
        );
        const audioUrl = useAppSelector(
            (state) => state.toeicTestCreator.audioUrl,
        );
        const [isLoading, setIsLoading] = useState<boolean>(false);

        // Listening test hooks
        const [createToeicListeningTest] =
            useCreateToeicListeningTestMutation();
        const [uploadAudioTL] = useUploadAudioTLMutation();
        const [uploadImagesTL] = useUploadImagesTLMutation();
        const [createPart1TL] = useCreatePart1TLMutation();
        const [createPart2TL] = useCreatePart2TLMutation();
        const [createPart3TL] = useCreatePart3TLMutation();
        const [createPart4TL] = useCreatePart4TLMutation();

        // Reading test hooks
        const [createToeicReadingTest] = useCreateToeicReadingTestMutation();
        const [uploadImagesTR] = useUploadImagesTRMutation();
        const [createPart1TR] = useCreatePart1TRMutation();
        const [createPart2TR] = useCreatePart2TRMutation();
        const [createPart3TR] = useCreatePart3TRMutation();

        // Teacher hooks
        const [createToeicListeningTestTeacher] =
            useCreateToeicListeningTestClassroomMutation();
        const [createToeicReadingTestTeacher] =
            useCreateToeicReadingTestClassroomMutation();

        const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

        const onNavigate = useCallback(
            (part: T) => {
                dispatch(setCurrentPart(part));
            },
            [dispatch],
        );

        function base64ToFile(base64: string, filename: string): File {
            const arr = base64.split(',');
            const mimeMatch = arr[0].match(/:(.*?);/);
            const mime = mimeMatch
                ? mimeMatch[1]
                    ? 'image/png'
                    : 'audio/mpeg'
                : '';
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        }

        const mimeToExt = (mime: string): string => {
            const map: Record<string, string> = {
                'audio/mpeg': 'mp3',
                'audio/wav': 'wav',
                'audio/ogg': 'ogg',
                'audio/mp4': 'mp4',
            };
            return map[mime] || 'mp3';
        };

        function base64ToAudioFile(base64: string): File {
            const arr = base64.split(',');
            const mime = arr[0].match(/:(.*?);/)?.[1] || 'audio/mpeg';
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);

            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }

            const ext = mimeToExt(mime);
            return new File([u8arr], `audio.${ext}`, { type: mime });
        }

        const generateFormDataFromImages = (
            questions: Question[],
        ): FormData => {
            const formData = new FormData();

            questions.forEach((question) => {
                question?.imageUrls?.forEach(
                    (base64: string, imageIdx: number) => {
                        const extMatch = base64.match(
                            /^data:image\/(jpeg|png|jpg|webp);base64,/i,
                        );
                        const ext = extMatch
                            ? `.${extMatch[1].toLowerCase()}`
                            : '.jpg';
                        const filename = `question-${String(question.questionOrder).padStart(3, '0')}${imageIdx + 1}${ext}`;

                        const file = base64ToFile(base64, filename);
                        formData.append('images', file);
                    },
                );
            });

            return formData;
        };

        function createBatchesFromQuestions(
            partQuestions: Question[],
        ): number[] {
            const batches: number[] = [];
            if (partQuestions.length === 0) return batches;

            let currentBatchCount = 0;
            let currentParent = partQuestions[0]?.parentQuestion;

            for (let i = 0; i < partQuestions.length; i++) {
                const question = partQuestions[i];
                const imageCount = question?.imageUrls?.length || 0;

                if (imageCount && !question.parentQuestion) {
                    batches.push(1);
                    currentBatchCount = 0;
                    currentParent = question.parentQuestion;
                } else if (
                    i === 0 ||
                    question.parentQuestion !== currentParent
                ) {
                    if (currentBatchCount > 0) {
                        batches.push(currentBatchCount);
                    }
                    currentBatchCount = 1;
                    currentParent = question.parentQuestion;
                } else {
                    currentBatchCount++;
                }
            }

            if (currentBatchCount > 0) {
                batches.push(currentBatchCount);
            }

            return batches;
        }

        const handlePartTL = async (
            partKey: 'part1' | 'part2' | 'part3' | 'part4',
            testId: string,
            createFn:
                | typeof createPart1TL
                | typeof createPart2TL
                | typeof createPart3TL
                | typeof createPart4TL,
        ) => {
            const partQuestions = questions[partKey] || [];
            const formData = generateFormDataFromImages(partQuestions);
            const batch = createBatchesFromQuestions(partQuestions);

            let imageRes = undefined;
            if (formData.has('images')) {
                imageRes = await uploadImagesTL({ testId, formData });
                if (imageRes.error) {
                    console.error('Error uploading images:', imageRes.error);
                    return;
                }
            }

            const questionsDto = partQuestions.map(
                (question): CreateQuestionDto => ({
                    paragraph: question?.paragraph,
                    content: question?.content,
                    explanation: question?.explanation,
                    choices: question.choices,
                    correctAnswer: question.correctAnswer || 'A',
                    points: 4.5,

                    // paragraph: `Đoạn văn - Câu ${question.questionOrder}`,
                    // content: `Câu ${question.questionOrder}`,
                    // explanation: `Giải thích - Câu ${question.questionOrder}`,
                    // choices: {
                    //     A: 'Đáp án A',
                    //     B: 'Đáp án B',
                    //     C: 'Đáp án C',
                    //     D: 'Đáp án D',
                    // },
                }),
            );

            await createFn({
                testId,
                batch: batch,
                hasImages: !!formData.has('images'),
                imageUrls: imageRes?.data.imageUrls || [],
                questions: questionsDto,
            });
        };

        const handlePartTR = async (
            partKey: 'part5' | 'part6' | 'part7',
            testId: string,
            createFn:
                | typeof createPart1TR
                | typeof createPart2TR
                | typeof createPart3TR,
        ) => {
            const partQuestions = questions[partKey] || [];
            const formData = generateFormDataFromImages(partQuestions);
            const batch = createBatchesFromQuestions(partQuestions);

            let imageRes = undefined;
            if (formData.has('images')) {
                imageRes = await uploadImagesTR({ testId, formData });
                if (imageRes.error) {
                    console.error('Error uploading images:', imageRes.error);
                    return;
                }
            }

            const questionsDto = partQuestions.map(
                (question): CreateQuestionDto => ({
                    paragraph: question?.paragraph,
                    content: question?.content,
                    explanation: question?.explanation,
                    choices: question.choices,
                    correctAnswer: question.correctAnswer || 'A',
                    points: 4.5,

                    // paragraph: `Đoạn văn - Câu ${question.questionOrder}`,
                    // content: `Câu ${question.questionOrder}`,
                    // explanation: `Giải thích - Câu ${question.questionOrder}`,
                    // choices: {
                    //     A: 'Đáp án A',
                    //     B: 'Đáp án B',
                    //     C: 'Đáp án C',
                    //     D: 'Đáp án D',
                    // },
                }),
            );

            await createFn({
                testId,
                batch: batch,
                hasImages: !!formData.has('images'),
                imageUrls: imageRes?.data.imageUrls || [],
                questions: questionsDto,
            });
        };

        const testTypeMap: Record<ToeicTestType, TestType> = {
            reading: TestType.TOEIC_READING,
            listening: TestType.TOEIC_LISTENING,
        };

        const handleSaveTest = async () => {
            setIsLoading(true);

            const testPayload = {
                title: title,
                type: testTypeMap[testType],
                startDate: new Date(startDate).toISOString(),
                endDate: new Date(endDate).toISOString(),
                totalQuestions: 100,
                timeLength: duration,
            };

            if (testType === 'listening') {
                let resAudioUrl = '';
                if (audioUrl) {
                    const audio = base64ToAudioFile(audioUrl);
                    const formData = new FormData();
                    const ext = mimeToExt(audio.type);
                    const filename = `audio.${ext}`;
                    formData.append('audio', audio, filename);

                    const resAudio = await uploadAudioTL({ formData });
                    if (resAudio.error) return setIsLoading(false);
                    resAudioUrl = resAudio.data.audioUrl;
                }

                const encodedAudioUrl = encodeURIComponent(resAudioUrl);
                let res = undefined;
                if (classroomId !== undefined) {
                    res = await createToeicListeningTestTeacher({
                        classroomId,
                        audioUrl: encodedAudioUrl,
                        test: testPayload,
                    });
                } else {
                    res = await createToeicListeningTest({
                        audioUrl: encodedAudioUrl,
                        test: testPayload,
                    });
                }

                if (res.error) return setIsLoading(false);
                const testId = res.data.id;

                await Promise.all([
                    handlePartTL('part1', testId, createPart1TL),
                    handlePartTL('part2', testId, createPart2TL),
                    handlePartTL('part3', testId, createPart3TL),
                    handlePartTL('part4', testId, createPart4TL),
                ]);
            }
            if (testType === 'reading') {
                let res = undefined;
                if (classroomId !== undefined) {
                    res = await createToeicReadingTestTeacher({
                        classroomId,
                        ...testPayload,
                    });
                } else {
                    res = await createToeicReadingTest(testPayload);
                }
                if (res.error) return setIsLoading(false);
                const testId = res.data.id;

                await Promise.all([
                    handlePartTR('part5', testId, createPart1TR),
                    handlePartTR('part6', testId, createPart2TR),
                    handlePartTR('part7', testId, createPart3TR),
                ]);
            }

            setIsLoading(false);
        };

        const handleCancelTest = () => {
            dispatch(resetQuestiionsByTestType());
            setIsConfirmModalOpen(false);
        };

        return (
            <>
                <div className="flex justify-end gap-4">
                    {!isSelectbasic && currentPart === firstpart && (
                        <NavigationButtonBack
                            text="Thông tin"
                            onClick={() =>
                                dispatch(
                                    setToeicTestField({
                                        field: 'isSelectBasic',
                                        value: true,
                                    }),
                                )
                            }
                        />
                    )}

                    {prevPart && prevPart !== currentPart && (
                        <NavigationButtonBack
                            text={partMap[prevPart as T].title}
                            onClick={() => onNavigate(prevPart as T)}
                        />
                    )}

                    {nextPart && nextPart !== currentPart && (
                        <NavigationButtonNext
                            text={partMap[nextPart as T].title}
                            onClick={() => onNavigate(nextPart as T)}
                        />
                    )}

                    {lastPart === currentPart && (
                        <>
                            <NavigationButtonCancel
                                text="Hủy"
                                onClick={() => setIsConfirmModalOpen(true)}
                            />
                            <NavigationButtonSave
                                text="Lưu"
                                onClick={() => handleSaveTest()}
                                loading={isLoading}
                            />
                            {/* <NavigationButtonExport
                                text="Xuất bản"
                                onClick={() => dispatch(setIsExporting(true))}
                            /> */}
                        </>
                    )}
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
                            type="primary"
                            onClick={handleCancelTest}
                            danger
                        >
                            Xác nhận hủy
                        </Button>,
                    ]}
                >
                    <p>
                        Bạn có chắc chắn muốn hủy bài kiểm tra không? Hành động
                        này không thể hoàn tác.
                    </p>
                </Modal>
            </>
        );
    },
);

PartNavigation.displayName = 'PartNavigation';
PartNavigationFooter.displayName = 'PartNavigationFooter';
