import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService";
import { HRLeavesPageEndPoints } from "../apis/APIsEndpoints";

export const HandleGetHRLeaves = createAsyncThunk("HandleGetHRLeaves", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get(`${HRLeavesPageEndPoints.GETALL}`, { withCredentials: true });
        return { ...response.data, type: "AllLeaves" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to fetch leaves" });
    }
});

export const HandleCreateHRLeave = createAsyncThunk("HandleCreateHRLeave", async ({ data }, { rejectWithValue }) => {
    try {
        const response = await apiService.post(`${HRLeavesPageEndPoints.CREATE}`, data, { withCredentials: true });
        return { ...response.data, type: "CreateLeave" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to create leave" });
    }
});

export const HandleUpdateHRLeaveByEmployee = createAsyncThunk("HandleUpdateHRLeaveByEmployee", async ({ data }, { rejectWithValue }) => {
    try {
        const response = await apiService.patch(`${HRLeavesPageEndPoints.UPDATE_BY_EMPLOYEE}`, data, { withCredentials: true });
        return { ...response.data, type: "UpdateLeaveEmployee" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to update leave" });
    }
});

export const HandleUpdateHRLeaveByHR = createAsyncThunk("HandleUpdateHRLeaveByHR", async ({ data }, { rejectWithValue }) => {
    try {
        const response = await apiService.patch(`${HRLeavesPageEndPoints.UPDATE_BY_HR}`, data, { withCredentials: true });
        return { ...response.data, type: "UpdateLeaveHR" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to update leave" });
    }
});

export const HandleDeleteHRLeave = createAsyncThunk("HandleDeleteHRLeave", async ({ leaveID }, { rejectWithValue }) => {
    try {
        const response = await apiService.delete(`${HRLeavesPageEndPoints.DELETE(leaveID)}`, { withCredentials: true });
        return { ...response.data, type: "DeleteLeave" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to delete leave" });
    }
});


