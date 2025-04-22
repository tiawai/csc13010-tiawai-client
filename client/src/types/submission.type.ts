import { Answer } from './question.type';

export interface Submission {
    result: {
        score: number;
        correctAnswers: number;
        incorrectAnswers: number;
        emptyAnswers: number;
        timeConsumed: number;
    };
    answers: Answer[];
}
