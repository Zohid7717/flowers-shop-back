import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface ResetFilterType {
  value: boolean,
  id: number,
}

const initialState: ResetFilterType = {
  value: false,
  id: 0,
}

const resetFilterSlice = createSlice({
  name: 'resetFilter',
  initialState,
  reducers: {
    setResetFilter: (state) => {
      state.value = !state.value
      state.id = new Date().getTime()
    },
    setResetFilterTrue: (state) => {
      state.value=true
      state.id = new Date().getTime()
    },
    setResetFilterFalse: (state) => {
      state.value=false
    }
  }
})

export const { setResetFilter, setResetFilterTrue, setResetFilterFalse } = resetFilterSlice.actions

export const resetFilterResult = (state: RootState) => state.resetFilter.value

export default resetFilterSlice.reducer