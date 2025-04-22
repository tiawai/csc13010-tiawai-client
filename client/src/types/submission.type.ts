import { Answer } from './question.type';

export interface Submission {
    id: string;
    score: number;
    correctAnswers: number;
    incorrectAnswers: number;
    emptyAnswers: number;
    timeConsumed: number;
}

export interface SubmissionResult {
    result: {
        id: string;
        score: number;
        correctAnswers: number;
        incorrectAnswers: number;
        emptyAnswers: number;
        timeConsumed: number;
    };
    answers: Answer[];
}
