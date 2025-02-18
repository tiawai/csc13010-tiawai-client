import { appApi } from '@/services/config';

const practiceApi = appApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        generatePractice: builder.mutation({
            query: (params) => ({
                url: `/practice?category=${params}`,
                method: 'POST',
            }),
            invalidatesTags: ['Exam'],
        }),
    }),
});

export const { useGeneratePracticeMutation } = practiceApi;
