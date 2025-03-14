import Image from 'next/image';
import { BannerTitle, BannerSubTitle } from '@/components/common/banner';
import Banner from '@/app/(user)/(study)/_ui/banner';
import bigTiawai2 from '@public/big-tiawai-2.svg';
import SearchForm from '@/components/teacher/common/searchform';
import { Space, Row, Col } from 'antd';
import ClassDropdown from '@/components/teacher/exam/classdropdown';
import TestCard from '@/components/teacher/exam/testCard';
import LessonCard from '@/components/teacher/exam/lessonCard';

const examList = [
    { id: 1, title: 'Đề Thi Toán 2023', duration: 90, attempts: 150 },
    { id: 2, title: 'Đề Thi Vật Lý 2023', duration: 60, attempts: 120 },
    { id: 3, title: 'Đề Thi Hóa Học 2023', duration: 75, attempts: 100 },
    { id: 4, title: 'Đề Thi Tiếng Anh 2023', duration: 45, attempts: 80 },
];

const lessonList = [
    { id: 1, title: 'Bài 1 - Ngữ pháp cơ bản' },
    { id: 2, title: 'Bài 2 - Câu điều kiện' },
    { id: 3, title: 'Bài 3 - Thì hiện tại hoàn thành' },
    { id: 4, title: 'Bài 4 - Câu bị động' },
    { id: 5, title: 'Bài 5 - Mệnh đề quan hệ' },
];

const ExamPage = () => {
    return (
        <div className="select-none space-y-20">
            <Banner>
                <div>
                    <BannerTitle title="Quản lý Đề thi & Bài học – Tổ chức khoa học, giảng dạy hiệu quả! 📚📝" />
                    <BannerSubTitle
                        title="Dễ dàng tạo, sắp xếp và chỉnh sửa bài giảng, đề thi theo lộ trình giảng dạy.
                        Upload slide, soạn bài trực tiếp hoặc sử dụng AI Tia để tạo nội dung nhanh chóng! 🚀✨"
                    />
                </div>
                <Image
                    src={bigTiawai2}
                    alt="big tiawai 2"
                    height={400}
                    className="max-h-[400px] w-auto"
                    priority
                />
            </Banner>

            <div>
                <div className="mb-6 text-3xl font-bold">Quản lý lớp học</div>
                <Space size="large">
                    <SearchForm />
                    <ClassDropdown />
                </Space>

                {/* Danh sách đề thi */}
                <div className="mb-6 text-2xl font-bold">Đề thi</div>
                <Row gutter={[16, 16]} className="mb-6">
                    {examList.map((exam) => (
                        <Col key={exam.id} xs={24} sm={12} md={8} lg={6}>
                            <TestCard
                                title={exam.title}
                                duration={exam.duration}
                                attempts={exam.attempts}
                            />
                        </Col>
                    ))}
                </Row>

                <div className="mb-6 text-2xl font-bold">Bài học</div>
                <Row gutter={[16, 16]} className="mb-6">
                    {lessonList.map((lesson) => (
                        <Col key={lesson.id} xs={24} sm={12} md={8} lg={6}>
                            <LessonCard title={lesson.title} />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default ExamPage;
