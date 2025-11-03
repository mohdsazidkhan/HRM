import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService";
import { HRDesignationPageEndPoints } from "../apis/APIsEndpoints";

export const HandleGetHRDesignations = createAsyncThunk('HandleGetHRDesignations', async (payload, { rejectWithValue }) => {
    try {
        const { apiroute } = payload || { apiroute: 'GETALL' }
        const response = await apiService.get(`${HRDesignationPageEndPoints[apiroute]}`, { withCredentials: true })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' })
    }
});

export const HandlePostHRDesignations = createAsyncThunk('HandlePostHRDesignations', async (payload, { rejectWithValue }) => {
    try {
        const { apiroute, data } = payload
        const response = await apiService.post(`${HRDesignationPageEndPoints[apiroute]}`, data, { withCredentials: true })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' })
    }
});

export const HandlePatchHRDesignations = createAsyncThunk('HandlePatchHRDesignations', async (payload, { rejectWithValue }) => {
    try {
        const { apiroute, data } = payload
        const response = await apiService.patch(`${HRDesignationPageEndPoints[apiroute]}`, data, { withCredentials: true })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' })
    }
});

export const HandleDeleteHRDesignations = createAsyncThunk('HandleDeleteHRDesignations', async (payload, { rejectWithValue }) => {
    try {
        const { apiroute, data } = payload
        const response = await apiService.delete(`${HRDesignationPageEndPoints[apiroute]}`, { data, withCredentials: true })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' })
    }
});


