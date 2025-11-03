import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService";
import { HRAttendancePageEndPoints } from "../apis/APIsEndpoints";

export const HandleGetHRAttendance = createAsyncThunk("HandleGetHRAttendance", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get(`${HRAttendancePageEndPoints.GETALL}`, { withCredentials: true });
        return { ...response.data, type: "AllAttendance" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to fetch attendance" });
    }
});

export const HandleCreateHRAttendance = createAsyncThunk("HandleCreateHRAttendance", async ({ data }, { rejectWithValue }) => {
    try {
        const response = await apiService.post(`${HRAttendancePageEndPoints.CREATE}`, data, { withCredentials: true });
        return { ...response.data, type: "CreateAttendance" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to initialize attendance" });
    }
});

export const HandleUpdateHRAttendance = createAsyncThunk("HandleUpdateHRAttendance", async ({ data }, { rejectWithValue }) => {
    try {
        const response = await apiService.patch(`${HRAttendancePageEndPoints.UPDATE}`, data, { withCredentials: true });
        return { ...response.data, type: "UpdateAttendance" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to update attendance" });
    }
});

export const HandleDeleteHRAttendance = createAsyncThunk("HandleDeleteHRAttendance", async ({ attendanceID }, { rejectWithValue }) => {
    try {
        const response = await apiService.delete(`${HRAttendancePageEndPoints.DELETE(attendanceID)}`, { withCredentials: true });
        return { ...response.data, type: "DeleteAttendance" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to delete attendance" });
    }
});


