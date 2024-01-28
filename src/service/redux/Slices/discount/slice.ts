import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../../../utils/axios"
import { RejectedAction } from '../../../../utils/types';

export type discountType = {
  _id: string;
  title: string;
  total: number | boolean;
  percent: number | boolean;
  status: boolean | number;
}

type discountStateType = {
  list: discountType[];
  loading: boolean;
  status: string
}

//получения скидок
export const getDiscounts = createAsyncThunk(
  'discount/getDiscounts',
  async () => {
    try {
      const { data } = await axios.get('/discount/getAll')
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

//изменения скидок
export const updateDiscount = createAsyncThunk<string, discountType>(
  'dicount/updateDiscount',
  async ({ _id, title, total, percent, status }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/discount/${_id}`, { _id, title, total, percent, status })
      if (!data) {
        throw new Error('Произошло ошибка при обработке данных!')
      }
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const initialState: discountStateType = {
  list: [],
  loading: false,
  status: ''
}

const discountSlice = createSlice({
  name: 'discount',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getDiscounts.pending, (state) => {
        state.loading = true
      })
      .addCase(getDiscounts.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(getDiscounts.rejected, (state, action) => {
        state.status = (action.payload as { message: string }).message
      })
      //обновления скидки
      .addCase(updateDiscount.pending, (state) => {
        state.loading = true
      })
      .addCase(updateDiscount.fulfilled, (state, action) => {
        state.loading = false
        state.status = action.payload
      })
      .addCase(updateDiscount.rejected, (state, action: RejectedAction) => {
        state.loading = false
        state.status = action.error ? action.payload : ''
      })

  },
})

export default discountSlice.reducer