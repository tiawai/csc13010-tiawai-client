import { appApi } from '@/services/config.service';
import { Exam } from '@/types/exam';
import { User } from '@/types/user.type';

const adminApi = appApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        createExam: builder.mutation({
            query: (exam) => ({
                url: '/exam',
                method: 'POST',
                body: exam,
            }),
            invalidatesTags: ['Exam'],
        }),

        getExams: builder.query<Exam[], void>({
            query: () => ({
                url: '/exam/admin/exams',
                method: 'GET',
            }),
            providesTags: ['Auth'],
        }),

        deleteExamById: builder.mutation({
            query: (id: number) => ({
                url: `/exam/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Exam'],
        }),
    }),
});

export const {
    useCreateExamMutation,
    useGetExamsQuery,
    useDeleteExamByIdMutation,
} = adminApi;
