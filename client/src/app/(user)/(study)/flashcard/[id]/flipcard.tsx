'use client';
import { Card, Typography } from 'antd';
import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
const { Title } = Typography;

interface Flashcard {
    word: string;
    meaning: string;
    wordType: string;
}

interface FlipCardProps {
    flashcard: Flashcard;
    isFlippable: boolean;
}

const FlipCard = ({ flashcard, isFlippable = false }: FlipCardProps) => {
    const [isFlipped, setIsFlipped] = useState(false);
    return isFlippable ? (
        <ReactCardFlip
            isFlipped={isFlipped}
            flipDirection="horizontal"
            flipSpeedBackToFront={0.5}
            flipSpeedFrontToBack={0.5}
        >
            <Card
                className="!aspect-square content-center !rounded-3xl !bg-[#4d2c5e] text-center"
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <h2 className="text-4xl" style={{ color: 'white' }}>
                    {flashcard.word}
                </h2>
            </Card>

            <Card
                className="!aspect-square content-center !rounded-3xl !bg-[#4d2c5e] text-center"
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <Title level={1} style={{ color: 'white' }}>
                    {flashcard.meaning}
                </Title>
                <Title level={4} style={{ color: 'white' }}>
                    {flashcard.wordType.trim()}
                </Title>
            </Card>
        </ReactCardFlip>
    ) : (
        <Card className="!aspect-square content-center !rounded-3xl !bg-[#4d2c5e] text-center opacity-70">
            <h2 className="text-3xl" style={{ color: 'white' }}>
                {flashcard.word}
            </h2>
        </Card>
    );
};

export default FlipCard;
