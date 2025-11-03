import { createSlice } from "@reduxjs/toolkit";
import { HandleGetEmployeeSelf } from "../Thunks/EmployeeSelfThunk";

const EmployeeSelfSlice = createSlice({
    name: "EmployeeSelf",
    initialState: {
        data: null,
        isLoading: false,
        success: false,
        error: { status: false, message: null, content: null },
    },
    extraReducers: (builder) => {
        builder.addCase(HandleGetEmployeeSelf.pending, (state) => {
            state.isLoading = true;
            state.error.content = null;
        });
        builder.addCase(HandleGetEmployeeSelf.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error.status = false;
            state.data = action.payload.data;
            state.success = action.payload.success;
        });
        builder.addCase(HandleGetEmployeeSelf.rejected, (state, action) => {
            state.isLoading = false;
            state.error.status = true;
            state.error.message = action.payload?.message;
            state.error.content = action.payload;
        });
    },
});

export default EmployeeSelfSlice.reducer;


