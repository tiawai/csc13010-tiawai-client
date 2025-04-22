'use client';
import { useSearchParams } from 'next/navigation';
import { Input, Typography, Empty } from 'antd';
import bigTiawai2 from '@public/big-tiawai-2.svg';
import { PageTitle } from '@/components/common/page';
import { Test, TestType } from '@/types/test.type';
import { useGetTestsAnyoneQuery } from '@/services/test.service';
import { useSearch } from '@/lib/hooks/use-search';
import { TestFrame } from '@/components/test/test-ui';
import { Loading } from '@/components/common/loading';

const { Title } = Typography;

const testContent: Record<
    TestType,
    { title: string; description: string; vnName: string }
> = {
    [TestType.NATIONAL_TEST]: {
        title: 'Luyện thi THPTQG – Ôn đúng trọng tâm, đạt điểm cao! 🎯📚',
        description:
            'Hệ thống đề thi chuẩn, cập nhật liên tục, giải thích đáp án chi tiết. Luyện tập mỗi ngày để tự tin bước vào kỳ thi quan trọng! 🚀✨',
        vnName: 'THPTQG',
    },
    [TestType.TOEIC_LISTENING]: {
        title: 'Luyện Listening – Nghe tốt, hiểu nhanh, nắm chắc điểm số! 🎧📖 ',
        description:
            'Làm bài nghe sát đề thi thật, cải thiện kỹ năng bắt keywords, luyện phản xạ và làm quen với mọi dạng câu hỏi! 🚀📚',
        vnName: 'Listening',
    },
    [TestType.TOEIC_READING]: {
        title: 'Luyện Reading – Đọc hiểu sâu, nắm chắc đáp án! 📖✨',
        description:
            'Rèn kỹ năng đọc hiểu với bài tập chuẩn TOEIC, cải thiện từ vựng & tốc độ làm bài, kèm phân tích chi tiết để tối ưu điểm số! 🚀📚',
        vnName: 'Reading',
    },
    [TestType.ASSIGNMENT]: {
        title: '',
        description: '',
        vnName: 'Bài tập',
    },
};

export default function TestPage() {
    const params = useSearchParams();
    const type = (params.get('type') as TestType) || TestType.NATIONAL_TEST;
    const { data: tests, isLoading } = useGetTestsAnyoneQuery(type);

    const searchFn = (test: Test, query: string) => {
        const value = query.toLowerCase();
        return (
            test.title?.toLowerCase().includes(value) ||
            test.type?.toLowerCase().includes(value) ||
            new Date(test.startDate).toLocaleDateString().includes(query) ||
            new Date(test.endDate).toLocaleDateString().includes(query) ||
            test.totalQuestions?.toString().includes(query) ||
            test.timeLength?.toString().includes(query) ||
            (test.isGenerated ? 'Có' : 'Không').includes(query)
        );
    };

    const { searchText, filteredData, handleSearch } = useSearch<Test>(
        tests || [],
        searchFn,
    );

    return (
        <div className="space-y-8">
            <PageTitle
                title={testContent[type].title}
                description={testContent[type].description}
                imageSrc={bigTiawai2}
                imageAlt="big tiawai 2"
                imagePosition="right"
            />

            <Title level={2} className="!font-roboto">
                Kho đề thi {testContent[type].vnName}
            </Title>

            <div className="flex-[1] space-y-4">
                <Input.Search
                    placeholder="Tìm kiếm đề thi..."
                    onSearch={(value) => handleSearch(value)}
                    onChange={(e) => handleSearch(e.target.value)}
                    value={searchText}
                    allowClear
                    size="large"
                />
            </div>
            {isLoading ? (
                <Loading />
            ) : filteredData.length > 0 ? (
                <div className="grid flex-[4] auto-rows-min grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {filteredData.map((test, index) => (
                        <TestFrame
                            key={index}
                            theme={
                                type === TestType.TOEIC_LISTENING
                                    ? 'blue'
                                    : 'pink'
                            }
                            test={test}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-[4] items-center justify-center">
                    <Empty description="Không tìm thấy đề thi phù hợp" />
                </div>
            )}
        </div>
    );
}
