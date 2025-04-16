import { appApi } from '@/services/config.service';
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
} from '@/types/test.type';

const testApi = appApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getTests: builder.query<Test[], void>({
            query: () => '/tests/admin',
            providesTags: ['Test'],
        }),

        getTestById: builder.query<TestResponseDto, string>({
            query: (id) => `/tests/test/${id}`,
        }),

        submitTestById: builder.mutation<void, SubmitTestDto>({
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
    }),
});

export const {
    useGetTestsQuery,
    useGetTestByIdQuery,
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
} = testApi;
