import { createSlice } from "@reduxjs/toolkit";
import {
    HandleCheckIn,
    HandleCheckOut,
    HandleGetTodayAttendance,
    HandleGetMyAttendance
} from "../Thunks/EmployeeAttendanceThunk";

const EmployeeAttendanceSlice = createSlice({
    name: "EmployeeAttendance",
    initialState: {
        todayData: null,
        myAttendanceData: null,
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
        // Get Today Attendance
        builder.addCase(HandleGetTodayAttendance.pending, (state) => {
            state.isLoading = true;
            state.error.content = null;
        });
        builder.addCase(HandleGetTodayAttendance.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error.status = false;
            state.todayData = action.payload.data;
            state.success = action.payload.success;
            state.fetchData = false;
        });
        builder.addCase(HandleGetTodayAttendance.rejected, (state, action) => {
            state.isLoading = false;
            state.error.status = true;
            state.error.message = action.payload?.message;
            state.error.content = action.payload;
        });

        // Get My Attendance
        builder.addCase(HandleGetMyAttendance.pending, (state) => {
            state.isLoading = true;
            state.error.content = null;
        });
        builder.addCase(HandleGetMyAttendance.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error.status = false;
            state.myAttendanceData = action.payload.data;
            state.success = action.payload.success;
            state.fetchData = false;
        });
        builder.addCase(HandleGetMyAttendance.rejected, (state, action) => {
            state.isLoading = false;
            state.error.status = true;
            state.error.message = action.payload?.message;
            state.error.content = action.payload;
        });

        // Check In/Out
        const onWritePending = (state) => {
            state.isLoading = true;
            state.error.content = null;
        };
        const onWriteFulfilled = (state, action) => {
            state.isLoading = false;
            state.error.status = false;
            state.success = action.payload.success;
            state.todayData = action.payload.data;
            state.fetchData = true;
        };
        const onWriteRejected = (state, action) => {
            state.isLoading = false;
            state.error.status = true;
            state.error.message = action.payload?.message;
            state.error.content = action.payload;
        };

        builder.addCase(HandleCheckIn.pending, onWritePending);
        builder.addCase(HandleCheckIn.fulfilled, onWriteFulfilled);
        builder.addCase(HandleCheckIn.rejected, onWriteRejected);

        builder.addCase(HandleCheckOut.pending, onWritePending);
        builder.addCase(HandleCheckOut.fulfilled, onWriteFulfilled);
        builder.addCase(HandleCheckOut.rejected, onWriteRejected);
    },
});

export default EmployeeAttendanceSlice.reducer;

