import { appApi } from '@/services/config.service';
import { UserHistoryExam } from '@/types/exam';
import { Role, User, UserStatistics } from '@/types/user.type';

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

        getUserStatistics: builder.query<UserStatistics, void>({
            query: () => '/users/user/statistics',
            providesTags: ['Submission'],
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
    useGetUserStatisticsQuery,
    useGetHistoryExamsQuery,
    useUpdateUserProfileMutation,
    useUploadProfileImageMutation,
} = userApi;
