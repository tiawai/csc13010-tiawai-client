'use client';

import { useState } from 'react';
import { Card, Button, Progress, Typography } from 'antd';
import {
    LeftOutlined,
    RightOutlined,
    UpOutlined,
    DownOutlined,
} from '@ant-design/icons';
import { twMerge } from 'tailwind-merge';
const { Title } = Typography;

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
    const [showMeaning, setShowMeaning] = useState(false);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
        setShowMeaning(false);
    };

    const handlePrev = () => {
        setCurrentIndex(
            (prevIndex) =>
                (prevIndex - 1 + flashcards.length) % flashcards.length,
        );
        setShowMeaning(false);
    };

    return (
        <div className="m-auto w-5/6 max-w-[1440px]">
            <div className="flash-card__slider m-auto grid grid-cols-3 items-center justify-center justify-items-center gap-8">
                <Flashcard
                    word={flashcards[Math.max(currentIndex - 1, 0)].word}
                    position="left"
                    isHidden={currentIndex === 0}
                />

                <Flashcard
                    word={flashcards[currentIndex].word}
                    position="middle"
                    isHidden={false}
                >
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
                    <Button
                        className={twMerge(
                            '!absolute !bottom-0 !left-1/2 !h-12 !w-12 !-translate-x-1/2 !translate-y-1/2',
                        )}
                        size="large"
                        icon={showMeaning ? <DownOutlined /> : <UpOutlined />}
                        onClick={() => setShowMeaning((prev) => !prev)}
                    />
                </Flashcard>

                <Flashcard
                    word={
                        flashcards[
                            Math.min(currentIndex + 1, flashcards.length - 1)
                        ].word
                    }
                    position="right"
                    isHidden={currentIndex === flashcards.length - 1}
                />

                {showMeaning && (
                    <Card
                        className="col-start-2 !mt-8 aspect-video w-full content-center !rounded-3xl !bg-[#4d2c5e]"
                        bordered={false}
                    >
                        <Title
                            className="text-center"
                            style={{ color: 'white' }}
                            level={3}
                        >
                            {flashcards[currentIndex].meaning}
                        </Title>
                        <Title
                            className="text-center"
                            style={{ color: 'white' }}
                            level={5}
                        >
                            ({flashcards[currentIndex].wordType.trim()})
                        </Title>
                    </Card>
                )}
                <div className="col-span-3 col-start-1 w-5/12">
                    <Progress
                        percent={((currentIndex + 1) / flashcards.length) * 100}
                        showInfo={false}
                    />
                    <p className="text-center">
                        {currentIndex + 1}/{flashcards.length}
                    </p>
                </div>
            </div>
        </div>
    );
}

const Flashcard = ({
    word,
    position,
    isHidden,
    children,
}: {
    word?: string;
    position: string;
    isHidden: boolean;
    children?: React.ReactNode;
}) => {
    return (
        <Card
            className={twMerge(
                '!relative !aspect-square !content-center !rounded-3xl !bg-[#4d2c5e]',
                (position === 'right' || position === 'left') &&
                    '!w-4/5 !bg-opacity-70',
                position === 'middle' && '!w-full',
                isHidden && '!select-none !opacity-0',
            )}
        >
            <h2
                className="min-w-0 text-center text-4xl leading-none"
                style={{ color: 'white' }}
            >
                {word}
            </h2>
            {children}
        </Card>
    );
};
