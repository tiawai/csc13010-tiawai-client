import { memo, useState } from 'react';
import { Form, Input, Upload, Checkbox, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import { Choices, ChoicesTypes } from '@/types/question';
import { FormLabel } from './form-ui';
import { RcFile, UploadFile } from 'antd/es/upload';
import { Question } from '@/types/question';
import { useQuestionField } from '@/lib/hooks/test';

export interface QuestionProps {
    getField: (field: keyof Question) => Question[keyof Question];
    setField: (field: keyof Question, value: Question[keyof Question]) => void;
}

export const QuestionParagraph = ({ getField, setField }: QuestionProps) => {
    const paragraph = getField('paragraph') as string;
    const hasParagraph = getField('hasParagraph') as boolean;

    return (
        <Form.Item
            label={
                <div className="flex items-center gap-2">
                    <FormLabel label="Đoạn văn" />
                    <Checkbox
                        className="!mb-[0.45rem]"
                        checked={hasParagraph}
                        onClick={() => setField('hasParagraph', !hasParagraph)}
                    />
                </div>
            }
            rules={[
                {
                    required: true,
                    message: 'Câu hỏi không được bỏ trống',
                },
            ]}
        >
            <Input
                className="!grow !rounded-3xl"
                placeholder="Ghi đoạn văn vào đây nếu đây là câu hỏi Đọc - Hiểu"
                value={paragraph}
                disabled={!hasParagraph}
                onChange={(e) => setField('paragraph', e.target.value)}
            />
        </Form.Item>
    );
};

export const QuestionContent = ({ getField, setField }: QuestionProps) => {
    const questionId = getField('questionId') as number;
    const question = getField('question') as string;

    return (
        <Form.Item
            label={<FormLabel label={`Câu hỏi ${questionId}`} />}
            rules={[
                {
                    required: true,
                    message: 'Câu hỏi không được bỏ trống',
                },
            ]}
        >
            <Input.TextArea
                className="!rounded-3xl"
                placeholder="Ghi câu hỏi tại đây"
                autoSize={{ minRows: 1 }}
                value={question}
                onChange={(e) => setField('question', e.target.value)}
            />
        </Form.Item>
    );
};

const { Dragger } = Upload;
export const QuestionImage = ({ getField, setField }: QuestionProps) => {
    const questionId = getField('questionId') as number;
    const imageUrls = (getField('imageUrls') as string[]) || ([] as string[]);
    const subQuestions = getField('subQuestions') as number[];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setLocalImageUrls] = useState<string[]>(imageUrls);

    const beforeUpload = (file: RcFile) => {
        if (!file.type.startsWith('image/')) {
            message.error('Chỉ được phép upload hình ảnh!');
            return false;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setLocalImageUrls((prev) => {
                const updatedImages = [...prev, reader.result as string];
                // updateQuestion("imageUrls", updatedImages);
                setField('imageUrls', updatedImages);
                return updatedImages;
            });
        };
        reader.readAsDataURL(file);
        return false;
    };

    const onRemove = (file: UploadFile) => {
        setLocalImageUrls((prev) => {
            const updatedImages = prev.filter((url) => url !== file.url);
            // updateQuestion("imageUrls", updatedImages);
            setField('imageUrls', updatedImages);
            return updatedImages;
        });
    };

    return (
        <>
            <Form.Item
                label={
                    <FormLabel label={`Hình ảnh câu hỏi hỏi ${questionId}`} />
                }
                rules={[
                    {
                        required: true,
                        message: 'Câu hỏi không được bỏ trống',
                    },
                ]}
            >
                <Dragger
                    accept="image/*"
                    multiple
                    listType="picture"
                    beforeUpload={beforeUpload}
                    onRemove={onRemove}
                >
                    <p className="ant-upload-drag-icon">
                        <UploadOutlined />
                    </p>
                    <p className="ant-upload-text">
                        Click hoặc kéo thả file ảnh vào đây
                    </p>
                    <p className="ant-upload-hint">
                        Hãy chọn file ảnh để upload.
                    </p>
                </Dragger>
            </Form.Item>

            <Form.Item
                label={
                    <FormLabel label="Số đáp án liên quan đến câu hỏi hình ảnh: " />
                }
            >
                <Checkbox.Group
                    className="flex gap-8"
                    value={[subQuestions?.length ?? 0]}
                    onChange={(values) =>
                        setField(
                            'subQuestions',
                            values.length > 1
                                ? (values[1] as number)
                                : (values[0] as number),
                        )
                    }
                >
                    {[2, 3, 4, 5].map((number) => (
                        <Checkbox key={number} value={number}>
                            {number} câu
                        </Checkbox>
                    ))}
                </Checkbox.Group>
            </Form.Item>
        </>
    );
};

export const QuestionChoices = ({ getField, setField }: QuestionProps) => {
    const questionId = getField('questionId') as number;
    const choices = getField('choices') as Choices;

    return (
        <>
            <FormLabel label={`Đáp án ${questionId}:`} />
            <div className="grid grid-cols-2 gap-x-6">
                {ChoicesTypes.map((type) => (
                    <Form.Item
                        key={type}
                        label={type}
                        layout="horizontal"
                        rules={[
                            {
                                required: true,
                                message: `Đáp án ${type} không được bỏ trống`,
                            },
                        ]}
                        className="!inline-block"
                    >
                        <Input
                            className="!rounded-3xl"
                            placeholder={`Ghi đáp án ${type}`}
                            value={choices[type]}
                            onChange={(e) =>
                                setField('choices', {
                                    ...choices,
                                    [type]: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                ))}
            </div>
        </>
    );
};

export const QuestionCorrectAnswer = ({
    getField,
    setField,
}: QuestionProps) => {
    const correctAnswer = getField('correctAnswer') as string;

    return (
        <Form.Item label={<FormLabel label="Hãy chọn đáp án đúng" />}>
            <Checkbox.Group
                className="flex gap-8"
                value={[correctAnswer]}
                onChange={(values) => {
                    setField('correctAnswer', values[0] as string);
                }}
            >
                {ChoicesTypes.map((type) => (
                    <Checkbox key={type} value={type}>
                        {type}
                    </Checkbox>
                ))}
            </Checkbox.Group>
        </Form.Item>
    );
};

export const QuestionExplanation = ({ getField, setField }: QuestionProps) => {
    const explanation = getField('explanation') as string;

    return (
        <Form.Item
            label={<FormLabel label="Giải thích đáp án" />}
            className="!mb-0"
        >
            <Input.TextArea
                className="!rounded-3xl"
                placeholder="Ghi giải thích tại đây"
                autoSize={{ minRows: 1 }}
                value={explanation}
                onChange={(e) => setField('explanation', e.target.value)}
            />
        </Form.Item>
    );
};

export const BasicQuestion = memo(
    ({
        questionId,
        showQuestion = true,
        showQuestionImage = false,
    }: {
        questionId: number;
        showQuestion?: boolean;
        showQuestionImage?: boolean;
    }) => {
        const { getField, setField } = useQuestionField('toeic', questionId);
        return (
            <>
                {showQuestion && (
                    <QuestionContent getField={getField} setField={setField} />
                )}
                {showQuestionImage && (
                    <QuestionImage getField={getField} setField={setField} />
                )}
                <QuestionChoices getField={getField} setField={setField} />
                <QuestionCorrectAnswer
                    getField={getField}
                    setField={setField}
                />
                <QuestionExplanation getField={getField} setField={setField} />
            </>
        );
    },
    (prevProps, nextProps) => {
        return (
            prevProps.questionId === nextProps.questionId &&
            prevProps.showQuestion === nextProps.showQuestion &&
            prevProps.showQuestionImage === nextProps.showQuestionImage
        );
    },
);

export const QuestionNavigation = ({
    currentType,
    types,
    onNavigate,
}: {
    currentType: number;
    types: string[];
    onNavigate: (index: number) => void;
}) => {
    return (
        <div className="flex gap-4">
            {types.map((type, index) => (
                <Button
                    key={type}
                    shape="round"
                    type="default"
                    className={clsx(
                        currentType === index &&
                            '!border-tia-jacarta !bg-tia-platinum',
                        '',
                    )}
                    onClick={() => onNavigate(index)}
                >
                    {type}
                </Button>
            ))}
        </div>
    );
};

BasicQuestion.displayName = 'BasicQuestion';
