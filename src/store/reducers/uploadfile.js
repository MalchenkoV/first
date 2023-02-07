import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { toFormData } from 'axios'
import ky from 'ky'

export const uploadSlice = createSlice({
  name: 'upload',
  initialState: {
    serverUrl: '',
    sessId: '',
    fileList: [],
  },
  reducers: {
    setServerData (state, action) {
      state.serverUrl = action.payload.serverUrl
      state.sessId = action.payload.sessId
    },
    setFileList (state, action) {
      state.fileList = action.payload.fileList
    },
  },
})

export const fetchServerUrl = createAsyncThunk('fetch/serverurl', async (_, thunkAPI) => {
  try {
    const api = ky.extend({
      hooks: {
        beforeRequest: [
          (request) => {
            request.headers.set('Access-Control-Allow-Origin', '*')
          },
        ],
      },
    })

    const data = await api.get('https://api-v2.ddownload.com/api/upload/server?key=3319874tcf2ywwk4lcosrb').json()
    thunkAPI.dispatch(uploadSlice.actions.setServerData({
      serverUrl: data.result,
      sessId: data.sess_id,
    }))
  } catch (error) {
    console.log(error)
  }
})

export const fetchUploadFile = createAsyncThunk('fetch/uploadfile', async (ServerData, thunkAPI) => {
  try {
    const data = await ky.post(`${ServerData.url}?sess_id=${ServerData.sessId}&utype=prem`, { data: toFormData(ServerData.file) }).json()
    console.log(ServerData)
  } catch (ignore) {
    console.log(ignore)
    return null
  }
})

export const fetchFileList = createAsyncThunk('fetch/fileList', async (_, thunkAPI) => {
  try {
    const data = await ky.get('https://api-v2.ddownload.com/api/file/list?key=3319874tcf2ywwk4lcosrb')
    thunkAPI.dispatch(uploadSlice.actions.setFileList(data))
  } catch (ignore) {
    console.log(ignore)
    return null
  }
})

export const fetchConverter = createAsyncThunk('fetch/converter', async (_, thunkAPI) => {
  try {
    const data = await ky.get()
  } catch (ignore) {
    console.log(ignore)
    return null
  }
})

export default uploadSlice.reducer
