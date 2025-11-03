import { createSlice } from "@reduxjs/toolkit";
import { HandleCreateHRBalance, HandleDeleteHRBalance, HandleGetHRBalance, HandleUpdateHRBalance } from "../Thunks/HRBalanceThunk";

const HRBalanceSlice = createSlice({
    name: "HRBalance",
    initialState: { data: null, isLoading: false, success: false, fetchData: false, error: { status: false, message: null, content: null } },
    extraReducers: (builder) => {
        builder.addCase(HandleGetHRBalance.pending, (state) => { state.isLoading = true; state.error.content = null; });
        builder.addCase(HandleGetHRBalance.fulfilled, (state, action) => { state.isLoading = false; state.error.status = false; state.data = action.payload.balances || action.payload.data; state.success = action.payload.success; state.fetchData = false; });
        builder.addCase(HandleGetHRBalance.rejected, (state, action) => { state.isLoading = false; state.error.status = true; state.error.message = action.payload?.message; state.error.content = action.payload; });

        const onWritePending = (state) => { state.isLoading = true; state.error.content = null; };
        const onWriteFulfilled = (state, action) => { state.isLoading = false; state.error.status = false; state.success = action.payload.success; state.fetchData = true; };
        const onWriteRejected = (state, action) => { state.isLoading = false; state.error.status = true; state.error.message = action.payload?.message; state.error.content = action.payload; };

        builder.addCase(HandleCreateHRBalance.pending, onWritePending);
        builder.addCase(HandleCreateHRBalance.fulfilled, onWriteFulfilled);
        builder.addCase(HandleCreateHRBalance.rejected, onWriteRejected);

        builder.addCase(HandleUpdateHRBalance.pending, onWritePending);
        builder.addCase(HandleUpdateHRBalance.fulfilled, onWriteFulfilled);
        builder.addCase(HandleUpdateHRBalance.rejected, onWriteRejected);

        builder.addCase(HandleDeleteHRBalance.pending, onWritePending);
        builder.addCase(HandleDeleteHRBalance.fulfilled, onWriteFulfilled);
        builder.addCase(HandleDeleteHRBalance.rejected, onWriteRejected);
    },
});

export default HRBalanceSlice.reducer;


