import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService";
import { EmployeeLeavesEndPoints } from "../apis/APIsEndpoints";

export const HandleGetMyLeaves = createAsyncThunk(
    "HandleGetMyLeaves",
    async ({ page = 1, limit = 10, search = "", status = "", startDate = "", endDate = "", sortBy = "createdAt", sortDir = "desc" } = {}, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams();
            params.set("page", page);
            params.set("limit", limit);
            if (search) params.set("search", search);
            if (status) params.set("status", status);
            if (startDate) params.set("startDate", startDate);
            if (endDate) params.set("endDate", endDate);
            if (sortBy) params.set("sortBy", sortBy);
            if (sortDir) params.set("sortDir", sortDir);
            const url = `${EmployeeLeavesEndPoints.MY_LIST}?${params.toString()}`;
            const response = await apiService.get(url, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { success: false, message: "Failed to fetch leaves" });
        }
    }
);


