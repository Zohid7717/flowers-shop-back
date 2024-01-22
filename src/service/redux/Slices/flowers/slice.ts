import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { FlowerType } from '../../../../utils/types'
import axios from "../../../../utils/axios";
import { RejectedAction } from "../../../../utils/types";

type ResFlowersType = {
  flowers: FlowerType[];
  message: string
}

type FlowerNameType = {
  flower_name: string
}
type FlowerIdType = {
  flower_id: string
}
type FlowerStateType = {
  list: FlowerType[];
  loading: boolean;
  status: string | null;
}



const initialState: FlowerStateType = {
  list: [],
  loading: false,
  status: null
}

//Получаем список цветов
export const getFlowers = createAsyncThunk<FlowerType[]>(
  'flower/getFlowers',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/flower/getflowers')
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

//Добавляем цветок
export const addFlower = createAsyncThunk<ResFlowersType, FlowerNameType>(
  'flower/addFlower',
  async ({ flower_name }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/flower/addflower', { flower_name })
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

//Удаления изсписка
export const removeFlower = createAsyncThunk<ResFlowersType, FlowerIdType>(
  'flower/removeFlower',
  async ({ flower_id }, { rejectWithValue }) => {
    try {
      console.log(flower_id)
      const { data } = await axios.delete('/flower/deleteflower', { data: { flower_id } })
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const flowersSlice = createSlice({
  name: 'flower',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      //getFlowers
      .addCase(getFlowers.pending, (state) => {
        state.loading = true
        state.status = null
      })
      .addCase(getFlowers.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(getFlowers.rejected, (state, action: RejectedAction) => {
        state.loading = false
        state.status = action.error ? action.payload?.response.data.message : null
      })
      //addFlower
      .addCase(addFlower.pending, (state) => {
        state.status = null
        state.loading = true
      })
      .addCase(addFlower.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload.flowers
        state.status = action.payload.message
      })
      .addCase(addFlower.rejected, (state, action: RejectedAction) => {
        state.loading = false
        state.status = action.error ? action.payload?.response.data.message : null
        console.log(state.status)
      })
      //deleteFlower
      .addCase(removeFlower.pending, (state) => {
        state.loading = true
        state.status = null
      })
      .addCase(removeFlower.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload.flowers
        state.status = action.payload.message
      })
      .addCase(removeFlower.rejected, (state, action: RejectedAction) => {
        state.loading = false
        state.status = action.error ? action.payload?.response.data.message : null
      })
  },
})

export default flowersSlice.reducer