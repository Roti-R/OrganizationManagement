import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import organizationApi from "../../api/OrganizationAPI";
import { showNotification } from "../common/headerSlice";



export const getOrganization = createAsyncThunk('/prov/contents', async () => {
    try {
        const response = await organizationApi.getOrganizationByType('tinh');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Lỗi trong quá trình lấy dữ liệu từ API:', error);
        throw error;
    }
})

export const createOrganization = createAsyncThunk('/prov/create', async (value) => {
    try {
        const response = await organizationApi.createOrganization(value);
        console.log(response);
        return response.data;
    }
    catch (error) {
        console.log("Có lỗi xảy ra", error);
        throw error;
    }
})

export const deleteOrganization = createAsyncThunk('/prov/delete', async (key, thunkAPI) => {
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

export const ProvOrganizationSlice = createSlice({
    name: 'provs',
    initialState: {
        isLoading: false,
        provs: []
    },
    reducers: {

    },
    extraReducers: {
        [getOrganization.pending]: state => {
            state.isLoading = true
        },
        [getOrganization.fulfilled]: (state, action) => {
            state.provs = action.payload
            state.isLoading = false
        },


        [getOrganization.rejected]: state => {
            state.isLoading = false;
        },


        [createOrganization.pending]: state => {
            state.isLoading = true
        },
        [createOrganization.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.provs = [...state.provs, action.payload];
        },
        [createOrganization.rejected]: state => {
            state.isLoading = false
        },


        [deleteOrganization.pending]: state => {
            state.isLoading = true;
        },
        [deleteOrganization.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.provs = state.provs.filter(org => org.orgID !== action.payload)

        },
        [deleteOrganization.rejected]: state => {
            state.isLoading = false;
            console.log("Nhay vo rejeject r");
        },
    }

}

)

export const { addNewProvOrganization } = ProvOrganizationSlice.actions;
export default ProvOrganizationSlice.reducer