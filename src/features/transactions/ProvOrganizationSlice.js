import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import organizationApi from "../../api/OrganizationAPI";



export const getProvOrganizationAPI = createAsyncThunk('/prov/contents', async () => {
    try {
        const response = await organizationApi.getOrganizationByType('tinh');
        console.log('Dữ liệu từ API:', response.data);
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
        return value;
    }
    catch (error) {
        console.log("Có lỗi xảy ra", error);
        throw error;
    }
})

export const deleteOrganization = createAsyncThunk('/prov/delete', async (key) => {
    try {
        const
    } catch (error) {

    }
})

export const ProvOrganizationSlice = createSlice({
    name: 'provs',
    initialState: {
        isLoading: false,
        provs: []
    },
    reducers: {

        addNewProvOrganization: (state, action) => {
            let { newProvOrganization } = action.payload;
            state.provs = [...state.provs, newProvOrganization];
        },
    },
    extraReducers: {
        [getProvOrganizationAPI.pending]: state => {
            state.isLoading = true
        },
        [getProvOrganizationAPI.fulfilled]: (state, action) => {
            state.provs = action.payload
            state.isLoading = false
        },


        [getProvOrganizationAPI.rejected]: state => {
            state.isLoading = false;
            console.log('loi roi');
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
        }
    }

}

)

export const { addNewProvOrganization } = ProvOrganizationSlice.actions;
export default ProvOrganizationSlice.reducer