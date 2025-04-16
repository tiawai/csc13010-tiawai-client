'use client';
import { useEffect, useState } from 'react';

interface TypingEffectProps {
    text: string;
    speed?: number;
    onComplete?: () => void;
}

const TypingEffect = ({ text, speed = 100, onComplete }: TypingEffectProps) => {
    const [targetText, setTargetText] = useState(text);
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);

    // Update targetText when text prop changes
    useEffect(() => {
        setTargetText(text);
    }, [text]);

    useEffect(() => {
        if (index < targetText.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + targetText[index]);
                setIndex((prev) => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        } else if (index === targetText.length && onComplete) {
            onComplete();
        }
    }, [index, targetText, speed, onComplete]);

    return (
        <>
            {displayedText}
            {index < targetText.length && (
                <span className="animate-pulse">▋</span>
            )}
        </>
    );
};

export default TypingEffect;
