'use client';
import { useState } from 'react';
import { Button, Progress, Row, Col } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import FlipCard from './flipcard';

export default function FlashcardSlider({
    flashcards,
}: {
    flashcards: {
        word: string;
        meaning: string;
        wordType: string;
    }[];
}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    };

    const handlePrev = () => {
        setCurrentIndex(
            (prevIndex) =>
                (prevIndex - 1 + flashcards.length) % flashcards.length,
        );
    };

    return (
        <div className="m-auto w-5/6 max-w-[1440px]">
            <Row
                className="m-auto mb-20 items-center justify-center justify-items-center"
                gutter={16}
            >
                <Col span={8} className="!pr-20">
                    <FlipCard
                        flashcard={flashcards[Math.max(currentIndex - 1, 0)]}
                        isFlippable={false}
                    />
                </Col>

                <Col span={8}>
                    <FlipCard
                        key={currentIndex}
                        flashcard={flashcards[currentIndex]}
                        isFlippable={true}
                    />
                    <Button
                        className="!absolute !left-0 !top-1/2 !h-12 !w-12 !-translate-x-1/2 !-translate-y-1/2"
                        size="large"
                        icon={<LeftOutlined />}
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                    />
                    <Button
                        className="!absolute !right-0 !top-1/2 !h-12 !w-12 !-translate-y-1/2 !translate-x-1/2"
                        size="large"
                        icon={<RightOutlined />}
                        onClick={handleNext}
                        disabled={currentIndex === flashcards.length - 1}
                    />
                </Col>

                <Col span={8} className="-z-10 !pl-20">
                    <FlipCard
                        flashcard={
                            flashcards[
                                Math.min(
                                    currentIndex + 1,
                                    flashcards.length - 1,
                                )
                            ]
                        }
                        isFlippable={false}
                    />
                </Col>
            </Row>
            <Progress
                percent={((currentIndex + 1) / flashcards.length) * 100}
                showInfo={false}
            />
            <p className="text-center">
                {currentIndex + 1}/{flashcards.length}
            </p>
        </div>
    );
}
