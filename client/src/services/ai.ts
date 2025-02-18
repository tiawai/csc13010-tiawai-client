import { appApi } from "@/services/config";

const aiApi = appApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        paraphrase: builder.mutation({
            query: (inputs) => ({
                url: "/paraphrase",
                method: "POST",
                body: {
                    inputs,
                },
            }),
        }),
    }),
});

export const { useParaphraseMutation } = aiApi;
