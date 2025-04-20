'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
    Row,
    Col,
    Typography,
    Input,
    Modal,
    Space,
    Skeleton,
    Empty,
    Flex,
    Button,
} from 'antd';
import { twMerge } from 'tailwind-merge';
import fcBannerImage from '@public/flashcard/banner-img.png';
import scienceImage from '@public/flashcard/science.png';
import researchImage from '@public/flashcard/research.png';
import officeImage from '@public/flashcard/office.png';
import itImage from '@public/flashcard/it.png';
import literatureImage from '@public/flashcard/literature.png';
import cultureImage from '@public/flashcard/culture.png';
import { useNotification } from '@/lib/hooks/use-notification';
import heartImage from '@public/flashcard/heart.png';
import { Banner, BannerDescription, BannerTitle } from '@/ui/components/banner';
import { useState } from 'react';
import {
    useCreateFlashcardMutation,
    useGenerateFlashcardMutation,
    useGetAllFlashcardTopicsQuery,
    useUpdateFlashcardMutation,
} from '@/services/flashcard';
import { Flashcard } from '@/types/flashcard';
import { FLASH_CARD_BANNER } from '@/strings/flashcard';
import generateBtnIcon from '@public/generate-btn-icon.svg';
import ManualFlashcardModal, {
    ManualFlashcardData,
} from './components/ManualFlashcardModal';
const { TextArea } = Input;
const { Title } = Typography;

const defaultTopics = [
    {
        title: 'Khoa học',
        image: scienceImage,
    },
    {
        title: 'Nghiên cứu',
        image: researchImage,
    },
    {
        title: 'Văn phòng',
        image: officeImage,
    },
    {
        title: 'Công nghệ',
        image: itImage,
    },
    {
        title: 'Văn học',
        image: literatureImage,
    },
    {
        title: 'Văn hóa',
        image: cultureImage,
    },
];

export default function FlashCardPage() {
    const { notify } = useNotification();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isManualModalOpen, setIsManualModalOpen] = useState(false);
    const [text, setText] = useState('');
    const [generateFlashcard, { isLoading: isGeneratingFlashcard }] =
        useGenerateFlashcardMutation();
    const [createFlashcard, { isLoading: isCreatingFlashcard }] =
        useCreateFlashcardMutation();
    const [updateFlashcard, { isLoading: isUpdatingFlashcard }] =
        useUpdateFlashcardMutation();
    const { data: topics, isLoading: isGettingTopics } =
        useGetAllFlashcardTopicsQuery({});

    const showModal = () => {
        setIsModalOpen(true);
    };

    const showManualModal = () => {
        setIsManualModalOpen(true);
    };

    const handleOk = async () => {
        if (text) {
            try {
                await generateFlashcard({ paragraph: text }).unwrap();
                notify({
                    message: 'Tạo danh sách từ vựng thành công',
                    description: 'Danh sách từ vựng đã được tạo thành công.',
                });
            } catch (error) {
                console.log(error);
                notify({
                    message: 'Tạo danh sách từ vựng thất bại',
                    description: 'Đã xảy ra lỗi khi tạo danh sách từ vựng.',
                    notiType: 'error',
                });
            }
        }
        setText('');
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setText('');
        setIsModalOpen(false);
    };

    const handleManualOk = async (
        flashcardData: ManualFlashcardData,
        isUpdate: boolean,
    ) => {
        try {
            if (isUpdate) {
                // Call update API if it's an existing topic
                const { id, ...body } = flashcardData;
                await updateFlashcard({
                    id,
                    body,
                }).unwrap();
                notify({
                    message: 'Cập nhật danh sách từ vựng thành công',
                    description: `Danh sách "${flashcardData.topic}" đã được cập nhật thành công.`,
                });
            } else {
                // Call create API for new topics
                await createFlashcard(flashcardData).unwrap();
                notify({
                    message: 'Tạo danh sách từ vựng thành công',
                    description: `Danh sách "${flashcardData.topic}" đã được tạo thành công.`,
                });
            }
        } catch (error) {
            notify({
                message: isUpdate
                    ? 'Cập nhật danh sách thất bại'
                    : 'Tạo danh sách từ vựng thất bại',
                description: 'Đã xảy ra lỗi khi xử lý danh sách từ vựng.',
                notiType: 'error',
            });
            console.error('Error with flashcard:', error);
        } finally {
            setIsManualModalOpen(false);
        }
    };

    const handleManualCancel = () => {
        setIsManualModalOpen(false);
    };

    if (isGettingTopics) {
        return <Skeleton />;
    }

    return (
        <Space direction="vertical" className="select-none" size={60}>
            <Banner gap={20}>
                <Image
                    className="max-w-60"
                    src={fcBannerImage}
                    alt="big tiawai 2"
                />
                <Flex vertical align="end">
                    <BannerTitle>{FLASH_CARD_BANNER.title}</BannerTitle>
                    <BannerDescription>
                        {FLASH_CARD_BANNER.description}
                    </BannerDescription>
                </Flex>
            </Banner>

            <Row justify={'center'} gutter={[0, 40]} className="mb-20">
                <Flex gap={40}>
                    <Button
                        className="overflow-clip !rounded-full !bg-[#DBE3F8] !p-6 font-roboto text-3xl font-medium transition-all duration-300 ease-in-out hover:scale-110"
                        onClick={showModal}
                    >
                        <Image
                            src={generateBtnIcon}
                            alt="generate button icon"
                            className="-mt-3 size-16"
                        />
                        <span className="-ml-1 font-montserrat text-2xl font-medium">
                            Nhập đoạn văn
                        </span>
                    </Button>
                    <Button
                        className="overflow-clip !rounded-full !bg-[#E9DAE9] !p-6 font-roboto text-3xl font-medium transition-all duration-300 ease-in-out hover:scale-110"
                        onClick={showManualModal}
                    >
                        <Image
                            src={generateBtnIcon}
                            alt="generate button icon"
                            className="-mt-3 size-16"
                        />
                        <span className="-ml-1 font-montserrat text-2xl font-medium">
                            Thêm list từ thủ công
                        </span>
                    </Button>
                </Flex>
                <Modal
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    style={{ top: 300 }}
                    title="Tạo Flashcard từ văn bản"
                    confirmLoading={isGeneratingFlashcard}
                >
                    <TextArea
                        placeholder="Nhập văn bản"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        autoSize={{ minRows: 3, maxRows: 10 }}
                    />
                </Modal>

                <ManualFlashcardModal
                    isOpen={isManualModalOpen}
                    onOk={handleManualOk}
                    onCancel={handleManualCancel}
                    topics={topics}
                    isLoading={isCreatingFlashcard || isUpdatingFlashcard}
                />

                {topics && (
                    <>
                        <Col span={24}>
                            <Title>Flashcard của bạn</Title>
                        </Col>
                        <Col span={24} className="mb-12">
                            {topics.length > 0 ? (
                                <div className="grid grid-cols-3 justify-items-center gap-12">
                                    {topics.map(
                                        (topic: Flashcard, index: number) => (
                                            <Link
                                                className="relative m-auto aspect-[2/1.5] w-full max-w-xl grow content-center rounded-xl bg-[#DBE3F8] text-center"
                                                href={`/student/flashcard/${topic.id}`}
                                                key={index}
                                            >
                                                <Title level={2}>
                                                    {topic.topic}
                                                </Title>
                                                <div className="relative m-auto aspect-square w-2/5 content-center rounded-3xl bg-white/50 p-4">
                                                    <Image
                                                        className="m-auto aspect-square"
                                                        src={heartImage}
                                                        alt="tiawai chatbot icon"
                                                        width={50}
                                                        height={50}
                                                    />
                                                </div>
                                            </Link>
                                        ),
                                    )}
                                </div>
                            ) : (
                                <Empty
                                    className="!m-auto"
                                    description="Không có dữ liệu"
                                    imageStyle={{ height: 100 }}
                                />
                            )}
                        </Col>
                    </>
                )}
                <Col span={24}>
                    <Title>Các chủ đề</Title>
                </Col>
                <Col span={24}>
                    <div className="grid grid-cols-3 justify-items-center gap-12">
                        {defaultTopics.map((topic, index) => (
                            <Link
                                className={twMerge(
                                    'relative m-auto aspect-[2/1.5] w-full max-w-xl grow content-center rounded-xl text-center shadow-[0px_3.5701634883880615px_78.54359436035156px_0px_rgba(0,0,0,0.05)]',
                                    index % 2 == 0
                                        ? 'bg-[#E9DAE9]'
                                        : 'bg-[#DAE3E9]',
                                )}
                                href={`/student/flashcard/${encodeURIComponent(topic.title)}`}
                                key={index}
                            >
                                <Title level={2}>{topic.title}</Title>
                                <div className="relative m-auto aspect-square w-2/5 content-center rounded-3xl bg-white/50 p-4">
                                    <Image
                                        className="m-auto aspect-square"
                                        src={topic.image}
                                        alt="tiawai chatbot icon"
                                        width={50}
                                        height={50}
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                </Col>
            </Row>
        </Space>
    );
}
