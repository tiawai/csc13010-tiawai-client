import { appApi } from '@/services/config.service';
import { UserHistoryExam } from '@/types/exam';
import { Role, User } from '@/types/user.type';

const userApi = appApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getUsers: builder.query<User[], Role>({
            query: (role) => ({
                url: `/users?role=${role}`,
                method: 'GET',
            }),
            providesTags: ['User'],
        }),

        getMyProfile: builder.query<User, void>({
            query: () => ({
                url: '/users/user',
                method: 'GET',
            }),
            providesTags: ['User'],
        }),

        updateUserProfile: builder.mutation<
            { message: string; user: User },
            Partial<User>
        >({
            query: (body) => ({
                url: '/users/user',
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['User'],
        }),

        uploadProfileImage: builder.mutation<User, FormData>({
            query: (formData) => ({
                url: '/users/user/image',
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['User'],
        }),

        getMyStatistics: builder.query({
            query: () => ({
                url: '/user/exam',
                method: 'GET',
            }),
        }),

        getHistoryExams: builder.query<UserHistoryExam[], void>({
            query: () => ({
                url: '/user/history/exams',
                method: 'GET',
            }),
            providesTags: ['History'],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetMyProfileQuery,
    useGetMyStatisticsQuery,
    useGetHistoryExamsQuery,
    useUpdateUserProfileMutation,
    useUploadProfileImageMutation,
} = userApi;
