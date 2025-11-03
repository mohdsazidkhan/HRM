import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService";
import { HRBalancePageEndPoints } from "../apis/APIsEndpoints";

export const HandleGetHRBalance = createAsyncThunk("HandleGetHRBalance", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get(`${HRBalancePageEndPoints.GETALL}`, { withCredentials: true });
        return { ...response.data, type: "AllBalance" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to fetch balances" });
    }
});

export const HandleCreateHRBalance = createAsyncThunk("HandleCreateHRBalance", async ({ data }, { rejectWithValue }) => {
    try {
        const response = await apiService.post(`${HRBalancePageEndPoints.CREATE}`, data, { withCredentials: true });
        return { ...response.data, type: "CreateBalance" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to create balance" });
    }
});

export const HandleUpdateHRBalance = createAsyncThunk("HandleUpdateHRBalance", async ({ data }, { rejectWithValue }) => {
    try {
        const response = await apiService.patch(`${HRBalancePageEndPoints.UPDATE}`, data, { withCredentials: true });
        return { ...response.data, type: "UpdateBalance" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to update balance" });
    }
});

export const HandleDeleteHRBalance = createAsyncThunk("HandleDeleteHRBalance", async ({ balanceID }, { rejectWithValue }) => {
    try {
        const response = await apiService.delete(`${HRBalancePageEndPoints.DELETE(balanceID)}`, { withCredentials: true });
        return { ...response.data, type: "DeleteBalance" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to delete balance" });
    }
});


