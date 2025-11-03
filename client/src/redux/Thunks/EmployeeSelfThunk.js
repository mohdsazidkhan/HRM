import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService";
import { EmployeeSelfEndPoints } from "../apis/APIsEndpoints";

export const HandleGetEmployeeSelf = createAsyncThunk("HandleGetEmployeeSelf", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get(`${EmployeeSelfEndPoints.BY_EMPLOYEE}`, { withCredentials: true });
        return { ...response.data, type: "GetEmployee" };
    } catch (error) {
        return rejectWithValue(error.response?.data || { success: false, message: "Failed to fetch employee" });
    }
});


