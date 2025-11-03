import { createSlice } from "@reduxjs/toolkit";
import { HandleCreateHRRecruitment, HandleDeleteHRRecruitment, HandleGetHRRecruitments, HandleUpdateHRRecruitment } from "../Thunks/HRRecruitmentThunk";

const HRRecruitmentSlice = createSlice({
    name: "HRRecruitment",
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
        builder.addCase(HandleGetHRRecruitments.pending, (state) => {
            state.isLoading = true;
            state.error.content = null;
        });
        builder.addCase(HandleGetHRRecruitments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error.status = false;
            state.data = action.payload.data;
            state.success = action.payload.success;
            state.fetchData = false;
        });
        builder.addCase(HandleGetHRRecruitments.rejected, (state, action) => {
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

        builder.addCase(HandleCreateHRRecruitment.pending, onWritePending);
        builder.addCase(HandleCreateHRRecruitment.fulfilled, onWriteFulfilled);
        builder.addCase(HandleCreateHRRecruitment.rejected, onWriteRejected);

        builder.addCase(HandleUpdateHRRecruitment.pending, onWritePending);
        builder.addCase(HandleUpdateHRRecruitment.fulfilled, onWriteFulfilled);
        builder.addCase(HandleUpdateHRRecruitment.rejected, onWriteRejected);

        builder.addCase(HandleDeleteHRRecruitment.pending, onWritePending);
        builder.addCase(HandleDeleteHRRecruitment.fulfilled, onWriteFulfilled);
        builder.addCase(HandleDeleteHRRecruitment.rejected, onWriteRejected);
    },
});

export default HRRecruitmentSlice.reducer;


