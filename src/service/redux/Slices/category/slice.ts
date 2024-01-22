import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

interface CategoryType {
  value: string
}

const initialState: CategoryType = {
  value: ''
}
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
    resetCategory: (state)=>{
      state.value = ''
    }
  }
})

export const { setCategory, resetCategory } = categorySlice.actions

export const categoryResult = (state: RootState) => state.category.value

export default categorySlice.reducer