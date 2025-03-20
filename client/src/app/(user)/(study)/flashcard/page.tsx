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
import { Banner, BannerDescription, BannerTitle } from '@/ui/components/banner';
import { useState } from 'react';
import {
    useCreateFlashcardMutation,
    useGetAllFlashcardTopicsQuery,
} from '@/services/flashcard';
import { Flashcard } from '@/types/flashcard';
import { FLASH_CARD_BANNER } from '@/strings/flashcard';
import generateBtnIcon from '@public/generate-btn-icon.svg';
const { TextArea } = Input;
const { Title } = Typography;

const defaultTopics = [
    {
        title: 'Khoa học',
        image: 'https://tiawai-storage.sgp1.cdn.digitaloceanspaces.com/flashcard/science.png',
    },
    {
        title: 'Nghiên cứu',
        image: 'https://tiawai-storage.sgp1.cdn.digitaloceanspaces.com/flashcard/research.png',
    },
    {
        title: 'Văn phòng',
        image: 'https://tiawai-storage.sgp1.cdn.digitaloceanspaces.com/flashcard/office.png',
    },
    {
        title: 'Công nghệ',
        image: 'https://tiawai-storage.sgp1.cdn.digitaloceanspaces.com/flashcard/it.png',
    },
    {
        title: 'Văn học',
        image: 'https://tiawai-storage.sgp1.cdn.digitaloceanspaces.com/flashcard/literature.png',
    },
    {
        title: 'Văn hóa',
        image: 'https://tiawai-storage.sgp1.cdn.digitaloceanspaces.com/flashcard/culture.png',
    },
];

export default function FlashCardPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [text, setText] = useState('');
    const [createFlashcard, { isLoading: isCreatingFlashcard }] =
        useCreateFlashcardMutation();
    const { data: topics, isLoading: isGettingTopics } =
        useGetAllFlashcardTopicsQuery({});
    console.log(topics);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        if (text) {
            try {
                await createFlashcard({ paragraph: text }).unwrap();
            } catch (error) {
                console.log(error);
            }
        }
        setText('');
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setText('');
        setIsModalOpen(false);
    };
    if (isGettingTopics) {
        return <Skeleton />;
    }

    return (
        <Space direction="vertical" className="select-none" size={60}>
            <Banner gap={20}>
                <Image
                    className="max-w-60"
                    src={
                        'https://tiawai-storage.sgp1.cdn.digitaloceanspaces.com/flashcard/banner-img.png'
                    }
                    width={400}
                    height={400}
                    alt="big tiawai 2"
                />
                <Flex vertical align="end">
                    <BannerTitle>{FLASH_CARD_BANNER.title}</BannerTitle>
                    <BannerDescription>
                        {FLASH_CARD_BANNER.description}
                    </BannerDescription>
                </Flex>
            </Banner>

            <Row justify={'center'} gutter={[0, 40]}>
                <Button
                    className="h-auto rounded-full bg-[#DBE3F8] py-0 font-roboto text-3xl font-medium transition-all duration-300 ease-in-out hover:scale-110"
                    onClick={showModal}
                >
                    <Image src={generateBtnIcon} alt="generate button icon" />
                    <span className="-ml-1 font-montserrat text-2xl font-medium">
                        Nhập đoạn văn
                    </span>
                </Button>
                <Modal
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    style={{ top: 300 }}
                    title="Tạo Flashcard từ văn bản"
                    confirmLoading={isCreatingFlashcard}
                >
                    <TextArea
                        placeholder="Nhập văn bản"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        autoSize={{ minRows: 3, maxRows: 10 }}
                    />
                </Modal>
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
                                            console.log(topic),
                                            (
                                                <Link
                                                    className="relative m-auto aspect-[2/1.5] w-full max-w-xl grow content-center rounded-xl bg-[#DBE3F8] text-center"
                                                    href={`/flashcard/${encodeURIComponent(topic.topic)}`}
                                                    key={index}
                                                >
                                                    <Title level={2}>
                                                        {topic.topic}
                                                    </Title>
                                                    <div className="relative m-auto aspect-square w-2/5 content-center rounded-3xl bg-white/50 p-4">
                                                        <Image
                                                            className="m-auto aspect-square"
                                                            src={
                                                                'https://tiawai-storage.sgp1.cdn.digitaloceanspaces.com/flashcard/heart.png'
                                                            }
                                                            alt="tiawai chatbot icon"
                                                            width={50}
                                                            height={50}
                                                        />
                                                    </div>
                                                </Link>
                                            )
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
                                    'relative m-auto aspect-[2/1.5] w-full max-w-xl grow content-center rounded-xl text-center',
                                    index % 2 == 0
                                        ? 'bg-[#E9DAE9]'
                                        : 'bg-[#DAE3E9]',
                                )}
                                href={`/flashcard/${encodeURIComponent(topic.title)}`}
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
