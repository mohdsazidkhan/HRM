import { createSlice } from "@reduxjs/toolkit";
import { HandleCreateHRRequest, HandleDeleteHRRequest, HandleGetHRRequests, HandleUpdateHRRequestContent, HandleUpdateHRRequestStatus } from "../Thunks/HRRequestsThunk";

const HRRequestsSlice = createSlice({
    name: "HRRequests",
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
        builder.addCase(HandleGetHRRequests.pending, (state) => {
            state.isLoading = true;
            state.error.content = null;
        });
        builder.addCase(HandleGetHRRequests.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error.status = false;
            state.data = action.payload.data;
            state.success = action.payload.success;
            state.fetchData = false;
        });
        builder.addCase(HandleGetHRRequests.rejected, (state, action) => {
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

        builder.addCase(HandleCreateHRRequest.pending, onWritePending);
        builder.addCase(HandleCreateHRRequest.fulfilled, onWriteFulfilled);
        builder.addCase(HandleCreateHRRequest.rejected, onWriteRejected);

        builder.addCase(HandleUpdateHRRequestContent.pending, onWritePending);
        builder.addCase(HandleUpdateHRRequestContent.fulfilled, onWriteFulfilled);
        builder.addCase(HandleUpdateHRRequestContent.rejected, onWriteRejected);

        builder.addCase(HandleUpdateHRRequestStatus.pending, onWritePending);
        builder.addCase(HandleUpdateHRRequestStatus.fulfilled, onWriteFulfilled);
        builder.addCase(HandleUpdateHRRequestStatus.rejected, onWriteRejected);

        builder.addCase(HandleDeleteHRRequest.pending, onWritePending);
        builder.addCase(HandleDeleteHRRequest.fulfilled, onWriteFulfilled);
        builder.addCase(HandleDeleteHRRequest.rejected, onWriteRejected);
    },
});

export default HRRequestsSlice.reducer;


