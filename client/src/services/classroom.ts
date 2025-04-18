import { appApi } from '@/services/config.service';
import { Classroom, Lesson, Student } from '@/types/classroom.type';

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
        getClassroomStudents: builder.query<Student[], string>({
            query: (classId) => ({
                url: `/classrooms/${classId}/students`,
                method: 'GET',
            }),
            providesTags: ['Student'],
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
    }),
});

export const {
    useGetTeacherClassroomsQuery,
    useGetClassroomsQuery,
    useGetClassroomByIdQuery,
    useGetClassroomStudentsQuery,
    useGetLessonsQuery,
    useGetLessonByIdQuery,
    useCreateClassroomMutation,
    useUpdateClassroomMutation,
    useDeleteClassroomMutation,
    useCreateLessonMutation,
    useUpdateLessonMutation,
    useDeleteLessonMutation,
    useRemoveStudentFromClassroomMutation,
} = classroomApi;
