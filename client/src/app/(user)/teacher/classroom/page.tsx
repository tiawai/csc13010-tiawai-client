'use client';
import { useState } from 'react';
import Banner from '@/app/(user)/student/(study)/_ui/banner';
import { BannerTitle, BannerSubTitle } from '@/components/common/banner';
import Image from 'next/image';
import bigTiawai2 from '@public/big-tiawai-2.svg';
import SearchForm from '@/components/teacher/common/searchform';
import { Row, Col, Spin, Empty, Button } from 'antd';
import Course from '@/components/teacher/classroom/course';
import ClassroomModal from '@/components/teacher/classroom/classroom-modal';
import ConfirmModal from '@/components/common/confirm-modal';
import {
    useGetTeacherClassroomsQuery,
    useDeleteClassroomMutation,
} from '@/services/classroom';
import { PlusOutlined } from '@ant-design/icons';
import chatIcon from '@public/chat-icon.svg';
import { notification } from 'antd';
import { Classroom } from '@/types/classroom.type';

const ClassroomPage = () => {
    const {
        data: classrooms,
        isLoading,
        error,
    } = useGetTeacherClassroomsQuery();
    const [deleteClassroom] = useDeleteClassroomMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClassroom, setSelectedClassroom] = useState<
        Classroom | undefined
    >(undefined);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [classroomToDelete, setClassroomToDelete] = useState<string | null>(
        null,
    );
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleOpenModal = (classroom?: Classroom) => {
        setSelectedClassroom(classroom);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedClassroom(undefined);
        setIsModalOpen(false);
    };

    const handleOpenConfirmModal = (id: string) => {
        setClassroomToDelete(id);
        setIsConfirmModalOpen(true);
    };

    const handleCloseConfirmModal = () => {
        setClassroomToDelete(null);
        setIsConfirmModalOpen(false);
    };

    const handleDeleteClassroom = async () => {
        if (!classroomToDelete) return;
        try {
            await deleteClassroom(classroomToDelete).unwrap();
            notification.success({ message: 'Xóa lớp học thành công!' });
            handleCloseConfirmModal();
        } catch (error: unknown) {
            const err = error as Error;
            notification.error({
                message: 'Xóa lớp học thất bại',
                description: err.message,
            });
        }
    };

    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };

    const filteredClassrooms = classrooms?.filter((classroom) =>
        `${classroom.className} ${classroom.description}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
    );

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
            <div className="flex items-center justify-end gap-3">
                <Button
                    icon={<PlusOutlined />}
                    className="flex items-center gap-2 !rounded-full !bg-[#DAE3E9] px-4 py-2 !font-montserrat text-black shadow hover:bg-gray-200"
                    onClick={() => handleOpenModal()}
                >
                    Tạo lớp học ngay
                </Button>
                <div className="flex items-center justify-center rounded-full bg-[#5369A1]">
                    <Image
                        src={chatIcon}
                        alt="chat icon"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                </div>
            </div>
            <div>
                <div className="!mb-6 text-3xl font-bold">Quản lý lớp học</div>
                <SearchForm title="Tìm kiếm lớp học" onSearch={handleSearch} />
                {isLoading ? (
                    <div className="flex justify-center">
                        <Spin size="large" />
                    </div>
                ) : error ? (
                    <Empty description="Lỗi khi tải danh sách lớp học" />
                ) : filteredClassrooms && filteredClassrooms.length > 0 ? (
                    <Row gutter={[24, 16]}>
                        {filteredClassrooms.map((classroom) => (
                            <Col key={classroom.id} xs={24} sm={12} md={8}>
                                <Course
                                    id={classroom.id}
                                    title={classroom.className}
                                    image={classroom.backgroundImage}
                                    star={Math.round(classroom.avgRating)}
                                    rating={classroom.avgRating}
                                    price={
                                        classroom.price === 0
                                            ? 'Free'
                                            : `${Number(classroom.price).toLocaleString('vi-VN')}₫`
                                    }
                                    students={`${classroom.maxStudent}+`}
                                    onEdit={() => handleOpenModal(classroom)}
                                    onDelete={() =>
                                        handleOpenConfirmModal(classroom.id)
                                    }
                                />
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <Empty description="Không tìm thấy lớp học nào" />
                )}
            </div>
            <ClassroomModal
                open={isModalOpen}
                onClose={handleCloseModal}
                classroom={selectedClassroom}
            />
            <ConfirmModal
                open={isConfirmModalOpen}
                content="Bạn có chắc chắn muốn xóa lớp học này không?"
                onConfirm={handleDeleteClassroom}
                onCancel={handleCloseConfirmModal}
            />
        </div>
    );
};

export default ClassroomPage;
