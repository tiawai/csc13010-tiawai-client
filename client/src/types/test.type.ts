import { Answer, CreateQuestionDto, Question } from './question.type';

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
    submissionCount?: number;
    createdAt?: Date;
    updatedAt?: Date;
    classroomId?: string;
}

export interface TestResponseDto {
    test: Test;
    questions: Question[];
}

export interface CreateTestDto {
    classroomId?: string;
    title: string;
    type: TestType;
    startDate: string;
    endDate: string;
    totalQuestions: number;
    timeLength: number;
}

export interface CreateNationalTestDto {
    classroomId?: string;
    test: CreateTestDto;
    questions: CreateQuestionDto[];
}

export interface CreateToeicListeningTestDto {
    classroomId?: string;
    audioUrl: string;
    test: CreateTestDto;
}

export interface UploadAudioToeicDto {
    formData: FormData;
}

export interface UploadAudioToeicResponseDto {
    audioUrl: string;
    message: string;
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

export interface SubmitTestDto {
    testId: string;
    timeConsumed: number;
    answers: Answer[];
}

export interface TestResult {
    submissionId: string;
    score: number;
    correctAnswers: number;
    incorrectAnswers: number;
    emptyAnswers: number;
}

export enum Category {
    PHAT_AM = 'Phát âm',
    TRONG_AM = 'Trọng âm',
    TINH_HUONG_GIAO_TIEP = 'Tình huống giao tiếp',
    NGU_PHAP = 'Ngữ pháp',
    KIEM_TRA_TU_VUNG = 'Kiểm tra từ vựng',
    TIM_LOI_SAI = 'Tìm lỗi sai',
    VIET_LAI_CAU = 'Viết lại câu và kết hợp câu',
}
