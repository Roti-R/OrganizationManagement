import { createSlice } from "@reduxjs/toolkit";

const SelectedDistrictSlice = createSlice({
    name: 'SelectedDistrict',
    initialState: {
        selectedDistrict: null
    },
    reducers: {
        setSelectedDistrict: (state, action) => {
            state.selectedDistrict = action.payload;
        }
    }
})

export const { setSelectedDistrict } = SelectedDistrictSlice.actions;
export default SelectedDistrictSlice.reducer;