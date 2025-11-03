import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService";
import { HRRequestsPageEndPoints } from "../apis/APIsEndpoints";

export const HandleGetHRRequests = createAsyncThunk("HandleGetHRRequests", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get(`${HRRequestsPageEndPoints.GETALL}`, { withCredentials: true });
        return { ...response.data, type: "AllRequests" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to fetch requests" });
    }
});

export const HandleCreateHRRequest = createAsyncThunk("HandleCreateHRRequest", async ({ data }, { rejectWithValue }) => {
    try {
        const response = await apiService.post(`${HRRequestsPageEndPoints.CREATE}`, data, { withCredentials: true });
        return { ...response.data, type: "CreateRequest" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to create request" });
    }
});

export const HandleUpdateHRRequestContent = createAsyncThunk("HandleUpdateHRRequestContent", async ({ data }, { rejectWithValue }) => {
    try {
        const response = await apiService.patch(`${HRRequestsPageEndPoints.UPDATE_CONTENT}`, data, { withCredentials: true });
        return { ...response.data, type: "UpdateRequestContent" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to update request" });
    }
});

export const HandleUpdateHRRequestStatus = createAsyncThunk("HandleUpdateHRRequestStatus", async ({ data }, { rejectWithValue }) => {
    try {
        const response = await apiService.patch(`${HRRequestsPageEndPoints.UPDATE_STATUS}`, data, { withCredentials: true });
        return { ...response.data, type: "UpdateRequestStatus" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to update status" });
    }
});

export const HandleDeleteHRRequest = createAsyncThunk("HandleDeleteHRRequest", async ({ requestID }, { rejectWithValue }) => {
    try {
        const response = await apiService.delete(`${HRRequestsPageEndPoints.DELETE(requestID)}`, { withCredentials: true });
        return { ...response.data, type: "DeleteRequest" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to delete request" });
    }
});


