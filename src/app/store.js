import ProvOrganizationSlice from '../features/transactions/OrganizationSlice'
import SelectedDistrictSlice from '../features/commune/SelectedDistrictSlice'
import SelectedProvSlice from '../features/district/SelectedProvSlice'
import { configureStore } from '@reduxjs/toolkit'
import headerSlice from '../features/common/headerSlice'
import leadsSlice from '../features/leads/leadSlice'
import managerSlice from '../features/detailOrganization/managerSlice'
import memberSlice from '../features/members/memberSlice'
import modalSlice from '../features/common/modalSlice'
import rightDrawerSlice from '../features/common/rightDrawerSlice'

const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  lead: leadsSlice,
  org: ProvOrganizationSlice,
  member: memberSlice,
  selectedProv: SelectedProvSlice,
  selectedDistrict: SelectedDistrictSlice,
  manager: managerSlice
}

export default configureStore({
  reducer: combinedReducer
})