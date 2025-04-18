import { appApi } from '@/services/config.service';
import { Report, CreateReport, UpadateReportStatus } from '@/types/report.type';

const reportApi = appApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getAllReports: builder.query<Report[], void>({
            query: () => '/reports',
            providesTags: ['Report'],
        }),

        createReport: builder.mutation<Report, CreateReport>({
            query: (body) => ({
                url: '/reports',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Report'],
        }),

        deleteReport: builder.mutation<void, string>({
            query: (id) => ({
                url: `/reports/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Report'],
        }),

        updateReportStatus: builder.mutation<Report, UpadateReportStatus>({
            query: ({ id, status }) => ({
                url: `/reports/status/${id}`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['Report'],
        }),
    }),
});

export const {
    useGetAllReportsQuery,
    useCreateReportMutation,
    useDeleteReportMutation,
    useUpdateReportStatusMutation,
} = reportApi;
