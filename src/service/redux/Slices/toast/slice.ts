import { createSlice } from "@reduxjs/toolkit"

type ToastStateType = {
  message: string
}

const initialState: ToastStateType = {
  message: ''
}

export const toastState = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setMessage(state, action) {
      state.message = action.payload
    },
    clearMessage(state) {
      state.message=''
    }
  }
})

export const { setMessage, clearMessage } = toastState.actions

export default toastState.reducer