import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService";
import { HRAttendancePageEndPoints } from "../apis/APIsEndpoints";

export const HandleGetHRAttendance = createAsyncThunk(
    "HandleGetHRAttendance", 
    async (filters = {}, { rejectWithValue }) => {
        try {
            // Build query string from filters
            const queryParams = new URLSearchParams();
            if (filters.employeeID) queryParams.append('employeeID', filters.employeeID);
            if (filters.startDate) queryParams.append('startDate', filters.startDate);
            if (filters.endDate) queryParams.append('endDate', filters.endDate);
            if (filters.status) queryParams.append('status', filters.status);

            const queryString = queryParams.toString();
            const url = queryString 
                ? `${HRAttendancePageEndPoints.GETALL}?${queryString}`
                : HRAttendancePageEndPoints.GETALL;

            const response = await apiService.get(url, { withCredentials: true });
            return { ...response.data, type: "AllAttendance" };
        } catch (error) {
            return rejectWithValue(error.response?.data || { success: false, message: "Failed to fetch attendance" });
        }
    }
);

export const HandleGetHRAttendanceByEmployee = createAsyncThunk(
    "HandleGetHRAttendanceByEmployee",
    async ({ employeeID, startDate, endDate }, { rejectWithValue }) => {
        try {
            const queryParams = new URLSearchParams();
            if (startDate) queryParams.append('startDate', startDate);
            if (endDate) queryParams.append('endDate', endDate);

            const queryString = queryParams.toString();
            const url = queryString
                ? `${HRAttendancePageEndPoints.GET_BY_EMPLOYEE(employeeID)}?${queryString}`
                : HRAttendancePageEndPoints.GET_BY_EMPLOYEE(employeeID);

            const response = await apiService.get(url, { withCredentials: true });
            return { ...response.data, type: "EmployeeAttendance" };
        } catch (error) {
            return rejectWithValue(error.response?.data || { success: false, message: "Failed to fetch employee attendance" });
        }
    }
);

export const HandleDeleteHRAttendance = createAsyncThunk(
    "HandleDeleteHRAttendance", 
    async ({ attendanceID }, { rejectWithValue }) => {
        try {
            const response = await apiService.delete(`${HRAttendancePageEndPoints.DELETE(attendanceID)}`, { withCredentials: true });
            return { ...response.data, type: "DeleteAttendance" };
        } catch (error) {
            return rejectWithValue(error.response?.data || { success: false, message: "Failed to delete attendance" });
        }
    }
);
