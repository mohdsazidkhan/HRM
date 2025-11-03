import { createSlice } from "@reduxjs/toolkit";
import { HandleCreateHRNotice, HandleDeleteHRNotice, HandleGetHRNotices, HandleUpdateHRNotice } from "../Thunks/HRNoticesThunk";

const HRNoticesSlice = createSlice({
    name: "HRNotices",
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
        builder.addCase(HandleGetHRNotices.pending, (state) => {
            state.isLoading = true;
            state.error.content = null;
        });
        builder.addCase(HandleGetHRNotices.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error.status = false;
            state.data = action.payload.data;
            state.success = action.payload.success;
            state.fetchData = false;
        });
        builder.addCase(HandleGetHRNotices.rejected, (state, action) => {
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

        builder.addCase(HandleCreateHRNotice.pending, onWritePending);
        builder.addCase(HandleCreateHRNotice.fulfilled, onWriteFulfilled);
        builder.addCase(HandleCreateHRNotice.rejected, onWriteRejected);

        builder.addCase(HandleUpdateHRNotice.pending, onWritePending);
        builder.addCase(HandleUpdateHRNotice.fulfilled, onWriteFulfilled);
        builder.addCase(HandleUpdateHRNotice.rejected, onWriteRejected);

        builder.addCase(HandleDeleteHRNotice.pending, onWritePending);
        builder.addCase(HandleDeleteHRNotice.fulfilled, onWriteFulfilled);
        builder.addCase(HandleDeleteHRNotice.rejected, onWriteRejected);
    },
});

export default HRNoticesSlice.reducer;


