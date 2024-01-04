import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import organizationApi from "../../api/OrganizationAPI";
import { showNotification } from "../common/headerSlice";



export const getOrganization = createAsyncThunk('/org/contents', async () => {
    try {
        const response = await organizationApi.getAllOrganization();
        return response.data;
    } catch (error) {
        console.error('Lỗi trong quá trình lấy dữ liệu từ API:', error);
        throw error;
    }
})

export const createOrganization = createAsyncThunk('/org/create', async (value) => {
    try {
        const response = await organizationApi.createOrganization(value);
        return response.data;
    }
    catch (error) {
        console.log("Có lỗi xảy ra", error);
        throw error;
    }
})

export const deleteOrganization = createAsyncThunk('/org/delete', async (key, thunkAPI) => {
    try {
        const response = await organizationApi.deleteOrganization(key);
        console.log("Xóa hội thành công");
        return key;
    } catch (error) {
        thunkAPI.dispatch(showNotification({ message: "Xóa hội không thành công", status: 0 }))
        console.log("Có lỗi xảy ra khi xóa hội", error);
        throw error;
    }
})

export const getManagerList = createAsyncThunk('/org/contents', async (value, thunkAPI) => {
    try {
        const response = await organizationApi.getManagerList(value);
        return response.data;
    } catch (error) {
        thunkAPI.rejectWithValue(error);
    }
})

export const OrganizationSlice = createSlice({
    name: 'org',
    initialState: {
        isLoading: false,
        orgs: []
    },
    reducers: {

    },
    extraReducers: {
        [getOrganization.pending]: state => {
            state.isLoading = true
        },
        [getOrganization.fulfilled]: (state, action) => {
            state.orgs = action.payload
            state.isLoading = false
            console.log("Đã chạy vào lấy dữ liệu");

        },


        [getOrganization.rejected]: state => {
            state.isLoading = false;
        },


        [createOrganization.pending]: state => {
            state.isLoading = true
        },
        [createOrganization.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.orgs = [...state.orgs, action.payload];
        },
        [createOrganization.rejected]: state => {
            state.isLoading = false
        },


        [deleteOrganization.pending]: state => {
            state.isLoading = true;
        },
        [deleteOrganization.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.orgs = state.orgs.filter(org => org.orgID !== action.payload)

        },
        [deleteOrganization.rejected]: state => {
            state.isLoading = false;
            console.log("Nhay vo rejeject r");
        },
    }

}

)

export const { addNewProvOrganization } = OrganizationSlice.actions;
export default OrganizationSlice.reducer