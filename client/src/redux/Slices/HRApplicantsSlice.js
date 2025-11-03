import { createSlice } from "@reduxjs/toolkit";
import { HandleCreateHRApplicant, HandleDeleteHRApplicant, HandleGetHRApplicants, HandleUpdateHRApplicant } from "../Thunks/HRApplicantsThunk";

const HRApplicantsSlice = createSlice({
    name: "HRApplicants",
    initialState: { data: null, isLoading: false, success: false, fetchData: false, error: { status: false, message: null, content: null } },
    extraReducers: (builder) => {
        builder.addCase(HandleGetHRApplicants.pending, (state) => { state.isLoading = true; state.error.content = null; });
        builder.addCase(HandleGetHRApplicants.fulfilled, (state, action) => { state.isLoading = false; state.error.status = false; state.data = action.payload.data; state.success = action.payload.success; state.fetchData = false; });
        builder.addCase(HandleGetHRApplicants.rejected, (state, action) => { state.isLoading = false; state.error.status = true; state.error.message = action.payload?.message; state.error.content = action.payload; });

        const onWritePending = (state) => { state.isLoading = true; state.error.content = null; };
        const onWriteFulfilled = (state, action) => { state.isLoading = false; state.error.status = false; state.success = action.payload.success; state.fetchData = true; };
        const onWriteRejected = (state, action) => { state.isLoading = false; state.error.status = true; state.error.message = action.payload?.message; state.error.content = action.payload; };

        builder.addCase(HandleCreateHRApplicant.pending, onWritePending);
        builder.addCase(HandleCreateHRApplicant.fulfilled, onWriteFulfilled);
        builder.addCase(HandleCreateHRApplicant.rejected, onWriteRejected);

        builder.addCase(HandleUpdateHRApplicant.pending, onWritePending);
        builder.addCase(HandleUpdateHRApplicant.fulfilled, onWriteFulfilled);
        builder.addCase(HandleUpdateHRApplicant.rejected, onWriteRejected);

        builder.addCase(HandleDeleteHRApplicant.pending, onWritePending);
        builder.addCase(HandleDeleteHRApplicant.fulfilled, onWriteFulfilled);
        builder.addCase(HandleDeleteHRApplicant.rejected, onWriteRejected);
    },
});

export default HRApplicantsSlice.reducer;


