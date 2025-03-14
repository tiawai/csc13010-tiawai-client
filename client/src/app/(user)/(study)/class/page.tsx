import { CLASS_BANNER, CLASS_HEADER } from '@/strings/class';
import FindClassInput from '@/ui/components/find-class-input';
import LeftTextBanner from '@/ui/components/left-text-banner';
import { CustomTitle } from '@/ui/components/title';
import ClassFrame from '@/ui/home/class-frame';
import { Col, Flex, Row } from 'antd';

const classData = [
    {
        image: '',
        rating: 4.8,
        price: 500000,
        title: 'Lớp học 2',
        lessons: 15,
        students: 150,
        duration: 150,
        teacher: {
            name: 'Teacher 2',
            image: '',
        },
    },
    {
        image: '',
        rating: 4.8,
        price: 500000,
        title: 'Lớp học 2',
        lessons: 15,
        students: 150,
        duration: 150,
        teacher: {
            name: 'Teacher 2',
            image: '',
        },
    },
    {
        image: '',
        rating: 4.8,
        price: 500000,
        title: 'Lớp học 2',
        lessons: 15,
        students: 150,
        duration: 150,
        teacher: {
            name: 'Teacher 2',
            image: '',
        },
    },
    {
        image: '',
        rating: 4.8,
        price: 500000,
        title: 'Lớp học 2',
        lessons: 15,
        students: 150,
        duration: 150,
        teacher: {
            name: 'Teacher 2',
            image: '',
        },
    },
    {
        image: '',
        rating: 4.8,
        price: 500000,
        title: 'Lớp học 2',
        lessons: 15,
        students: 150,
        duration: 150,
        teacher: {
            name: 'Teacher 2',
            image: '',
        },
    },
    {
        image: '',
        rating: 4.8,
        price: 500000,
        title: 'Lớp học 2',
        lessons: 15,
        students: 150,
        duration: 150,
        teacher: {
            name: 'Teacher 2',
            image: '',
        },
    },
];

const Class = () => {
    return (
        <Flex vertical>
            <LeftTextBanner {...CLASS_BANNER} />
            <div className="mb-8 px-72 text-center font-montserrat text-xl">
                {CLASS_HEADER}
            </div>
            <FindClassInput className="mb-20 w-[30%]" />
            <CustomTitle level={2} className="!mb-10 !font-bold capitalize">
                Lớp học phổ biến
            </CustomTitle>
            <Row gutter={[40, 64]} className="mb-10">
                {classData.map((classItem, index) => (
                    <Col xs={24} md={12} lg={8} key={index}>
                        <ClassFrame class={classItem} />
                    </Col>
                ))}
            </Row>
        </Flex>
    );
};

export default Class;
