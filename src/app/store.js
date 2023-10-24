import { configureStore } from '@reduxjs/toolkit'
import headerSlice from '../features/common/headerSlice'
import modalSlice from '../features/common/modalSlice'
import rightDrawerSlice from '../features/common/rightDrawerSlice'
import leadsSlice from '../features/leads/leadSlice'
import ProvOrganizationSlice from '../features/transactions/OrganizationSlice'
import SelectedProvSlice from '../features/district/SelectedProvSlice'
import SelectedDistrictSlice from '../features/commune/SelectedDistrictSlice'
import memberSlice from '../features/members/memberSlice'

const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  lead: leadsSlice,
  org: ProvOrganizationSlice,
  member: memberSlice,
  selectedProv: SelectedProvSlice,
  selectedDistrict: SelectedDistrictSlice
}

export default configureStore({
  reducer: combinedReducer
})