import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import organizationApi from "../../api/OrganizationAPI";

export const getManagerById = createAsyncThunk('manager/contents', async (orgId, thunkAPI) => {

    try {
        const response = await organizationApi.getManagerList(orgId);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const createManager = createAsyncThunk('manager/create', async (value, thunkAPI) => {
    try {
        const response = await organizationApi.createManager(value.orgId, value.memberId)
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const deleteManager = createAsyncThunk('manager/delete', async (value, thunkAPI) => {
    try {
        const response = await organizationApi.deleteManager(value)
        return value;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})
// export const createManager = createAsyncThunk('manager/create', async(value,thunkAPI) => {
//     try {
//         const response = await organizationApi.(value.orgId, value.memberId)
//         return response.data;
//     } catch (error) {
//         thunkAPI.rejectWithValue(error);
//     }
// })

export const managerSlice = createSlice({
    name: 'manager',
    initialState: {
        isLoading: false,
        managers: []
    },
    extraReducers: {

        [getManagerById.pending]: (state, action) => {
            state.isLoading = true
        },
        [getManagerById.rejected]: (state, action) => {
            state.isLoading = false
        },
        [getManagerById.fulfilled]: (state, action) => {
            state.isLoading = false
            state.managers = action.payload
        },



        [createManager.pending]: (state, action) => {
            state.isLoading = true
        },
        [createManager.rejected]: (state, action) => {
            state.isLoading = false
        },
        [createManager.fulfilled]: (state, action) => {
            state.isLoading = false
            state.managers.push(action.payload)
        },




        [deleteManager.pending]: (state, action) => {
            state.isLoading = true
        },
        [deleteManager.rejected]: (state, action) => {
            state.isLoading = false
        },
        [deleteManager.fulfilled]: (state, action) => {
            state.isLoading = false
            state.managers = state.managers.filter(m => m.memberID !== action.payload)
        },
    }


})

export default managerSlice.reducer;