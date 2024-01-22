import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export type ProductItemsType = {
  value:string[]
}


const initialState: ProductItemsType = {
  value: []
}

const productItemsSlice = createSlice({
  name: 'productItems',
  initialState,
  reducers: {
    setProductItems: (state, action: PayloadAction<string[]>) => {
      state.value = action.payload
    },
    resetProductItems: (state) => {
      state.value.splice(0, state.value.length)
    },
  }
})

export const { setProductItems, resetProductItems } = productItemsSlice.actions

export const productItemsResult = (state: RootState) => state.productItems

export default productItemsSlice.reducer