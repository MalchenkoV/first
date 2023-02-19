import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const formSlice = createSlice({
  name: 'forms',
  initialState: {
    email: '',
    password: '',
    username: 'User',
    sessionid: '',
    id: '',
    error: '',
  },
  reducers: {
    setUserData (state, action) {
      state.email = action.payload.email
      state.password = action.payload.password
      state.username = action.payload.username
    },
    setIds (state, action) {
      state.sessionid = action.payload.sessionid
      state.id = action.payload.id
    },
    clearState (state) {
      state.username = 'User'
      state.email = ''
      state.password = ''
      state.error = ''
    },
    catchError (state, action) {
      state.error = action.payload.error
    },
    clearId (state) {
      state.sessionid = ''
    },
  },
})

export const fetchCreateUser = createAsyncThunk('fetch/createUser', async (UserData, thunkAPI) => {
  try {
    const { data } = await axios({
      method: 'post',
      url: 'https://api.m3o.com/v1/user/Create',
      headers: {
        Authorization: 'Bearer MDk4YTJjOWUtOWE3MS00NDc3LWExYjktMGYwNDg0YWUzZThk',
      },
      data: {
        email: UserData.email,
        password: UserData.password,
        username: UserData.name,
      },
    })
    thunkAPI.dispatch(formSlice.actions.setUserData({
      email: data.account.email,
      password: UserData.password,
      username: data.account.username,
    }))
  } catch (error) {
    console.log(error)
    thunkAPI.dispatch(formSlice.actions.catchError({
      error: error.response.data.detail,
    }))
  }
})

export const fetchLoginUser = createAsyncThunk('fetch/loginUser', async (UserData, thunkAPI) => {
  try {
    const { data } = await axios({
      method: 'post',
      url: 'https://api.m3o.com/v1/user/Login',
      headers: {
        Authorization: 'Bearer MDk4YTJjOWUtOWE3MS00NDc3LWExYjktMGYwNDg0YWUzZThk',
      },
      data: {
        email: UserData.email,
        password: UserData.password,
      },
    })
    thunkAPI.dispatch(formSlice.actions.setIds({
      sessionid: data.session.id,
      id: data.session.userId,
    }))
  } catch (error) {
    console.log(error)
    thunkAPI.dispatch(formSlice.actions.catchError({
      error: error.response.data.detail,
    }))
  }
})

export const fetchUserList = createAsyncThunk('fetch/userList', async (UserData, thunkAPI) => {
  try {
    const { data } = await axios({
      method: 'post',
      url: 'https://api.m3o.com/v1/user/List',
      headers: {
        Authorization: 'Bearer MDk4YTJjOWUtOWE3MS00NDc3LWExYjktMGYwNDg0YWUzZThk',
      },
    })
    const userName = data.users.find((item) => item.email === UserData.email)
    thunkAPI.dispatch(formSlice.actions.setUserData({
      email: userName.email,
      password: UserData.password,
      username: userName.username,
    }))
  } catch (ignore) {
    console.log(ignore)
    return null
  }
})

export const fetchLogout = createAsyncThunk('fetch/logout', async (SessionId, thunkAPI) => {
  try {
    await axios({
      method: 'post',
      url: 'https://api.m3o.com/v1/user/Logout',
      headers: {
        Authorization: 'Bearer MDk4YTJjOWUtOWE3MS00NDc3LWExYjktMGYwNDg0YWUzZThk',
      },
      data: {
        sessionId: SessionId,
      },
    })
    thunkAPI.dispatch(formSlice.actions.clearId())
    thunkAPI.dispatch(formSlice.actions.clearState())
  } catch (ignore) {
    console.log(ignore)
    return null
  }
})

export const fetchDelete = createAsyncThunk('fetch/delete', async (UserId, thunkAPI) => {
  try {
    await axios({
      method: 'post',
      url: 'https://api.m3o.com/v1/user/Delete',
      headers: {
        Authorization: 'Bearer MDk4YTJjOWUtOWE3MS00NDc3LWExYjktMGYwNDg0YWUzZThk',
      },
      data: {
        id: UserId,
      },
    })
    thunkAPI.dispatch(formSlice.actions.clearState())
  } catch (ignore) {
    console.log(ignore)
    return null
  }
})

export default formSlice.reducer
