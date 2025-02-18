"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/lib/store/store";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        if (accessToken) {
            headers.set("Authorization", `Bearer ${accessToken}`);
        }
        headers.set("Content-Type", "application/json");
        return headers;
    },
});

export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: baseQuery,
    endpoints: () => ({}),
    tagTypes: ["Auth", "Exam", "History", "Chat", "Flashcard"],
});
