import { createSlice } from "@reduxjs/toolkit";

const SelectedProvSlice = createSlice({
    name: 'SelectedProvince',
    initialState: {
        selectedProvince: null
    },
    reducers: {
        setSelectedProvince: (state, action) => {
            state.selectedProvince = action.payload;
        }
    }
})

export const { setSelectedProvince } = SelectedProvSlice.actions;
export default SelectedProvSlice.reducer;