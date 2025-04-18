import { appApi } from '@/services/config.service';
import { UserHistoryExam } from '@/types/exam';
import { User } from '@/types/user.type';

const userApi = appApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getMyProfile: builder.query<User, void>({
            query: () => ({
                url: '/users/user',
                method: 'GET',
            }),
            providesTags: ['Auth'],
        }),
        updateUserProfile: builder.mutation<User, Partial<User>>({
            query: (body) => ({
                url: '/users/user',
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['Auth'],
        }),
        uploadProfileImage: builder.mutation<User, FormData>({
            query: (formData) => ({
                url: '/users/user/image',
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Auth'],
        }),
        getMyStatistics: builder.query({
            query: () => ({
                url: '/user/exam',
                method: 'GET',
            }),
            providesTags: ['Auth'],
        }),
        getHistoryExams: builder.query<UserHistoryExam[], void>({
            query: () => ({
                url: '/user/history/exams',
                method: 'GET',
            }),
            providesTags: ['Auth', 'History'],
        }),
    }),
});

export const {
    useGetMyProfileQuery,
    useGetMyStatisticsQuery,
    useGetHistoryExamsQuery,
    useUpdateUserProfileMutation,
    useUploadProfileImageMutation,
} = userApi;
