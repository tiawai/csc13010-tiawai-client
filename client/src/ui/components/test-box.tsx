'use client';
import { Row, Col, Typography } from 'antd';
import ExamFrame from '@/ui/exam-frame';
import { twMerge } from 'tailwind-merge';
import { Exam } from '@/types/exam';
const { Title } = Typography;
interface TestBoxProps {
    title: string;
    description?: string;
    tag?: string;
    theme?: 'pink' | 'blue';
    examData?: Exam[] | undefined;
}

const TestBox = (props: Readonly<TestBoxProps>) => {
    return (
        <div className="rounded-[80px] border-2 border-black px-24 pb-14 pt-6">
            <Title className="!font-roboto !font-medium">
                {props.title}{' '}
                <span className="text-xl font-light italic">{props.tag}</span>
            </Title>
            <Title
                className={twMerge(
                    '!font-roboto !font-medium !text-[#8A8A8A]',
                    props.description ? '!mb-12' : '!invisible !h-0',
                )}
                level={4}
            >
                {props.description
                    ? props.description
                    : 'Bộ đề THPT Quốc gia môn Anh minh họa của Bộ Giáo dục và Đào tạo các năm gần đây. Ôn luyện để nắm vững format đề thi, các dạng bài thường xuyên xuất hiện.'}
            </Title>
            {props.examData && (
                <Row gutter={[48, 40]}>
                    {props.examData.map((_, index) => (
                        <Col span={8} key={index}>
                            <ExamFrame theme={props.theme} />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default TestBox;
