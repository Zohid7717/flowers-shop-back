import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FromPageType {
  value: string
}

const initialState: FromPageType = {
  value: ''
}

const fromPageSlice = createSlice({
  name: 'fromPage',
  initialState,
  reducers: {
    setFromPage: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
    resetFromPage: (state) => {
      state.value = ''
    }
  }
})

export const { setFromPage, resetFromPage } = fromPageSlice.actions

export default fromPageSlice.reducer