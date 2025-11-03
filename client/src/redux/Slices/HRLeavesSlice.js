import { createSlice } from "@reduxjs/toolkit";
import { HandleCreateHRLeave, HandleDeleteHRLeave, HandleGetHRLeaves, HandleUpdateHRLeaveByEmployee, HandleUpdateHRLeaveByHR } from "../Thunks/HRLeavesThunk";

const HRLeavesSlice = createSlice({
    name: "HRLeaves",
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
        builder.addCase(HandleGetHRLeaves.pending, (state) => {
            state.isLoading = true;
            state.error.content = null;
        });
        builder.addCase(HandleGetHRLeaves.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error.status = false;
            state.data = action.payload.data;
            state.success = action.payload.success;
            state.fetchData = false;
        });
        builder.addCase(HandleGetHRLeaves.rejected, (state, action) => {
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

        builder.addCase(HandleCreateHRLeave.pending, onWritePending);
        builder.addCase(HandleCreateHRLeave.fulfilled, onWriteFulfilled);
        builder.addCase(HandleCreateHRLeave.rejected, onWriteRejected);

        builder.addCase(HandleUpdateHRLeaveByEmployee.pending, onWritePending);
        builder.addCase(HandleUpdateHRLeaveByEmployee.fulfilled, onWriteFulfilled);
        builder.addCase(HandleUpdateHRLeaveByEmployee.rejected, onWriteRejected);

        builder.addCase(HandleUpdateHRLeaveByHR.pending, onWritePending);
        builder.addCase(HandleUpdateHRLeaveByHR.fulfilled, onWriteFulfilled);
        builder.addCase(HandleUpdateHRLeaveByHR.rejected, onWriteRejected);

        builder.addCase(HandleDeleteHRLeave.pending, onWritePending);
        builder.addCase(HandleDeleteHRLeave.fulfilled, onWriteFulfilled);
        builder.addCase(HandleDeleteHRLeave.rejected, onWriteRejected);
    },
});

export default HRLeavesSlice.reducer;


