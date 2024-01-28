import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../../../utils/axios"
import { BouquetStateType, ResBouquets } from './types'
import { RejectedAction } from '../../../../utils/types'

//получаенм получаем все букеты
export const getAllBouquets = createAsyncThunk<ResBouquets>(
  'bouquet/getAllBouquets',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/bouquet/bouquets')
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const initialState: BouquetStateType = {
  list: null,
  loading: false,
  status: null,
  success: false
}

export const bouquetsSlice = createSlice({
  name: 'bouquets',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      //get bouquets
      .addCase(getAllBouquets.pending, (state) => {
        state.loading = true
        state.status = null
      })
      .addCase(getAllBouquets.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload ? action.payload.sentInfo : null
        state.success = true
      })
      .addCase(getAllBouquets.rejected, (state, action: RejectedAction) => {
        state.loading = false
        state.status = action.payload
        state.success = false
      })
  }
})

export default bouquetsSlice.reducer