'use client';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Test } from '@/types/test.type';

export interface TestState {
    test?: Test;
    loading: boolean;
    error?: string;
}

const initialState: TestState = {
    test: undefined,
    loading: false,
    error: undefined,
};

export const fetchTestById = createAsyncThunk<Test, string>(
    'test/fetchTestById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/tests/${id}`);
            if (!response.ok) throw new Error('Lỗi khi lấy dữ liệu đề thi!');
            return await response.json();
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        resetTest: (state) => {
            state.test = undefined;
            state.loading = false;
            state.error = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTestById.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(
                fetchTestById.fulfilled,
                (state, action: PayloadAction<Test>) => {
                    state.loading = false;
                    state.test = action.payload;
                },
            )
            .addCase(fetchTestById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetTest } = testSlice.actions;
export default testSlice.reducer;
