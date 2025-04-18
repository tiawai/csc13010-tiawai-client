export interface Classroom {
    id: string;
    className: string;
    description: string;
    backgroundImage: string;
    maxStudent: number;
    price: number;
    avgRating: number;
    totalLessons: number;
    classCode: string;
    teacherId: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateClassroomDto {
    className: string;
    maxStudent: number;
    price?: number;
    description: string;
    image?: File;
}

export interface Lesson {
    id: string;
    classId: string;
    title: string;
    content: string;
    attachments: string[];
    createdAt: string;
    updatedAt: string;
}

export interface CreateLessonDto {
    classId: string;
    title: string;
    content: string;
    files?: File[];
}
