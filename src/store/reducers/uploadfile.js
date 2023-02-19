import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
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
      state.fileList = [...state.fileList, action.payload]
    },
    clearState (state) {
      state.fileList = []
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
    // eslint-disable-next-line no-undef
    const formData = new FormData()
    formData.append('fileData', ServerData.file)
    const { data } = await axios({
      method: 'post',
      url: `${ServerData.url}?sess_id=${ServerData.sessId}&utype=prem`,
      data: formData,
    })
    thunkAPI.dispatch(uploadSlice.actions.setFileList({
      name: ServerData.file.name,
      fileCode: data.data[0].file_code,
    }))
  } catch (ignore) {
    console.log(ignore)
    return null
  }
})

export default uploadSlice.reducer
