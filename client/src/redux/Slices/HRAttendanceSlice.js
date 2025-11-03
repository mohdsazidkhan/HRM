import { createSlice } from "@reduxjs/toolkit";
import { HandleCreateHRAttendance, HandleDeleteHRAttendance, HandleGetHRAttendance, HandleUpdateHRAttendance } from "../Thunks/HRAttendanceThunk";

const HRAttendanceSlice = createSlice({
    name: "HRAttendance",
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
        builder.addCase(HandleGetHRAttendance.pending, (state) => {
            state.isLoading = true;
            state.error.content = null;
        });
        builder.addCase(HandleGetHRAttendance.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error.status = false;
            state.data = action.payload.data;
            state.success = action.payload.success;
            state.fetchData = false;
        });
        builder.addCase(HandleGetHRAttendance.rejected, (state, action) => {
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

        builder.addCase(HandleCreateHRAttendance.pending, onWritePending);
        builder.addCase(HandleCreateHRAttendance.fulfilled, onWriteFulfilled);
        builder.addCase(HandleCreateHRAttendance.rejected, onWriteRejected);

        builder.addCase(HandleUpdateHRAttendance.pending, onWritePending);
        builder.addCase(HandleUpdateHRAttendance.fulfilled, onWriteFulfilled);
        builder.addCase(HandleUpdateHRAttendance.rejected, onWriteRejected);

        builder.addCase(HandleDeleteHRAttendance.pending, onWritePending);
        builder.addCase(HandleDeleteHRAttendance.fulfilled, onWriteFulfilled);
        builder.addCase(HandleDeleteHRAttendance.rejected, onWriteRejected);
    },
});

export default HRAttendanceSlice.reducer;


