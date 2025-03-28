import { appApi } from '@/services/config';
import {
    Payment,
    PaymentVerify,
    PaymentWebhook,
    CreatePayment,
} from '@/types/payment';
import { verify } from 'crypto';

const paymentApi = appApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        createPayment: builder.mutation<Payment, CreatePayment>({
            query: (body) => ({
                url: 'payments',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Payment'],
        }),

        verifyPayment: builder.mutation<Payment, PaymentVerify>({
            query: (body) => ({
                url: 'payments/verify',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Payment'],
        }),

        paymentWebhook: builder.mutation<PaymentWebhook, any>({
            query: (body) => ({
                url: 'payments/webhook',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Payment'],
        }),

        getAllPayments: builder.query<Payment[], void>({
            query: () => '/payment',
            providesTags: ['Auth', 'Payment'],
        }),

        getPaymentById: builder.query<Payment, string>({
            query: (id) => `/payment/${id}`,
            providesTags: ['Auth', 'Payment'],
        }),
    }),
});

export const {
    useCreatePaymentMutation,
    useVerifyPaymentMutation,
    usePaymentWebhookMutation,
    useGetAllPaymentsQuery,
    useGetPaymentByIdQuery,
} = paymentApi;
