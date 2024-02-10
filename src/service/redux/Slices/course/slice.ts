import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../../../utils/axios"
import { CourseSliceType, ReqCourseInfo, ResCourseInfo } from './types'
import { RejectedAction } from "../../../../utils/types";

//Получаем курс доллара
export const getCourse = createAsyncThunk(
  'course/getcourse',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/course/getcourse')
      if (!data) {
        throw new Error("Произошло ошибка при обработке данных!")
      }
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

//Меняем курс доллара
export const updateCourse = createAsyncThunk<ResCourseInfo, ReqCourseInfo>(
  'course/updateCourse',
  async ({ name, course }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put('/course/updatecourse', { name, course })
      if (!data) {
        throw new Error("Произошло ошибка при обработке данных!")
      }
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const initialState: CourseSliceType = {
  list: [],
  loading: false,
  status: '',
  success: false
}

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      //getCourse
      .addCase(getCourse.pending, (state) => {
        state.loading = true
      })
      .addCase(getCourse.fulfilled, (state, action) => {
        state.loading = false
        state.success = action.payload.success
        state.list = action.payload.courses
      })
      .addCase(getCourse.rejected, (state, action: RejectedAction) => {
        state.loading = false
        state.success = action.payload.success
        state.status = action.payload.message
      })
      //updateCourse
      .addCase(updateCourse.pending, (state) => {
        state.loading = true
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload.courses
        state.success = action.payload.success
        state.status = action.payload.message
      })
      .addCase(updateCourse.rejected, (state, action: RejectedAction) => {
        state.loading = false
        state.success = action.payload.success
        state.status = action.payload.message
      })
  },
})

export default courseSlice.reducer