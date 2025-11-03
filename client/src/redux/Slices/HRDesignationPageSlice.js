import { createSlice } from "@reduxjs/toolkit";
import { HandleGetHRDesignations, HandlePostHRDesignations, HandlePatchHRDesignations, HandleDeleteHRDesignations } from "../Thunks/HRDesignationPageThunk";
import { HRDesignationPageAsyncReducer } from "../AsyncReducers/asyncreducer";

const HRDesignationPageSlice = createSlice({
    name: "HRDesignationPage",
    initialState: {
        data: null,
        isLoading: false,
        fetchData: false,
        success: { status: false, message: null, content: null },
        error: { status: false, message: null, content: null }
    },
    extraReducers: (builder) => {
        HRDesignationPageAsyncReducer(builder, HandleGetHRDesignations);
        HRDesignationPageAsyncReducer(builder, HandlePostHRDesignations);
        HRDesignationPageAsyncReducer(builder, HandlePatchHRDesignations);
        HRDesignationPageAsyncReducer(builder, HandleDeleteHRDesignations);
    }
})

export default HRDesignationPageSlice.reducer


