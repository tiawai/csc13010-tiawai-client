import { appApi } from '@/services/config.service';
import {
    Payment,
    PaymentVerify,
    PaymentWebhook,
    CreatePayment,
} from '@/types/payment.type';

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

        getPayout: builder.query<Payment[], void>({
            query: () => '/payments/payout',
            providesTags: ['Payment'],
        }),
    }),
});

export const {
    useGetAllPaymentsQuery,
    useGetPaymentByIdQuery,
    useCreatePaymentMutation,
    useVerifyPaymentMutation,
    usePaymentWebhookMutation,
    useLazyGetPayoutQuery,
    useGetPayoutQuery,
} = paymentApi;
