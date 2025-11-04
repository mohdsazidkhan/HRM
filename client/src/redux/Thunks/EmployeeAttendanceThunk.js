import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService";
import { EmployeeAttendanceEndPoints } from "../apis/APIsEndpoints";

export const HandleCheckIn = createAsyncThunk(
    "HandleCheckIn",
    async ({ location, device }, { rejectWithValue }) => {
        try {
            const response = await apiService.post(
                EmployeeAttendanceEndPoints.CHECK_IN,
                { location, device },
                { withCredentials: true }
            );
            return { ...response.data, type: "CheckIn" };
        } catch (error) {
            return rejectWithValue(error.response?.data || { success: false, message: "Failed to check in" });
        }
    }
);

export const HandleCheckOut = createAsyncThunk(
    "HandleCheckOut",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiService.post(
                EmployeeAttendanceEndPoints.CHECK_OUT,
                {},
                { withCredentials: true }
            );
            return { ...response.data, type: "CheckOut" };
        } catch (error) {
            return rejectWithValue(error.response?.data || { success: false, message: "Failed to check out" });
        }
    }
);

export const HandleGetTodayAttendance = createAsyncThunk(
    "HandleGetTodayAttendance",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiService.get(EmployeeAttendanceEndPoints.GET_TODAY, { withCredentials: true });
            return { ...response.data, type: "TodayAttendance" };
        } catch (error) {
            return rejectWithValue(error.response?.data || { success: false, message: "Failed to fetch today's attendance" });
        }
    }
);

export const HandleGetMyAttendance = createAsyncThunk(
    "HandleGetMyAttendance",
    async ({ startDate, endDate }, { rejectWithValue }) => {
        try {
            const queryParams = new URLSearchParams();
            if (startDate) queryParams.append('startDate', startDate);
            if (endDate) queryParams.append('endDate', endDate);

            const queryString = queryParams.toString();
            const url = queryString
                ? `${EmployeeAttendanceEndPoints.GET_MY_ATTENDANCE}?${queryString}`
                : EmployeeAttendanceEndPoints.GET_MY_ATTENDANCE;

            const response = await apiService.get(url, { withCredentials: true });
            return { ...response.data, type: "MyAttendance" };
        } catch (error) {
            return rejectWithValue(error.response?.data || { success: false, message: "Failed to fetch attendance" });
        }
    }
);

