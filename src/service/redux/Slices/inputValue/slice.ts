import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface InputType{
  value: string
}

const initialState: InputType = {
  value: ''
}

const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    setInput: (state, action: PayloadAction<string>) => {
      state.value=action.payload
    },
    resetInput: (state) => {
      state.value=""
    }
  }
})

export const { setInput, resetInput } = inputSlice.actions

export const inputResult = (state: RootState) => state.input.value

export default inputSlice.reducer