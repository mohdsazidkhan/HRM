import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService";
import { HRSalaryPageEndPoints } from "../apis/APIsEndpoints";

export const HandleGetHRSalary = createAsyncThunk("HandleGetHRSalary", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get(`${HRSalaryPageEndPoints.GETALL}`, { withCredentials: true });
        return { ...response.data, type: "AllSalary" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to fetch salaries" });
    }
});

export const HandleCreateHRSalary = createAsyncThunk("HandleCreateHRSalary", async ({ data }, { rejectWithValue }) => {
    try {
        const response = await apiService.post(`${HRSalaryPageEndPoints.CREATE}`, data, { withCredentials: true });
        return { ...response.data, type: "CreateSalary" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to create salary" });
    }
});

export const HandleUpdateHRSalary = createAsyncThunk("HandleUpdateHRSalary", async ({ data }, { rejectWithValue }) => {
    try {
        const response = await apiService.patch(`${HRSalaryPageEndPoints.UPDATE}`, data, { withCredentials: true });
        return { ...response.data, type: "UpdateSalary" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to update salary" });
    }
});

export const HandleDeleteHRSalary = createAsyncThunk("HandleDeleteHRSalary", async ({ salaryID }, { rejectWithValue }) => {
    try {
        const response = await apiService.delete(`${HRSalaryPageEndPoints.DELETE(salaryID)}`, { withCredentials: true });
        return { ...response.data, type: "DeleteSalary" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to delete salary" });
    }
});


