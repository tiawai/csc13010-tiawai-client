'use client';
import { Flex, Space, Typography } from 'antd';
import { PageTitle } from '@/components/common/page';
import TestBox from '@/ui/components/test-box';
import bigTiawai2 from '@public/big-tiawai-2.svg';
import { useGetExamsQuery } from '@/services/exam';
const { Title } = Typography;

const Exam = () => {
    const { data, isLoading } = useGetExamsQuery();
    if (isLoading) return;

    const testsData = [
        {
            title: 'Bộ Đề Minh Họa THPTQG Mới Nhất',
            description:
                'Bộ đề THPT Quốc gia môn Anh minh họa của Bộ Giáo dục và Đào tạo các năm gần đây. Ôn luyện để nắm vững format đề thi, các dạng bài thường xuyên xuất hiện.',
            examData: data?.filter((exam) =>
                exam.title?.toLocaleLowerCase().includes('minh họa'),
            ),
        },
        {
            title: 'Bộ Đề Thi Chính Thức Các Năm Mới Nhất',
            description:
                'Luyện đề thi thực chiến các năm để nâng cao kiến thức, trau dồi vốn từ, luyện nhuần nhuyễn chiến thuật làm bài thông minh.',
            examData: data?.filter((exam) =>
                exam.title?.includes('chính thức'),
            ),
        },
        {
            title: 'Bộ Đề Thi Thử Các Trường Nổi Tiếng Mới Nhất',
            description:
                'Bộ đề thi THPT Quốc gia môn Anh được chọn lọc tỉ mỉ, công phu nhất. Ôn luyện để nắm chắc format đề thi, trau dồi đủ kiến thức, giúp các sĩ tử tự tin chinh phục điểm số mục tiêu.',
            examData: data?.filter((exam) => exam.title?.includes('thử')),
        },
    ];

    return (
        <div className="space-y-20">
            <PageTitle
                title="Luyện thi hiệu quả với trọn bộ đề THPTQG các năm"
                imageSrc={bigTiawai2}
                imageAlt="big tiawai 2"
                imagePosition="right"
            />

            <Flex align="center" className="mb-24">
                <Space size="large">
                    <Title className="!font-normal" level={2}>
                        <i>
                            Luyện tập <b>trọn bộ</b> vói các dạng đề{' '}
                            <b>
                                chính thức, minh họa và thi thử THPT Quốc gia
                                của các trường nổi tiếng
                            </b>{' '}
                            qua các năm.
                        </i>
                    </Title>
                </Space>
            </Flex>

            <Title className="!mb-0 !font-roboto">Danh sách bộ đề</Title>

            <div>
                <Space direction="vertical" size={144}>
                    {testsData.map((test, index) => (
                        <TestBox key={index} {...test} />
                    ))}
                </Space>
            </div>
        </div>
    );
};

export default Exam;
