import { appApi } from '@/services/config.service';

const flashcardApi = appApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        createFlashcard: builder.mutation({
            query: (body) => ({
                url: '/flashcards',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Flashcard'],
        }),

        getAllFlashcardTopics: builder.query({
            query: () => '/flashcards',
            providesTags: ['Auth', 'Flashcard'],
        }),

        getFlashcardById: builder.query({
            query: (id) => `/flashcards/${id}`,
            providesTags: ['Auth', 'Flashcard'],
        }),

        generateFlashcard: builder.mutation({
            query: (body) => ({
                url: '/flashcards/extract',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Flashcard'],
        }),

        updateFlashcard: builder.mutation({
            query: ({ id, body }) => ({
                url: `/flashcards/${id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['Flashcard'],
        }),

        deleteFlashcard: builder.mutation({
            query: (id) => ({
                url: `/flashcards/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Flashcard'],
        }),
    }),
});

export const {
    useCreateFlashcardMutation,
    useGetAllFlashcardTopicsQuery,
    useGetFlashcardByIdQuery,
    useGenerateFlashcardMutation,
    useUpdateFlashcardMutation,
    useDeleteFlashcardMutation,
} = flashcardApi;
