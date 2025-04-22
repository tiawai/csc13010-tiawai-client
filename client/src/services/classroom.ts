import { appApi } from '@/services/config.service';
import { Classroom, Lesson, Student } from '@/types/classroom.type';
import {
    CreateNationalTestDto,
    CreateTestDto,
    CreateToeicListeningTestDto,
    Test,
} from '@/types/test.type';

const classroomApi = appApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getTeacherClassrooms: builder.query<Classroom[], void>({
            query: () => ({
                url: '/classrooms/teacher',
                method: 'GET',
            }),
            providesTags: ['Classroom'],
        }),
        getClassrooms: builder.query<Classroom[], void>({
            query: () => ({
                url: '/classrooms',
                method: 'GET',
            }),
            providesTags: ['Classroom'],
        }),
        getClassroomById: builder.query<Classroom, string>({
            query: (id) => ({
                url: `/classrooms/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Classroom', id }],
        }),
        getMyClassrooms: builder.query<Classroom[], string>({
            query: (id) => `/classrooms/student/${id}/classrooms`,
            providesTags: ['Classroom'],
        }),
        getClassroomStudents: builder.query<Student[], string>({
            query: (classId) => ({
                url: `/classrooms/${classId}/students`,
                method: 'GET',
            }),
            providesTags: ['Student'],
        }),
        getClassroomLessons: builder.query<Lesson[], string>({
            query: (classId) => ({
                url: `/lessons?classId=${classId}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Lesson', id }],
        }),
        getLessons: builder.query<Lesson[], { classId?: string }>({
            query: ({ classId }) => ({
                url: '/lessons',
                method: 'GET',
                params: classId ? { classId } : undefined,
            }),
            providesTags: ['Lesson'],
        }),
        getLessonById: builder.query<Lesson, string>({
            query: (id) => ({
                url: `/lessons/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Lesson', id }],
        }),
        createClassroom: builder.mutation<Classroom, FormData>({
            query: (formData) => ({
                url: '/classrooms',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Classroom'],
        }),
        updateClassroom: builder.mutation<
            Classroom,
            { id: string; formData: FormData }
        >({
            query: ({ id, formData }) => ({
                url: `/classrooms/${id}`,
                method: 'PATCH',
                body: formData,
            }),
            invalidatesTags: ['Classroom'],
        }),
        deleteClassroom: builder.mutation<void, string>({
            query: (id) => ({
                url: `/classrooms/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Classroom'],
        }),
        createLesson: builder.mutation<Lesson, FormData>({
            query: (formData) => ({
                url: '/lessons',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Lesson'],
        }),
        updateLesson: builder.mutation<
            Lesson,
            { id: string; formData: FormData }
        >({
            query: ({ id, formData }) => ({
                url: `/lessons/${id}`,
                method: 'PATCH',
                body: formData,
            }),
            invalidatesTags: ['Lesson'],
        }),
        deleteLesson: builder.mutation<void, string>({
            query: (id) => ({
                url: `/lessons/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Lesson'],
        }),
        removeStudentFromClassroom: builder.mutation<
            void,
            { classId: string; studentId: string }
        >({
            query: ({ classId, studentId }) => ({
                url: `/classrooms/${classId}/student/${studentId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Student'],
        }),

        // create test for teacher
        createNationalTestClassroom: builder.mutation<
            Test,
            CreateNationalTestDto
        >({
            query: ({ classroomId, ...body }) => ({
                url: `/classrooms/${classroomId}/tests/national-test`,
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['Test'],
        }),

        createToeicListeningTestClassroom: builder.mutation<
            Test,
            CreateToeicListeningTestDto
        >({
            query: ({ classroomId, audioUrl, test }) => ({
                url: `/classrooms/${classroomId}/tests/toeic-listening-test?audioUrl=${audioUrl}`,
                method: 'POST',
                body: test,
            }),
            invalidatesTags: ['Test'],
        }),

        createToeicReadingTestClassroom: builder.mutation<Test, CreateTestDto>({
            query: ({ classroomId, ...body }) => ({
                url: `/classrooms/${classroomId}/tests/toeic-reading-test`,
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['Test'],
        }),

        getTestByClassroomId: builder.query<Test[], string>({
            query: (classroomId) => `/classrooms/${classroomId}/tests`,
            providesTags: ['Test'],
        }),

        deleteTestByClassroomId: builder.mutation<
            void,
            { classroomId: string; testId: string }
        >({
            query: ({ classroomId, testId }) => ({
                url: `/classrooms/${classroomId}/tests/${testId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Test'],
        }),
    }),
});

export const {
    useGetTeacherClassroomsQuery,
    useGetClassroomsQuery,
    useGetMyClassroomsQuery,
    useGetClassroomByIdQuery,
    useGetClassroomStudentsQuery,
    useGetClassroomLessonsQuery,
    useGetLessonsQuery,
    useGetLessonByIdQuery,
    useCreateClassroomMutation,
    useUpdateClassroomMutation,
    useDeleteClassroomMutation,
    useCreateLessonMutation,
    useUpdateLessonMutation,
    useDeleteLessonMutation,
    useRemoveStudentFromClassroomMutation,

    useCreateNationalTestClassroomMutation,
    useCreateToeicListeningTestClassroomMutation,
    useCreateToeicReadingTestClassroomMutation,
    useGetTestByClassroomIdQuery,
} = classroomApi;
