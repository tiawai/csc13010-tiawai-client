'use client';

import Link from 'next/link';
import FlashcardSlider from './flashcard-slider';
import { CarryOutOutlined, LeftOutlined } from '@ant-design/icons';
import { useParams } from 'next/navigation';
import { Row, Col, Skeleton } from 'antd';
import {
    flashcardsScience,
    flashcardsResearch,
    flashcardsOffice,
    flashcardsIT,
    flashcardsLiterature,
    flashcardsCulture,
} from './flashcards';
import { useGetFlashcardsByTopicQuery } from '@/services/flashcard';

const data = [
    {
        topic: 'Khoa học',
        words: flashcardsScience,
    },
    {
        topic: 'Nghiên cứu',
        words: flashcardsResearch,
    },
    {
        topic: 'Văn phòng',
        words: flashcardsOffice,
    },
    {
        topic: 'Công nghệ',
        words: flashcardsIT,
    },
    {
        topic: 'Văn học',
        words: flashcardsLiterature,
    },
    {
        topic: 'Văn hóa',
        words: flashcardsCulture,
    },
];

export default function FlashCardItemPage() {
    const { id } = useParams();
    const { data: userFlashcards, isLoading } = useGetFlashcardsByTopicQuery(
        id,
        {
            skip: !id,
        },
    );

    const decodedId = id
        ? decodeURIComponent(Array.isArray(id) ? id[0] : id)
        : 'Unknown';

    if (isLoading) {
        return <Skeleton />;
    }
    const defaultFlashcards = data.find(
        (item) => item.topic === decodedId,
    )?.words;

    const flashcards = userFlashcards?.flashcards || defaultFlashcards;
    return (
        <div className="bg-[url('/home-icon-bg.svg')]">
            <Row gutter={[0, 40]}>
                <Col offset={2}>
                    <Link
                        className="flex items-center gap-2 rounded-full bg-[#e9dae9] px-4 py-3 text-black"
                        href="/flashcard"
                    >
                        <LeftOutlined />
                        <span className="text-xl font-bold">
                            Flashcard {decodedId}
                        </span>
                        <div className="rounded-full bg-[#f4edf4] px-4 py-1">
                            <CarryOutOutlined className="text-[#4d2c5e]" />
                        </div>
                    </Link>
                </Col>

                <Col span={20} offset={2}>
                    <FlashcardSlider flashcards={flashcards || []} />
                </Col>
            </Row>
        </div>
    );
}
