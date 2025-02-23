'use client';
import { useState, useCallback, memo, useEffect } from 'react';
import { Typography, Form, Button, Input, Checkbox, notification } from 'antd';
import { ChoicesTypes, Question, Exam } from '@/types/exam';
import { useCreateExamMutation } from '@/services/admin';
import ContainerBorder from '@/ui/admin/exam/container-border';
import ManageExams from '@/ui/admin/exam/manage-exams';
import Banner from '@/ui/admin/banner';
import clsx from 'clsx';

const { Title } = Typography;

const initialQuestion: Question = {
    content: '',
    hasParagraph: false,
    choices: { A: '', B: '', C: '', D: '' },
    correctAnswer: null,
    explanation: '',
};

export default function AdminExamsPage() {
    const [createExam, { isLoading }] = useCreateExamMutation();
    const [form] = Form.useForm();
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [questions, setQuestions] = useState<Record<number, Question>>(
        Array(50).fill(initialQuestion),
    );

    const updateTotalQuestions = useCallback((value: number) => {
        if (value < 1 || value > 100) {
            return;
        }
        setQuestions((prevQuestions) => {
            const newQuestions = { ...prevQuestions };
            const nCurrentQuestions = Object.keys(prevQuestions).length;
            if (value < nCurrentQuestions) {
                for (let i = value; i < nCurrentQuestions; i++) {
                    delete newQuestions[i];
                }
            } else {
                for (let i = nCurrentQuestions; i < value; i++) {
                    newQuestions[i] = initialQuestion;
                }
            }
            return newQuestions;
        });
    }, []);

    const updateQuestion = useCallback(
        (
            index: number,
            field: keyof Question,
            value: Question[keyof Question],
        ) => {
            setQuestions((prevQuestions) => {
                const updateQuestion = {
                    ...prevQuestions[index],
                    [field]: value,
                };
                return { ...prevQuestions, [index]: updateQuestion };
            });
        },
        [],
    );

    const onFinish = async () => {
        const values = form.getFieldsValue();
        const exam: Exam = {
            title: values.title,
            totalQuestions: +values.totalQuestions,
            duration: +values.duration,
            questions: Object.values(questions).map((question) => {
                if (!question.hasParagraph && question.paragraph) {
                    delete question.paragraph;
                }
                return question;
            }),
        };

        const res = await createExam(exam);

        if (!res.error) {
            notification.success({
                message: 'Đăng đề thành công',
                description: 'Đề thi đã được đăng thành công.',
            });
            setQuestions(Array(50).fill(initialQuestion));
            form.resetFields();
        } else {
            notification.error({
                message: 'Đăng đề thất bại',
                description: 'Vui lòng kiểm tra lại.',
            });
        }
    };

    return (
        <div className="space-y-10 p-4">
            <Banner>Quản lý đề thi</Banner>
            <Title level={2}>Đăng đề và đáp án</Title>
            <ContainerBorder>
                <Form
                    form={form}
                    layout="vertical"
                    size="large"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label={<FormLabel>Tên đề</FormLabel>}
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
                        />
                    </Form.Item>

                    <div className="grid grid-cols-2 gap-8">
                        <Form.Item
                            label={<FormLabel>Số lượng câu hỏi</FormLabel>}
                            name="totalQuestions"
                            initialValue={50}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Số lượng câu hỏi không được bỏ trống',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Nhập số lượng câu hỏi"
                                className="!rounded-full !bg-[#E9DAE9] !placeholder-black/50"
                                variant="filled"
                                type="number"
                                min={1}
                                max={100}
                                onChange={(e) =>
                                    updateTotalQuestions(+e.target.value)
                                }
                            />
                        </Form.Item>

                        <Form.Item
                            label={<FormLabel>Thời gian làm bài</FormLabel>}
                            name="duration"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Thời gian làm bài không được bỏ trống',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Nhập thời gian làm bài (phút)"
                                className="!rounded-full !bg-[#E9DAE9] !placeholder-black/50"
                                variant="filled"
                                type="number"
                                min={1}
                            />
                        </Form.Item>
                    </div>

                    <div className="flex gap-8">
                        <div className="h-max rounded-3xl bg-[#DBE3E9]">
                            <Title
                                className="!m-0 !rounded-full !bg-[#373A66] !py-2 !text-center !text-white"
                                level={4}
                            >
                                Câu hỏi
                            </Title>

                            <div className="grid grid-cols-[repeat(5,min-content)] gap-2 p-6">
                                {Object.keys(questions).map((_, index) => (
                                    <Button
                                        key={index}
                                        type={
                                            currentQuestion === index
                                                ? 'primary'
                                                : 'default'
                                        }
                                        onClick={() =>
                                            setCurrentQuestion(index)
                                        }
                                        className={
                                            currentQuestion === index
                                                ? '!bg-[#373A66] !text-white'
                                                : ''
                                        }
                                    >
                                        {index + 1}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="grow">
                            {Object.keys(questions).length && (
                                <QuestionForm
                                    questionIndex={currentQuestion}
                                    questionData={questions[currentQuestion]}
                                    updateQuestion={updateQuestion}
                                />
                            )}
                        </div>
                    </div>

                    <Form.Item className="!mb-0 !mt-6">
                        <Button
                            className="!m-auto !flex !bg-[#E9DAE9] !text-black"
                            shape="round"
                            htmlType="submit"
                            loading={isLoading}
                        >
                            Đăng đề
                        </Button>
                    </Form.Item>
                </Form>
            </ContainerBorder>

            <Title level={2}>Danh sách đề thi</Title>
            <ContainerBorder>
                <ManageExams />
            </ContainerBorder>
        </div>
    );
}

interface QuestionFormProps {
    questionIndex: number;
    questionData: Question;
    updateQuestion: (
        index: number,
        field: keyof Question,
        value: Question[keyof Question],
    ) => void;
}

const QuestionForm = memo(
    ({ questionIndex, questionData, updateQuestion }: QuestionFormProps) => {
        const [question, setQuestion] = useState<Question>(questionData);

        const changeQuestion = (
            field: keyof Question,
            value: Question[keyof Question],
        ) => {
            setQuestion((prev) => ({ ...prev, [field]: value }));
        };

        useEffect(() => {
            setQuestion(questionData);
        }, [questionIndex, questionData]);

        return (
            <div className="rounded-3xl bg-[#DBE3E9]">
                <Title
                    className="!m-0 !rounded-full !bg-[#373A66] !py-2 !text-center !text-white"
                    level={4}
                >
                    Câu {questionIndex + 1}
                </Title>

                <div className="p-6">
                    <Form.Item
                        label={
                            <div className="flex items-center gap-2">
                                <FormLabel>Đoạn văn</FormLabel>
                                <Checkbox
                                    className="!mb-[0.45rem]"
                                    checked={question.hasParagraph}
                                    onClick={() => {
                                        setQuestion((prev) => ({
                                            ...prev,
                                            hasParagraph: !prev.hasParagraph,
                                        }));
                                        updateQuestion(
                                            questionIndex,
                                            'hasParagraph',
                                            !question.hasParagraph,
                                        );
                                    }}
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
                            value={question.paragraph}
                            disabled={!question.hasParagraph}
                            onChange={(e) =>
                                changeQuestion('paragraph', e.target.value)
                            }
                            onBlur={(e) =>
                                updateQuestion(
                                    questionIndex,
                                    'paragraph',
                                    e.target.value,
                                )
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        label={
                            <FormLabel>{`Câu hỏi ${questionIndex + 1}`}</FormLabel>
                        }
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
                            value={question.content}
                            onChange={(e) =>
                                changeQuestion('content', e.target.value)
                            }
                            onBlur={() =>
                                updateQuestion(
                                    questionIndex,
                                    'content',
                                    question.content,
                                )
                            }
                        />
                    </Form.Item>

                    <FormLabel>{`Đáp án ${questionIndex + 1}:`}</FormLabel>
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
                                    value={question.choices[type]}
                                    onChange={(e) =>
                                        changeQuestion('choices', {
                                            ...question.choices,
                                            [type]: e.target.value,
                                        })
                                    }
                                    onBlur={(e) =>
                                        updateQuestion(
                                            questionIndex,
                                            'choices',
                                            {
                                                ...question.choices,
                                                [type]: e.target.value,
                                            },
                                        )
                                    }
                                />
                            </Form.Item>
                        ))}
                    </div>

                    <Form.Item
                        label={<FormLabel>Hãy chọn đáp án đúng</FormLabel>}
                    >
                        <Checkbox.Group
                            value={[questionData.correctAnswer]}
                            onChange={(values) => {
                                updateQuestion(
                                    questionIndex,
                                    'correctAnswer',
                                    values.length > 1 ? values[1] : values[0],
                                );
                            }}
                            className="flex gap-8"
                        >
                            {ChoicesTypes.map((type) => (
                                <Checkbox key={type} value={type}>
                                    {type}
                                </Checkbox>
                            ))}
                        </Checkbox.Group>
                    </Form.Item>

                    <Form.Item
                        label={<FormLabel>Giải thích đáp án</FormLabel>}
                        className="!mb-0"
                    >
                        <Input.TextArea
                            className="!rounded-3xl"
                            placeholder="Ghi giải thích tại đây"
                            autoSize={{ minRows: 1 }}
                            value={question.explanation}
                            onChange={(e) =>
                                changeQuestion('explanation', e.target.value)
                            }
                            onBlur={() =>
                                updateQuestion(
                                    questionIndex,
                                    'explanation',
                                    question.explanation,
                                )
                            }
                        />
                    </Form.Item>
                </div>
            </div>
        );
    },
);

QuestionForm.displayName = 'QuestionForm';

const FormLabel = ({ children }: { children: React.ReactNode }) => (
    <Title className={clsx('!text-[#511351]')} level={4}>
        {children}
    </Title>
);
