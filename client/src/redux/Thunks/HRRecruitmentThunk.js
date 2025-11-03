import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService";
import { HRRecruitmentPageEndPoints } from "../apis/APIsEndpoints";

export const HandleGetHRRecruitments = createAsyncThunk("HandleGetHRRecruitments", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get(`${HRRecruitmentPageEndPoints.GETALL}`, { withCredentials: true });
        return { ...response.data, type: "AllRecruitments" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to fetch recruitments" });
    }
});

export const HandleCreateHRRecruitment = createAsyncThunk("HandleCreateHRRecruitment", async ({ data }, { rejectWithValue }) => {
    try {
        const response = await apiService.post(`${HRRecruitmentPageEndPoints.CREATE}`, data, { withCredentials: true });
        return { ...response.data, type: "CreateRecruitment" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to create recruitment" });
    }
});

export const HandleUpdateHRRecruitment = createAsyncThunk("HandleUpdateHRRecruitment", async ({ data }, { rejectWithValue }) => {
    try {
        const response = await apiService.patch(`${HRRecruitmentPageEndPoints.UPDATE}`, data, { withCredentials: true });
        return { ...response.data, type: "UpdateRecruitment" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to update recruitment" });
    }
});

export const HandleDeleteHRRecruitment = createAsyncThunk("HandleDeleteHRRecruitment", async ({ recruitmentID }, { rejectWithValue }) => {
    try {
        const response = await apiService.delete(`${HRRecruitmentPageEndPoints.DELETE(recruitmentID)}`, { withCredentials: true });
        return { ...response.data, type: "DeleteRecruitment" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to delete recruitment" });
    }
});


