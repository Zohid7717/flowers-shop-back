import {createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../../../utils/axios"
import { BouquetStateType } from './types'



const initialState: BouquetStateType = {
  list: null,
  loading: false,
  status: null,
  success: false
}

export const bouquetsSlice = createSlice({
  name: 'bouquets',
  initialState,
  reducers:{}
})

export default bouquetsSlice.reducer