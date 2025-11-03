import { createSlice } from "@reduxjs/toolkit";
import { HandleCreateHRInterviewInsight, HandleDeleteHRInterviewInsight, HandleGetHRInterviewInsights, HandleUpdateHRInterviewInsight } from "../Thunks/HRInterviewInsightsThunk";

const HRInterviewInsightsSlice = createSlice({
    name: "HRInterviewInsights",
    initialState: {
        data: null,
        isLoading: false,
        success: false,
        fetchData: false,
        error: {
            status: false,
            message: null,
            content: null,
        },
    },
    extraReducers: (builder) => {
        builder.addCase(HandleGetHRInterviewInsights.pending, (state) => {
            state.isLoading = true;
            state.error.content = null;
        });
        builder.addCase(HandleGetHRInterviewInsights.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error.status = false;
            state.data = action.payload.data;
            state.success = action.payload.success;
            state.fetchData = false;
        });
        builder.addCase(HandleGetHRInterviewInsights.rejected, (state, action) => {
            state.isLoading = false;
            state.error.status = true;
            state.error.message = action.payload?.message;
            state.error.content = action.payload;
        });

        const onWritePending = (state) => {
            state.isLoading = true;
            state.error.content = null;
        };
        const onWriteFulfilled = (state, action) => {
            state.isLoading = false;
            state.error.status = false;
            state.success = action.payload.success;
            state.fetchData = true;
        };
        const onWriteRejected = (state, action) => {
            state.isLoading = false;
            state.error.status = true;
            state.error.message = action.payload?.message;
            state.error.content = action.payload;
        };

        builder.addCase(HandleCreateHRInterviewInsight.pending, onWritePending);
        builder.addCase(HandleCreateHRInterviewInsight.fulfilled, onWriteFulfilled);
        builder.addCase(HandleCreateHRInterviewInsight.rejected, onWriteRejected);

        builder.addCase(HandleUpdateHRInterviewInsight.pending, onWritePending);
        builder.addCase(HandleUpdateHRInterviewInsight.fulfilled, onWriteFulfilled);
        builder.addCase(HandleUpdateHRInterviewInsight.rejected, onWriteRejected);

        builder.addCase(HandleDeleteHRInterviewInsight.pending, onWritePending);
        builder.addCase(HandleDeleteHRInterviewInsight.fulfilled, onWriteFulfilled);
        builder.addCase(HandleDeleteHRInterviewInsight.rejected, onWriteRejected);
    },
});

export default HRInterviewInsightsSlice.reducer;


