import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../../../utils/axios"

type discountType = {
  title: string;
  total: number;
  percent: number;
  status: boolean;
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
        state.status=(action.payload as {message: string}).message
      })
  },
})

export default discountSlice.reducer