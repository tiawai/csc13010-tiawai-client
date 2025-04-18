import { appApi } from '@/services/config.service';
import {
    Payment,
    PaymentVerify,
    PaymentWebhook,
    CreatePayment,
    BankAccount,
    BankAccountDto,
    PayoutDto,
} from '@/types/payment.type';
import { update } from 'lodash';

const paymentApi = appApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getAllPayments: builder.query<Payment[], void>({
            query: () => '/payments',
            providesTags: ['Payment'],
        }),

        getPaymentById: builder.query<Payment, string>({
            query: (id) => `/payments/${id}`,
            providesTags: ['Payment'],
        }),

        createPayment: builder.mutation<Payment, CreatePayment>({
            query: (body) => ({
                url: '/payments',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Payment'],
        }),

        verifyPayment: builder.mutation<Payment, PaymentVerify>({
            query: (body) => ({
                url: '/payments/verify',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Payment'],
        }),

        paymentWebhook: builder.mutation<PaymentWebhook, void>({
            query: (body) => ({
                url: '/payments/webhook',
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
    }),
});

export const {
    useGetAllPaymentsQuery,
    useGetPaymentByIdQuery,
    useCreatePaymentMutation,
    useVerifyPaymentMutation,
    usePaymentWebhookMutation,
    useGetBankAccountQuery,
    useCreateBankAccountMutation,
    useUpdateBankAccountMutation,
    useLazyGetPayoutQuery,
    useProcessPayoutMutation,
    useUpdatePayoutSuccessMutation,
} = paymentApi;
