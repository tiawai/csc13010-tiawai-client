import { appApi } from '@/services/config';
import { UserHistoryExam } from '@/types/exam';
import { User } from '@/types/user.type';

const userApi = appApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
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
    useGetMyProfileQuery,
    useGetMyStatisticsQuery,
    useGetHistoryExamsQuery,
} = userApi;
