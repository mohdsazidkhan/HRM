import { createSlice } from "@reduxjs/toolkit"
import { HandleDeleteHRSalarySets, HandleGetHRSalarySets, HandlePatchHRSalarySets, HandlePostHRSalarySets } from "../Thunks/HRSalarySetPageThunk"

const HRSalarySetPageSlice = createSlice({
    name: 'HRSalarySetPage',
    initialState: {
        data: null,
        active: [],
        isLoading: false,
        fetchData: false,
        success: { status: false, message: null, content: null },
        error: { status: false, message: null, content: null }
    },
    extraReducers: (builder) => {
        const base = (thunk) => {
            builder.addCase(thunk.pending, (state) => {
                state.isLoading = true
                state.error.content = null
            })
            builder.addCase(thunk.rejected, (state, action) => {
                state.isLoading = false
                state.error.status = true
                state.error.message = action.payload?.message
                state.error.content = action.payload
            })
        }
        base(HandleGetHRSalarySets)
        builder.addCase(HandleGetHRSalarySets.fulfilled, (state, action) => {
            state.isLoading = false
            state.error.status = false
            if (action.payload.type === 'ActiveSalarySets') {
                state.active = action.payload.data
            } else {
                state.data = action.payload.data
                state.fetchData = false
            }
        })

        base(HandlePostHRSalarySets)
        builder.addCase(HandlePostHRSalarySets.fulfilled, (state, action) => {
            state.isLoading = false
            state.error.status = false
            state.success.status = true
            state.success.message = action.payload.message
            state.fetchData = true
        })

        base(HandlePatchHRSalarySets)
        builder.addCase(HandlePatchHRSalarySets.fulfilled, (state) => {
            state.isLoading = false
            state.error.status = false
            state.fetchData = true
        })

        base(HandleDeleteHRSalarySets)
        builder.addCase(HandleDeleteHRSalarySets.fulfilled, (state) => {
            state.isLoading = false
            state.error.status = false
            state.fetchData = true
        })
    }
})

export default HRSalarySetPageSlice.reducer


