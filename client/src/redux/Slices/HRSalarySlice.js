import { createSlice } from "@reduxjs/toolkit";
import { HandleCreateHRSalary, HandleDeleteHRSalary, HandleGetHRSalary, HandleUpdateHRSalary } from "../Thunks/HRSalaryThunk";

const HRSalarySlice = createSlice({
    name: "HRSalary",
    initialState: {
        data: null,
        isLoading: false,
        success: false,
        fetchData: false,
        error: {
            status: false,
            message: null,
            content: null,
        },
    },
    extraReducers: (builder) => {
        builder.addCase(HandleGetHRSalary.pending, (state) => {
            state.isLoading = true;
            state.error.content = null;
        });
        builder.addCase(HandleGetHRSalary.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error.status = false;
            state.data = action.payload.data;
            state.success = action.payload.success;
            state.fetchData = false;
        });
        builder.addCase(HandleGetHRSalary.rejected, (state, action) => {
            state.isLoading = false;
            state.error.status = true;
            state.error.message = action.payload?.message;
            state.error.content = action.payload;
        });

        const onWritePending = (state) => {
            state.isLoading = true;
            state.error.content = null;
        };
        const onWriteFulfilled = (state, action) => {
            state.isLoading = false;
            state.error.status = false;
            state.success = action.payload.success;
            state.fetchData = true;
        };
        const onWriteRejected = (state, action) => {
            state.isLoading = false;
            state.error.status = true;
            state.error.message = action.payload?.message;
            state.error.content = action.payload;
        };

        builder.addCase(HandleCreateHRSalary.pending, onWritePending);
        builder.addCase(HandleCreateHRSalary.fulfilled, onWriteFulfilled);
        builder.addCase(HandleCreateHRSalary.rejected, onWriteRejected);

        builder.addCase(HandleUpdateHRSalary.pending, onWritePending);
        builder.addCase(HandleUpdateHRSalary.fulfilled, onWriteFulfilled);
        builder.addCase(HandleUpdateHRSalary.rejected, onWriteRejected);

        builder.addCase(HandleDeleteHRSalary.pending, onWritePending);
        builder.addCase(HandleDeleteHRSalary.fulfilled, onWriteFulfilled);
        builder.addCase(HandleDeleteHRSalary.rejected, onWriteRejected);
    },
});

export default HRSalarySlice.reducer;


