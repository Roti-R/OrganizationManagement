import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import memberAPI from "../../api/memberAPI";
import { showNotification } from "../common/headerSlice";

export const getMember = createAsyncThunk('/member/contents', async () => {
    try {
        const response = await memberAPI.getAllMember();
        return response.data;
    } catch (error) {
        console.error('Lỗi trong quá trình lấy dữ liệu từ API:', error);
        throw error;
    }
})

export const createMember = createAsyncThunk('/member/create', async (value, thunkAPI) => {
    try {
        const response = await memberAPI.createMember(value);
        return response.data;
    }
    catch (error) {
        if (error.response.status === 422) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
        throw error;
    }
})

export const deleteMember = createAsyncThunk('/member/delete', async (value, thunkAPI) => {
    try {
        const response = await memberAPI.deleteMember(value);
        return value;
    } catch (error) {
        if (error.response.status === 422) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
        throw error;
    }
})

export const memberSlice = createSlice({
    name: 'member',
    initialState: {
        isLoading: false,
        members: []
    },
    reducers: {

    },
    extraReducers: {
        [getMember.pending]: state => {
            state.isLoading = true
        },
        [getMember.fulfilled]: (state, action) => {
            state.members = action.payload
            state.isLoading = false
            console.log("Đã chạy vào lấy dữ liệu");

        },


        [getMember.rejected]: state => {
            state.isLoading = false;
        },


        [createMember.pending]: state => {
            state.isLoading = true
        },
        [createMember.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.members = [...state.members, action.payload];
        },
        [createMember.rejected]: state => {
            state.isLoading = false;
        },


        [deleteMember.pending]: state => {
            state.isLoading = true;
        },
        [deleteMember.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.members = state.members.filter(org => org.memberID !== action.payload)

        },
        [deleteMember.rejected]: state => {
            state.isLoading = false;
            console.log("Nhay vo rejeject r");
        },
    }

}

)

export default memberSlice.reducer;