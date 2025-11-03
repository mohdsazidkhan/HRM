import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService";
import { HRNoticePageEndPoints } from "../apis/APIsEndpoints";

export const HandleGetHRNotices = createAsyncThunk("HandleGetHRNotices", async (payload, { rejectWithValue }) => {
    try {
        const response = await apiService.get(`${HRNoticePageEndPoints.GETALL}`, { withCredentials: true });
        return { ...response.data, type: "AllNotices" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to fetch notices" });
    }
});

export const HandleCreateHRNotice = createAsyncThunk("HandleCreateHRNotice", async ({ data }, { rejectWithValue }) => {
    try {
        const response = await apiService.post(`${HRNoticePageEndPoints.CREATE}`, data, { withCredentials: true });
        return { ...response.data, type: "CreateNotice" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to create notice" });
    }
});

export const HandleUpdateHRNotice = createAsyncThunk("HandleUpdateHRNotice", async ({ data }, { rejectWithValue }) => {
    try {
        const response = await apiService.patch(`${HRNoticePageEndPoints.UPDATE}`, data, { withCredentials: true });
        return { ...response.data, type: "UpdateNotice" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to update notice" });
    }
});

export const HandleDeleteHRNotice = createAsyncThunk("HandleDeleteHRNotice", async ({ noticeID }, { rejectWithValue }) => {
    try {
        const response = await apiService.delete(`${HRNoticePageEndPoints.DELETE(noticeID)}`, { withCredentials: true });
        return { ...response.data, type: "DeleteNotice" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to delete notice" });
    }
});


