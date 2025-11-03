import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService";
import { HRProfilesPageEndPoints } from "../apis/APIsEndpoints";

export const HandleGetHRProfiles = createAsyncThunk("HandleGetHRProfiles", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get(`${HRProfilesPageEndPoints.GETALL}`, { withCredentials: true });
        return { ...response.data, type: "AllHRProfiles" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to fetch HR profiles" });
    }
});

export const HandleUpdateHRProfile = createAsyncThunk("HandleUpdateHRProfile", async ({ data }, { rejectWithValue }) => {
    try {
        const response = await apiService.patch(`${HRProfilesPageEndPoints.UPDATE}`, data, { withCredentials: true });
        return { ...response.data, type: "UpdateHRProfile" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to update HR profile" });
    }
});

export const HandleDeleteHRProfile = createAsyncThunk("HandleDeleteHRProfile", async ({ HRID }, { rejectWithValue }) => {
    try {
        const response = await apiService.delete(`${HRProfilesPageEndPoints.DELETE(HRID)}`, { withCredentials: true });
        return { ...response.data, type: "DeleteHRProfile" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to delete HR profile" });
    }
});


