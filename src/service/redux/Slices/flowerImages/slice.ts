import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../../../utils/axios"
import { ReqFormData } from '../../../../utils/types';

interface DelReqType {
  imageUrls: string[] | null
}

interface DelResType{
  message: string
}

interface RejectedAction {
  type: string;
  error: any;
  payload: any;
}

interface imageUrlsStateType {
  list: string[] | null;
  loading: boolean;
  status: string | null;
}

const initialState: imageUrlsStateType = {
  list: null,
  loading: false,
  status: null
}

//Добавления изодражения в букете
export const addFlowersInBouquet = createAsyncThunk<string[], ReqFormData>(
  'image/addFlowersInBouquet',
  async ({ formData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/upload', formData)
      if (!data) {
        throw new Error("Произошло ошибка при обработка данные.")
      }
      return data.images
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

//Удаления изображение букета
export const removeBouquetImage = createAsyncThunk<DelResType, DelReqType>(
  'image/removeBouquetImage',
  async ({ imageUrls }, { rejectWithValue }) => {
    console.log(imageUrls)
    try {
      const { data } = await axios.delete('/upload', { data: imageUrls })
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const imagesSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      //addImages
      .addCase(addFlowersInBouquet.pending, (state) => {
        state.loading = true
        state.status = null
      })
      .addCase(addFlowersInBouquet.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(addFlowersInBouquet.rejected, (state, action: RejectedAction) => {
        state.loading = false
        state.status = action.error ? action.payload?.response.data.message : null
      })
      //deleteImages
      .addCase(removeBouquetImage.pending, (state) => {
        state.loading = true
        state.status = null
      })
      .addCase(removeBouquetImage.fulfilled, (state, action) => {
        state.loading = false
        state.list = null
        state.status = action.payload.message
      })
      .addCase(removeBouquetImage.rejected, (state, action: RejectedAction) => {
        state.loading = false
        state.status = action.error ? action.payload?.response.data.message : null
      })
  },
})

export default imagesSlice.reducer