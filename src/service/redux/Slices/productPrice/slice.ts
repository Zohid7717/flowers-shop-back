import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

//тип получаемого массива
export interface PriceType {
  name: string;
  value1: number;
  value2: number;
}

const initialState: PriceType = {
  name: '',
  value1: 0,
  value2: 0
}

const productPriceSlice = createSlice({
  name: 'productPrice',
  initialState,
  reducers: {
    setProductPrice: (state, action: PayloadAction<PriceType>) => {
      state.name = action.payload.name;
      state.value1 = action.payload.value1;
      state.value2 = action.payload.value2;
    },
    resetProductPrice: (state) => {
      state.name = '';
      state.value1 = 0;
      state.value2 = 0;
    },
  }
})

export const { setProductPrice, resetProductPrice } = productPriceSlice.actions
export const priceResult = (state: RootState) => state.productPrice
export default productPriceSlice.reducer