import { appApi } from '@/services/config.service';
import {
    Payment,
    PaymentVerify,
    BankAccount,
    BankAccountDto,
    PayoutDto,
} from '@/types/payment.type';

const paymentApi = appApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getAllPayments: builder.query<Payment[], void>({
            query: () => '/payments',
            providesTags: ['Payment'],
        }),

        getStudentPayments: builder.query<Payment[], void>({
            query: () => '/payments/student',
            providesTags: ['Payment'],
        }),

        getTeacherPayments: builder.query<Payment[], void>({
            query: () => '/payments/teacher',
            providesTags: ['Payment'],
        }),

        getPaymentById: builder.query<Payment, string>({
            query: (id) => `/payments/${id}`,
            providesTags: ['Payment'],
        }),

        createPaymentClassroom: builder.mutation<Payment, string>({
            query: (classroomId) => ({
                url: `/payments/classroom/${classroomId}`,
                method: 'POST',
            }),
            invalidatesTags: ['Payment'],
        }),

        createPaymentAI: builder.mutation<Payment, void>({
            query: () => ({
                url: `/payments/ai`,
                method: 'POST',
            }),
            invalidatesTags: ['Payment'],
        }),

        canUseAil: builder.query<boolean, void>({
            query: () => ({
                url: '/payments/ai/checkout',
                method: 'GET',
            }),
            providesTags: ['Payment'],
        }),

        deletePaymentAI: builder.mutation<Payment, void>({
            query: () => ({
                url: '/payments/ai',
                method: 'DELETE',
            }),
        }),

        verifyPayment: builder.mutation<Payment, PaymentVerify>({
            query: (body) => ({
                url: '/payments/verify',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Payment'],
        }),

        getPayout: builder.query<PayoutDto, void>({
            query: () => '/payments/payout',
            providesTags: ['Payment'],
        }),

        processPayout: builder.mutation<void, { payments: string[] }>({
            query: (body) => ({
                url: '/payments/payout/process',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Payment'],
        }),

        updatePayoutSuccess: builder.mutation<void, void>({
            query: (body) => ({
                url: '/payments/payout/success',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Payment'],
        }),

        getBankAccount: builder.query<BankAccount, void>({
            query: () => `/payments/accounts`,
            providesTags: ['Payment'],
        }),

        createBankAccount: builder.mutation<BankAccount, BankAccountDto>({
            query: (body) => ({
                url: '/payments/accounts',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Payment'],
        }),

        updateBankAccount: builder.mutation<BankAccount, BankAccountDto>({
            query: (body) => ({
                url: '/payments/accounts',
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Payment'],
        }),
    }),
});

export const {
    useGetAllPaymentsQuery,
    useGetStudentPaymentsQuery,
    useGetTeacherPaymentsQuery,
    useGetPaymentByIdQuery,

    useCreatePaymentClassroomMutation,
    useCreatePaymentAIMutation,
    useCanUseAilQuery,
    useDeletePaymentAIMutation,
    useVerifyPaymentMutation,

    useGetPayoutQuery,
    useLazyGetPayoutQuery,
    useProcessPayoutMutation,
    useUpdatePayoutSuccessMutation,

    useGetBankAccountQuery,
    useCreateBankAccountMutation,
    useUpdateBankAccountMutation,
} = paymentApi;
