import { configureStore } from '@reduxjs/toolkit'
import headerSlice from '../features/common/headerSlice'
import userSlice from '../features/common/userSlice'
import modalSlice from '../features/common/modalSlice'
import rightDrawerSlice from '../features/common/rightDrawerSlice'
import leadsSlice from '../features/leads/leadSlice'

const combinedReducer = {
  header : headerSlice,
  user: userSlice,
  rightDrawer : rightDrawerSlice,
  modal : modalSlice,
  lead : leadsSlice
}

export default configureStore({
    reducer: combinedReducer
})