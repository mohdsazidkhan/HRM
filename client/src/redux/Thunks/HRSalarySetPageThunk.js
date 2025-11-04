import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "../apis/apiService"
import { HRSalarySetEndPoints } from "../apis/APIsEndpoints"

export const HandleGetHRSalarySets = createAsyncThunk('HandleGetHRSalarySets', async (payload, { rejectWithValue }) => {
    try {
        const { apiroute } = payload || { apiroute: 'GETALL' }
        const response = await apiService.get(`${HRSalarySetEndPoints[apiroute]}`, { withCredentials: true })
        return { ...response.data, type: apiroute === 'GETACTIVE' ? 'ActiveSalarySets' : 'AllSalarySets' }
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' })
    }
})

export const HandlePostHRSalarySets = createAsyncThunk('HandlePostHRSalarySets', async (payload, { rejectWithValue }) => {
    try {
        const { data } = payload
        const response = await apiService.post(`${HRSalarySetEndPoints.CREATE}`, data, { withCredentials: true })
        return { ...response.data, type: 'CreateSalarySet' }
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' })
    }
})

export const HandlePatchHRSalarySets = createAsyncThunk('HandlePatchHRSalarySets', async (payload, { rejectWithValue }) => {
    try {
        const { data } = payload
        const response = await apiService.patch(`${HRSalarySetEndPoints.UPDATE}`, data, { withCredentials: true })
        return { ...response.data, type: 'UpdateSalarySet' }
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' })
    }
})

export const HandleDeleteHRSalarySets = createAsyncThunk('HandleDeleteHRSalarySets', async (payload, { rejectWithValue }) => {
    try {
        const { id } = payload
        const response = await apiService.delete(`${HRSalarySetEndPoints.DELETE(id)}`, { withCredentials: true })
        return { ...response.data, type: 'DeleteSalarySet' }
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' })
    }
})


