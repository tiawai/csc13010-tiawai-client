/* eslint-disable */
import { appApi } from '@/services/config.service';
import { Exam, ExamResult } from '@/types/exam';

const examApi = appApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getExams: builder.query<Exam[], void>({
            query: () => ({
                url: '/exam',
                method: 'GET',
            }),
            providesTags: ['Auth', 'Exam'],
        }),

        getExamPractices: builder.query<Exam[], void>({
            query: () => ({
                url: '/exam/practices',
                method: 'GET',
            }),
            providesTags: ['Auth', 'Exam'],
        }),

        getExamById: builder.query<Exam, string>({
            query: (id) => `/exam/${id}`,
            providesTags: ['Auth'],
        }),

        submitExam: builder.mutation({
            query: (body: any) => ({
                url: '/submission',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['History'],
        }),

        getSubmissions: builder.query<ExamResult[], string>({
            query: (id) => `/exam/${id}/submissions`,
            providesTags: ['Auth'],
        }),

        getExamResult: builder.query<
            ExamResult,
            { id: number; submissionId: string }
        >({
            query: ({
                id,
                submissionId,
            }: {
                id: number;
                submissionId: string;
            }) => ({
                url: `/exam/${id}/result/${submissionId}`,
                method: 'GET',
            }),
            providesTags: ['Auth'],
        }),
    }),
});

export const {
    useGetExamsQuery,
    useGetExamPracticesQuery,
    useGetExamByIdQuery,
    useSubmitExamMutation,
    useGetSubmissionsQuery,
    useGetExamResultQuery,
} = examApi;
