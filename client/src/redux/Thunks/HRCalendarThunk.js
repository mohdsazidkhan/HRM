import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService";
import { HRCalendarPageEndPoints } from "../apis/APIsEndpoints";

export const HandleGetHRCalendar = createAsyncThunk("HandleGetHRCalendar", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get(`${HRCalendarPageEndPoints.GETALL}`, { withCredentials: true });
        return { ...response.data, type: "AllCalendar" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to fetch events" });
    }
});

export const HandleCreateHREvent = createAsyncThunk("HandleCreateHREvent", async ({ data }, { rejectWithValue }) => {
    try {
        const response = await apiService.post(`${HRCalendarPageEndPoints.CREATE}`, data, { withCredentials: true });
        return { ...response.data, type: "CreateEvent" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to create event" });
    }
});

export const HandleUpdateHREvent = createAsyncThunk("HandleUpdateHREvent", async ({ data }, { rejectWithValue }) => {
    try {
        const response = await apiService.patch(`${HRCalendarPageEndPoints.UPDATE}`, data, { withCredentials: true });
        return { ...response.data, type: "UpdateEvent" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to update event" });
    }
});

export const HandleDeleteHREvent = createAsyncThunk("HandleDeleteHREvent", async ({ eventID }, { rejectWithValue }) => {
    try {
        const response = await apiService.delete(`${HRCalendarPageEndPoints.DELETE(eventID)}`, { withCredentials: true });
        return { ...response.data, type: "DeleteEvent" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to delete event" });
    }
});


