import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../../utils/axios'
import { TypeForLogUser, TypeForRegUser, UserResType } from '../../../../utils/types'

type authStateType = {
  user: UserResType | null;
  token: string | null;
  isLoading: boolean;
  status: string | null ;
  admin: boolean;
  isAuth: boolean;
}

interface RejectedAction {
  type: string;
  error: any;
  payload: any;
}

const initialState: authStateType = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
  admin: false,
  isAuth: false,
}

interface UserResponse {
  user: UserResType;
  token: string;
  message: string;
  admin: boolean;
}


//Регистрация пользователя или админа
export const registerUser = createAsyncThunk<UserResponse, TypeForRegUser>(
  'auth/registerUser',
  async ({ username, nickname, password, adminpass, tel, ccn }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/register', { username, nickname, password, adminpass, tel, ccn })
      if (!data.token) {
        throw new Error("Произошло ошибка при обработке данных.");
      }
      window.localStorage.setItem('token', data.token)
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

//Авторизация пользователя или админа
export const loginUser = createAsyncThunk<UserResponse, TypeForLogUser>(
  'auth/loginUser',
  async ({ nickname, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/login', { nickname, password })
      if (!data) {
        throw new Error("Произошло ошибка при обработке данных.");
      }
      if (data.token) {
        window.localStorage.setItem('token', data.token)
      }
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

//Определения авторизации
export const getMe = createAsyncThunk(
  'auth/getMe',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/auth/getMe')
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

//Изменения данный пользователя
export const updateUser = createAsyncThunk<UserResponse, TypeForRegUser>(
  'auth/updateUser',
  async ({ username, tel, nickname, ccn }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put('/auth/update', { username, tel, nickname, ccn })
      if (!data) {
        throw new Error('Произошло ошибка при обработке данных.')
      }
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.isLoading = false
      state.status = null
      state.admin = false
      state.token = null
      state.isAuth = false
    }
  },
  extraReducers(builder) {
    builder
      //register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.status = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = action.payload?.message
        state.isLoading = false
        state.token = action.payload?.token
        state.admin = action.payload?.admin
        state.isAuth = true
      })
      .addCase(registerUser.rejected, (state, action: RejectedAction) => {
        state.status = action.error ? action.payload?.response.data.message : null
        state.isLoading = false
      })
      //login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.status = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = action.payload?.message
        state.isLoading = false
        state.user = action.payload?.user
        state.admin = action.payload?.admin
        state.isAuth = true
      })
      .addCase(loginUser.rejected, (state, action: RejectedAction) => {
        state.status = action.error ? action.payload?.response.data.message : null
        state.isLoading = false
      })
      //getMe
      .addCase(getMe.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.status = null
        state.isLoading = false
        state.user = action.payload?.user
        state.token = action.payload?.token
        state.isAuth = true
      })
      .addCase(getMe.rejected, (state, action: RejectedAction) => {
        state.status = action.error ? action.payload?.response.data.message : null
        state.isLoading = false
      })
    //update
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = null
        state.isLoading = false
        state.user = action.payload?.user
      })
      .addCase(updateUser.rejected, (state, action: RejectedAction) => {
        state.status = action.error ? action.payload?.response.data.message : null
        console.log(state.status)
        state.isLoading = false
      })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
