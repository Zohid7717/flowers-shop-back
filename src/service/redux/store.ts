import { configureStore } from '@reduxjs/toolkit'
import DisplayLimitSlice from './Slices/displayLimit/slice'
import category from './Slices/category/slice'
import productItems from './Slices/productItems/slice'
import inputValue from './Slices/inputValue/slice'
import productPrice from './Slices/productPrice/slice'
import resetFilter from './Slices/resetFilter/slice'
import auth from './Slices/auth/slice'
import discount from './Slices/discount/slice'
import fromPage from './Slices/fromPage/slice'
import flowers from "./Slices/flowers/slice";
import images from "./Slices/flowerImages/slice";
import toast from "./Slices/toast/slice";
import bouquet from "./Slices/bouquet/slice"
import bouquets from "./Slices/bouquets/slice"
import course from "./Slices/course/slice"

export const store = configureStore({
  reducer: {
    displayLimit: DisplayLimitSlice,
    category,
    productItems,
    inputValue,
    productPrice,
    resetFilter,
    auth,
    discount,
    fromPage,
    flowers,
    images,
    toast,
    bouquet,
    bouquets,
    course
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch