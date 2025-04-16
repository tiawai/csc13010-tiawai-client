import { appApi } from '@/services/config.service';

const flashcardApi = appApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        createFlashcard: builder.mutation({
            query: (body) => ({
                url: '/flashcard',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Flashcard'],
        }),

        getAllFlashcardTopics: builder.query({
            query: () => '/flashcard',
            providesTags: ['Auth', 'Flashcard'],
        }),

        getFlashcardsByTopic: builder.query({
            query: (topic) => `/flashcard/${topic}`,
            providesTags: ['Auth', 'Flashcard'],
        }),
    }),
});

export const {
    useCreateFlashcardMutation,
    useGetAllFlashcardTopicsQuery,
    useGetFlashcardsByTopicQuery,
} = flashcardApi;
