import { CreateQuestionDto, Question } from './question.type';

export enum TestType {
    NATIONAL_TEST = 'National Test',
    TOEIC_LISTENING = 'TOEIC Listening',
    TOEIC_READING = 'TOEIC Reading',
    ASSIGNMENT = 'Assignment',
}

export interface Test {
    id: string;
    title: string;
    author: string;
    type: TestType;
    startDate: Date;
    endDate: Date;
    totalQuestions: number;
    timeLength: number;
    audioUrl?: string | null;
    isGenerated: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface TestResponseDto {
    test: Test;
    questions: Question[];
}

export interface CreateTestDto {
    title: string;
    type: TestType;
    startDate: string;
    endDate: string;
    totalQuestions: number;
    timeLength: number;
}

export interface CreateNationalTestDto {
    test: CreateTestDto;
    questions: CreateQuestionDto[];
}

export interface UploadImagesToeicDto {
    testId: string;
    formData: FormData;
}

export interface UploadImagesToeicResponseDto {
    imageUrls: string[];
    message: string;
}

export interface CreateToeicPart {
    testId: string;
    hasImages?: boolean;
    batch?: number[];
    imageUrls: string[];
    questions: CreateQuestionDto[];
}
