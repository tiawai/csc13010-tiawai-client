/* eslint-disable */
import { appApi } from "@/services/config";
import { Exam, ExamResult } from "@/types/exam";

const examApi = appApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getExams: builder.query<Exam[], void>({
            query: () => ({
                url: "/exam",
                method: "GET",
            }),
            providesTags: ["Auth", "Exam"],
        }),

        getExamPractices: builder.query<Exam[], void>({
            query: () => ({
                url: "/exam/practices",
                method: "GET",
            }),
            providesTags: ["Auth", "Exam"],
        }),

        getExamById: builder.query<Exam, number>({
            query: (id: number) => ({
                url: `/exam/${id}`,
                method: "GET",
            }),
            providesTags: ["Auth"],
        }),

        submitExam: builder.mutation({
            query: (body: any) => ({
                url: "/submission",
                method: "POST",
                body: body,
            }),
            invalidatesTags: ["History"],
        }),

        getSubmissions: builder.query<ExamResult[], number>({
            query: (id: number) => ({
                url: `/exam/${id}/submissions`,
                method: "GET",
            }),
            providesTags: ["Auth"],
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
                method: "GET",
            }),
            providesTags: ["Auth"],
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
