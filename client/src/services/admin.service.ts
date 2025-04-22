import { appApi } from '@/services/config.service';
import { Exam } from '@/types/exam';

const adminApi = appApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getStatistics: builder.query<
            {
                totalUsers: number;
                totalReports: number;
                totalClassrooms: number;
                totalTests: number;
            },
            void
        >({
            query: () => '/statistics',
            providesTags: ['Statistics'],
        }),

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
    useGetStatisticsQuery,
    useCreateExamMutation,
    useGetExamsQuery,
    useDeleteExamByIdMutation,
} = adminApi;
