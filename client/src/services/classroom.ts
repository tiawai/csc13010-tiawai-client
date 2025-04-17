import { appApi } from '@/services/config.service';
import { Classroom, CreateClassroomDto } from '@/types/classroom.type';

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
    }),
});

export const {
    useGetTeacherClassroomsQuery,
    useCreateClassroomMutation,
    useUpdateClassroomMutation,
    useDeleteClassroomMutation,
} = classroomApi;
