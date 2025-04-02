'use client';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Exam } from '@/types/exam';

export interface ExamState {
    exam?: Exam;
    loading: boolean;
    error?: string;
}

const initialState: ExamState = {
    exam: undefined,
    loading: false,
    error: undefined,
};

export const fetchExamById = createAsyncThunk<Exam, number>(
    'exam/fetchExamById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/exams/${id}`);
            if (!response.ok) throw new Error('Lỗi khi lấy dữ liệu đề thi!');
            return await response.json();
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

const examSlice = createSlice({
    name: 'exam',
    initialState,
    reducers: {
        resetExam: (state) => {
            state.exam = undefined;
            state.loading = false;
            state.error = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchExamById.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(
                fetchExamById.fulfilled,
                (state, action: PayloadAction<Exam>) => {
                    state.loading = false;
                    state.exam = action.payload;
                },
            )
            .addCase(fetchExamById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetExam } = examSlice.actions;
export default examSlice.reducer;
