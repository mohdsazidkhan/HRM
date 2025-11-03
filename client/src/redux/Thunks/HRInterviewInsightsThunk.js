import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService";
import { HRInterviewInsightsPageEndPoints } from "../apis/APIsEndpoints";

export const HandleGetHRInterviewInsights = createAsyncThunk("HandleGetHRInterviewInsights", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get(`${HRInterviewInsightsPageEndPoints.GETALL}`, { withCredentials: true });
        return { ...response.data, type: "AllInterviewInsights" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to fetch interview insights" });
    }
});

export const HandleCreateHRInterviewInsight = createAsyncThunk("HandleCreateHRInterviewInsight", async ({ data }, { rejectWithValue }) => {
    try {
        const response = await apiService.post(`${HRInterviewInsightsPageEndPoints.CREATE}`, data, { withCredentials: true });
        return { ...response.data, type: "CreateInterviewInsight" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to create interview insight" });
    }
});

export const HandleUpdateHRInterviewInsight = createAsyncThunk("HandleUpdateHRInterviewInsight", async ({ data }, { rejectWithValue }) => {
    try {
        const response = await apiService.patch(`${HRInterviewInsightsPageEndPoints.UPDATE}`, data, { withCredentials: true });
        return { ...response.data, type: "UpdateInterviewInsight" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to update interview insight" });
    }
});

export const HandleDeleteHRInterviewInsight = createAsyncThunk("HandleDeleteHRInterviewInsight", async ({ interviewID }, { rejectWithValue }) => {
    try {
        const response = await apiService.delete(`${HRInterviewInsightsPageEndPoints.DELETE(interviewID)}`, { withCredentials: true });
        return { ...response.data, type: "DeleteInterviewInsight" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to delete interview insight" });
    }
});


