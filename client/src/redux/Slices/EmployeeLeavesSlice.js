import { createSlice } from "@reduxjs/toolkit";
import { HandleGetMyLeaves } from "../Thunks/EmployeeLeavesThunk";

const initialState = {
    items: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
    isLoading: false,
    error: null,
    lastQuery: { page: 1, limit: 10, search: "", status: "", startDate: "", endDate: "", sortBy: "createdAt", sortDir: "desc" },
};

const EmployeeLeavesSlice = createSlice({
    name: "EmployeeLeavesReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(HandleGetMyLeaves.pending, (state, action) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(HandleGetMyLeaves.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = Array.isArray(action.payload?.data) ? action.payload.data : [];
                state.pagination = action.payload?.pagination || initialState.pagination;
            })
            .addCase(HandleGetMyLeaves.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || { message: "Failed to fetch leaves" };
            });
    },
});

export default EmployeeLeavesSlice.reducer;


