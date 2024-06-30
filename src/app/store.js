import { configureStore } from '@reduxjs/toolkit'
import headerSlice from '../features/common/headerSlice'
import userSlice from '../features/common/userSlice'
import modalSlice from '../features/common/modalSlice'
import rightDrawerSlice from '../features/common/rightDrawerSlice'

const combinedReducer = {
  header : headerSlice,
  user: userSlice,
  rightDrawer : rightDrawerSlice,
  modal : modalSlice
}

export default configureStore({
    reducer: combinedReducer
})