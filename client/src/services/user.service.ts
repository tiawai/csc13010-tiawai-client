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
        }),

        getMyProfile: builder.query<User, void>({
            query: () => '/users/user',
            providesTags: ['Auth'],
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
    useGetUsersQuery,
    useGetMyProfileQuery,
    useGetMyStatisticsQuery,
    useGetHistoryExamsQuery,
} = userApi;
