import { createSlice } from "@reduxjs/toolkit";
import { HandleGetHRProfiles, HandleUpdateHRProfile, HandleDeleteHRProfile } from "../Thunks/HRProfilesThunk";

const HRProfilesSlice = createSlice({
    name: "HRProfiles",
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
        builder.addCase(HandleGetHRProfiles.pending, (state) => {
            state.isLoading = true;
            state.error.content = null;
        });
        builder.addCase(HandleGetHRProfiles.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error.status = false;
            state.data = action.payload.data;
            state.success = action.payload.success;
            state.fetchData = false;
        });
        builder.addCase(HandleGetHRProfiles.rejected, (state, action) => {
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

        builder.addCase(HandleUpdateHRProfile.pending, onWritePending);
        builder.addCase(HandleUpdateHRProfile.fulfilled, onWriteFulfilled);
        builder.addCase(HandleUpdateHRProfile.rejected, onWriteRejected);

        builder.addCase(HandleDeleteHRProfile.pending, onWritePending);
        builder.addCase(HandleDeleteHRProfile.fulfilled, onWriteFulfilled);
        builder.addCase(HandleDeleteHRProfile.rejected, onWriteRejected);
    },
});

export default HRProfilesSlice.reducer;


