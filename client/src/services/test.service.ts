import { appApi } from '@/services/config.service';
import { CreateQuestionDto } from '@/types/question.type';
import { Submission, SubmissionResult } from '@/types/submission.type';
import {
    Test,
    CreateTestDto,
    UploadImagesToeicDto,
    CreateToeicPart,
    UploadImagesToeicResponseDto,
    CreateNationalTestDto,
    TestResponseDto,
    UploadAudioToeicResponseDto,
    UploadAudioToeicDto,
    CreateToeicListeningTestDto,
    SubmitTestDto,
    TestType,
    TestResult,
    Category,
} from '@/types/test.type';

const testApi = appApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getTestsAnyone: builder.query<Test[], TestType>({
            query: (type) => `/tests?type=${type}`,
            providesTags: ['Test'],
        }),

        getTests: builder.query<Test[], void>({
            query: () => '/tests/admin',
            providesTags: ['Test'],
        }),

        getTestById: builder.query<TestResponseDto, string>({
            query: (id) => `/tests/test/${id}`,
        }),

        getExplanationForTest: builder.query<
            { content: string },
            { id: string; questionOrder: number }
        >({
            query: ({ id, questionOrder }) =>
                `/tests/test/${id}/explanation/${questionOrder}`,
        }),

        submitTestById: builder.mutation<TestResult, SubmitTestDto>({
            query: ({ testId, ...body }) => ({
                url: `/tests/test/${testId}/submission`,
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['Test'],
        }),

        // national test
        createNationalTest: builder.mutation<Test, CreateNationalTestDto>({
            query: (body) => ({
                url: '/tests/admin/national-test',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['Test'],
        }),

        // toeic listening test
        createToeicListeningTest: builder.mutation<
            Test,
            CreateToeicListeningTestDto
        >({
            query: ({ audioUrl, test }) => ({
                url: `/tests/admin/toeic-listening-test?audioUrl=${audioUrl}`,
                method: 'POST',
                body: test,
            }),
            invalidatesTags: ['Test'],
        }),

        uploadAudioTL: builder.mutation<
            UploadAudioToeicResponseDto,
            UploadAudioToeicDto
        >({
            query: ({ formData }) => ({
                url: '/tests/admin/toeic-listening-test/audio',
                method: 'POST',
                body: formData,
            }),
        }),

        uploadImagesTL: builder.mutation<
            UploadImagesToeicResponseDto,
            UploadImagesToeicDto
        >({
            query: ({ testId, formData }) => ({
                url: `/tests/admin/toeic-listening-test/images?testId=${testId}`,
                method: 'POST',
                body: formData,
            }),
        }),

        createPart1TL: builder.mutation<void, CreateToeicPart>({
            query: ({ testId, hasImages: _, ...body }) => ({
                url: `/tests/admin/toeic-listening-test/part-1?testId=${testId}`,
                method: 'POST',
                body: body,
            }),
        }),

        createPart2TL: builder.mutation<void, CreateToeicPart>({
            query: ({ testId, hasImages: _, ...body }) => ({
                url: `/tests/admin/toeic-listening-test/part-2?testId=${testId}`,
                method: 'POST',
                body: body,
            }),
        }),

        createPart3TL: builder.mutation<void, CreateToeicPart>({
            query: ({ testId, hasImages, ...body }) => ({
                url: `/tests/admin/toeic-listening-test/part-3?testId=${testId}&hasImages=${hasImages}`,
                method: 'POST',
                body: body,
            }),
        }),

        createPart4TL: builder.mutation<void, CreateToeicPart>({
            query: ({ testId, hasImages, ...body }) => ({
                url: `/tests/admin/toeic-listening-test/part-4?testId=${testId}&hasImages=${hasImages}`,
                method: 'POST',
                body: body,
            }),
        }),

        // toeic reading test
        createToeicReadingTest: builder.mutation<Test, CreateTestDto>({
            query: (body) => ({
                url: '/tests/admin/toeic-reading-test',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['Test'],
        }),

        uploadImagesTR: builder.mutation<
            UploadImagesToeicResponseDto,
            UploadImagesToeicDto
        >({
            query: ({ testId, formData }) => ({
                url: `/tests/admin/toeic-reading-test/images?testId=${testId}`,
                method: 'POST',
                body: formData,
            }),
        }),

        createPart1TR: builder.mutation<void, CreateToeicPart>({
            query: ({ testId, hasImages: _, ...body }) => ({
                url: `/tests/admin/toeic-reading-test/part-1?testId=${testId}`,
                method: 'POST',
                body: body,
            }),
        }),

        createPart2TR: builder.mutation<void, CreateToeicPart>({
            query: ({ testId, hasImages, ...body }) => ({
                url: `/tests/admin/toeic-reading-test/part-2?testId=${testId}&hasImages=${hasImages}`,
                method: 'POST',
                body: body,
            }),
        }),

        createPart3TR: builder.mutation<void, CreateToeicPart>({
            query: ({ testId, hasImages, ...body }) => ({
                url: `/tests/admin/toeic-reading-test/part-3?testId=${testId}&hasImages=${hasImages}`,
                method: 'POST',
                body: body,
            }),
        }),

        getSubmissionsByTestId: builder.query<Submission[], string>({
            query: (testId) => `/tests/test/${testId}/submission`,
            providesTags: ['Test'],
        }),

        getSubmissionResultById: builder.query<
            SubmissionResult,
            {
                testId: string;
                submissionId: string;
            }
        >({
            query: ({ testId, submissionId }) =>
                `/tests/test/${testId}/submission/${submissionId}`,
        }),

        createPracticeTest: builder.mutation<CreateQuestionDto[], Category>({
            query: (category) => ({
                url: `/tests/practice-test?category=${encodeURIComponent(category)}`,
                method: 'POST',
            }),
            invalidatesTags: ['Test'],
        }),
    }),
});

export const {
    // Test hooks
    useGetTestsAnyoneQuery,
    useGetTestsQuery,
    useGetTestByIdQuery,
    useLazyGetExplanationForTestQuery,
    useSubmitTestByIdMutation,

    // National test hooks
    useCreateNationalTestMutation,

    // Listening test hooks
    useCreateToeicListeningTestMutation,
    useUploadAudioTLMutation,
    useUploadImagesTLMutation,
    useCreatePart1TLMutation,
    useCreatePart2TLMutation,
    useCreatePart3TLMutation,
    useCreatePart4TLMutation,

    // Reading test hooks
    useCreateToeicReadingTestMutation,
    useUploadImagesTRMutation,
    useCreatePart1TRMutation,
    useCreatePart2TRMutation,
    useCreatePart3TRMutation,

    // Submission hooks
    useGetSubmissionsByTestIdQuery,
    useGetSubmissionResultByIdQuery,

    // ai
    useCreatePracticeTestMutation,
} = testApi;
