import { appApi } from '@/services/config.service';
import { Classroom, Lesson } from '@/types/classroom.type';

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
        getClassroomById: builder.query<Classroom, string>({
            query: (id) => ({
                url: `/classrooms/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Classroom', id }],
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
    }),
});

export const {
    useGetTeacherClassroomsQuery,
    useGetClassroomByIdQuery,
    useGetLessonsQuery,
    useGetLessonByIdQuery,
    useCreateClassroomMutation,
    useUpdateClassroomMutation,
    useDeleteClassroomMutation,
    useCreateLessonMutation,
    useUpdateLessonMutation,
    useDeleteLessonMutation,
} = classroomApi;
