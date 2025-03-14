import Banner from '@/app/(user)/(study)/_ui/banner';
import { BannerTitle, BannerSubTitle } from '@/components/common/banner';
import Image from 'next/image';
import bigTiawai2 from '@public/big-tiawai-2.svg';
import SearchForm from '@/components/teacher/common/searchform';
import { Row, Col } from 'antd';
import Course from '@/components/teacher/classroom/course';
import ieltsImage from '@public/example/ielts.png';

const courses = [
    {
        title: 'IELTS CHO NGƯỜI MỚI BẮT ĐẦU',
        image: ieltsImage,
        star: 4,
        rating: 4.5,
        price: 'Free',
        students: '200+',
    },
    {
        title: 'CHINH PHỤC IELTS READING 8.0',
        image: ieltsImage,
        star: 4,
        rating: 4.5,
        price: 'Free',
        students: '200+',
    },
    {
        title: '5 BỘ ĐỀ THI THỬ THPTQG TIẾNG ANH',
        image: ieltsImage,
        star: 4,
        rating: 4.5,
        price: 'Free',
        students: '200+',
    },
];

const classroom = () => {
    return (
        <div className="select-none space-y-20">
            <Banner>
                <div>
                    <BannerTitle title="Quản lý lớp học – Dễ dàng, hiệu quả, chuyên nghiệp! 🎓📚" />
                    <BannerSubTitle
                        title="Tạo lớp học, quản lý học sinh và theo dõi tiến độ chỉ trong vài bước.
                Duy trì sự tương tác, tổ chức bài tập, đề thi một cách khoa học để nâng cao chất lượng giảng dạy! 🚀✨"
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
                <div className="!mb-6 text-3xl font-bold">Quản lý lớp học</div>
                <SearchForm />
                <Row gutter={[24, 16]}>
                    {courses.map((course, index) => (
                        <Col key={index} xs={24} sm={12} md={8}>
                            <Course {...course} />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default classroom;
