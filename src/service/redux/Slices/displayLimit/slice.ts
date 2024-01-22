import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

interface showListType {
  value: number
}

const initialState: showListType = {
  value: 3
}

export const DisplayLimitSlice = createSlice({
  name: 'limit',
  initialState,
  reducers: {
    showMore: (state) => {
      state.value += 3
    }
  }
})

export const { showMore } = DisplayLimitSlice.actions

export const limitResult = (state: RootState) => state.displayLimit.value

export default DisplayLimitSlice.reducer