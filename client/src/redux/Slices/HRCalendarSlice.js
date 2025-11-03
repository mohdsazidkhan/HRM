import { createSlice } from "@reduxjs/toolkit";
import { HandleCreateHREvent, HandleDeleteHREvent, HandleGetHRCalendar, HandleUpdateHREvent } from "../Thunks/HRCalendarThunk";

const HRCalendarSlice = createSlice({
    name: "HRCalendar",
    initialState: { data: null, isLoading: false, success: false, fetchData: false, error: { status: false, message: null, content: null } },
    extraReducers: (builder) => {
        builder.addCase(HandleGetHRCalendar.pending, (state) => { state.isLoading = true; state.error.content = null; });
        builder.addCase(HandleGetHRCalendar.fulfilled, (state, action) => { state.isLoading = false; state.error.status = false; state.data = action.payload.data; state.success = action.payload.success; state.fetchData = false; });
        builder.addCase(HandleGetHRCalendar.rejected, (state, action) => { state.isLoading = false; state.error.status = true; state.error.message = action.payload?.message; state.error.content = action.payload; });

        const onWritePending = (state) => { state.isLoading = true; state.error.content = null; };
        const onWriteFulfilled = (state, action) => { state.isLoading = false; state.error.status = false; state.success = action.payload.success; state.fetchData = true; };
        const onWriteRejected = (state, action) => { state.isLoading = false; state.error.status = true; state.error.message = action.payload?.message; state.error.content = action.payload; };

        builder.addCase(HandleCreateHREvent.pending, onWritePending);
        builder.addCase(HandleCreateHREvent.fulfilled, onWriteFulfilled);
        builder.addCase(HandleCreateHREvent.rejected, onWriteRejected);

        builder.addCase(HandleUpdateHREvent.pending, onWritePending);
        builder.addCase(HandleUpdateHREvent.fulfilled, onWriteFulfilled);
        builder.addCase(HandleUpdateHREvent.rejected, onWriteRejected);

        builder.addCase(HandleDeleteHREvent.pending, onWritePending);
        builder.addCase(HandleDeleteHREvent.fulfilled, onWriteFulfilled);
        builder.addCase(HandleDeleteHREvent.rejected, onWriteRejected);
    },
});

export default HRCalendarSlice.reducer;


