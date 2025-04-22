'use client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/lib/store/store';

const ignoreEndpoints = [
    'uploadAudioTL',
    'uploadImagesTL',
    'uploadImagesTR',
    'createClassroom',
    'updateClassroom',
    'createLesson',
    'updateLesson',
    'uploadProfileImage',
];

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState, endpoint }) => {
        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`);
        }
        if (endpoint && !ignoreEndpoints.includes(endpoint)) {
            headers.set('Content-Type', 'application/json');
        }
        return headers;
    },
});

export const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: baseQuery,
    endpoints: () => ({}),
    tagTypes: [
        'Auth',
        'User',
        'Student',
        'Teacher',

        'Exam',
        'Test',
        'Submission',
        'Classroom',
        'Lesson',

        'History',
        'Chat',
        'Flashcard',
        'Payment',
        'Report',
    ],
});
