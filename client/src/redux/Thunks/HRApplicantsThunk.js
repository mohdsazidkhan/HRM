import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService";
import { HRApplicantsPageEndPoints } from "../apis/APIsEndpoints";

export const HandleGetHRApplicants = createAsyncThunk("HandleGetHRApplicants", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get(`${HRApplicantsPageEndPoints.GETALL}`, { withCredentials: true });
        return { ...response.data, type: "AllApplicants" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to fetch applicants" });
    }
});

export const HandleCreateHRApplicant = createAsyncThunk("HandleCreateHRApplicant", async ({ data }, { rejectWithValue }) => {
    try {
        const response = await apiService.post(`${HRApplicantsPageEndPoints.CREATE}`, data, { withCredentials: true });
        return { ...response.data, type: "CreateApplicant" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to create applicant" });
    }
});

export const HandleUpdateHRApplicant = createAsyncThunk("HandleUpdateHRApplicant", async ({ data }, { rejectWithValue }) => {
    try {
        const response = await apiService.patch(`${HRApplicantsPageEndPoints.UPDATE}`, data, { withCredentials: true });
        return { ...response.data, type: "UpdateApplicant" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to update applicant" });
    }
});

export const HandleDeleteHRApplicant = createAsyncThunk("HandleDeleteHRApplicant", async ({ applicantID }, { rejectWithValue }) => {
    try {
        const response = await apiService.delete(`${HRApplicantsPageEndPoints.DELETE(applicantID)}`, { withCredentials: true });
        return { ...response.data, type: "DeleteApplicant" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to delete applicant" });
    }
});


