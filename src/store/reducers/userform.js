import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const formSlice = createSlice({
  name: 'forms',
  initialState: {
    email: '',
    password: '',
    username: 'User',
    sessionid: '',
  },
  reducers: {
    setUserData (state, action) {
      state.email = action.payload.email
      state.password = action.payload.password
      state.username = action.payload.username
    },
    setSessionId (state, action) {
      state.sessionid = action.payload.sessionid
    },
    setInitialUser (state, action) {
      state.username = 'User'
    },
  },
})

export const fetchCreateUser = createAsyncThunk('fetch/createUser', async (UserData) => {
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
        username: UserData.username,
      },
    })
  } catch (ignore) {
    console.log(ignore)
    return null
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
    thunkAPI.dispatch(formSlice.actions.setSessionId({
      sessionid: data.session.id,
    }))
  } catch (ignore) {
    console.log(ignore)
    return null
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
      data: {
        limit: 100,
        offset: 0,
      },
    })
    console.log(data)
    const userName = data.find((item) => item.email === UserData.email)
    thunkAPI.dispatch(formSlice.actions.setUserData({
      email: userName.email,
      password: userName.password,
      username: userName.username,
    }))
  } catch (ignore) {
    console.log(ignore)
    return null
  }
})

export const fetchLogout = createAsyncThunk('fetch/logout', async (SessionId, thunkAPI) => {
  try {
    const { data } = await axios({
      method: 'post',
      url: 'https://api.m3o.com/v1/user/Logout',
      headers: {
        Authorization: 'Bearer MDk4YTJjOWUtOWE3MS00NDc3LWExYjktMGYwNDg0YWUzZThk',
      },
      data: {
        sessionId: SessionId,
      },
    })
    thunkAPI.dispatch(formSlice.actions.setInitialUser())
  } catch (ignore) {
    console.log(ignore)
    return null
  }
})

export default formSlice.reducer
