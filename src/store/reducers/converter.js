import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import ky from 'ky'

export const convertSlice = createSlice({
  name: 'convert',
  initialState: {
    taskStartId: '',
    taskFinishId: '',
    taskUrl: '',
  },
  reducers: {
    setStartId (state, action) {
      state.taskStartId = action.payload
    },
    setFinishId (state, action) {
      state.taskFinishId = action.payload
    },
    setUrl (state, action) {
      state.taskUrl = action.payload
    },
  },
})

export const fetchUpload = createAsyncThunk('fetch/upload', async (File, thunkAPI) => {
  try {
    // eslint-disable-next-line no-undef
    const formData = new FormData()
    formData.append('fileData', File)
    const data = await axios({
      method: 'post',
      url: 'https://api.cloudconvert.com/v2/import/upload',
      headers: {
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzljNTAyZDQzNzUwMDRkNzYxMDhhN2U5NTlmYjFiZTdlNTQ4YWIxZTAwYzY2NDJkYzc4M2Y2OWI5NTc0MDVkOWNhZTU4ZTZlZmE1YjBkMTEiLCJpYXQiOjE2NzYxNDYwMDIuMDU1NjcxLCJuYmYiOjE2NzYxNDYwMDIuMDU1NjcyLCJleHAiOjQ4MzE4MTk2MDIuMDUwMjg5LCJzdWIiOiI2MjA5NjQ1MCIsInNjb3BlcyI6WyJ0YXNrLndyaXRlIiwidGFzay5yZWFkIl19.SFCAdHa4X4SJpqhITlsqepJloKhPHWV8IeGyzgLXZk3RLZuPZveRBVV9i9Jt_jMeXde9FoiLnDh0a5NH-05VwR0W1JF86dbrTtZQEBkXq93MaqHImJJ-TrnqbtCrI14dWciZ383hE1JjsaS7rFIdHbDQJZL9v9XCoU9gHzgZUYJx1PhvSVvaJ4dkQOxkgjPI1Li0aJ27HhRPTesmRMXIHgGH1P4o2N1eR4155UqPoEyHkubCuw7x9IlkDKUTA8gmQ4Ddipfwv_h0OTt6PnJ-BhWHGT21NE1bhbzi-BRefMEiQ3W3OJtPfq3kbhza6_tK56HspTcbO1Id3klymPh5IKx7ZHmP-a663VN-E0t0KlDf7bUUba3Ag2Ojq_Cn5I9jWMRkSQlHk-0gC9ksnS_wlwEgpVChPQ9ptyrb1LpRC3RAkGEQ75w2Xg3cdsuQLYJt6xJOKIDEtIIEPq-Jw8rbKFaMVjRmvxDhko-FraHqtlk4kMQl2wImNKtV5mMxDlOGfGS970IvqC8Hkil-cWyFx30ym2jWzbkFLGicdjAipQy2Q8Ai0cu6oOYiyMlDVmWA_0a72iU6_NF5MRNFN40fQ3wX-TPUMI76i9aOttzQO5lSCEmTyPYA6VykxQEHs3id3QqGEP8CAGLwrpMndGLCj3U6Ig3qGfAmPoGu4yeTJcs',
      },
      data: formData,
    })
    console.log(data)
    // thunkAPI.dispatch(convertSlice.actions.setStartId())
  } catch (ignore) {
    console.log(ignore)
    return null
  }
})

export const fetchFormats = createAsyncThunk('fetch/formats', async (InputFormat, thunkAPI) => {
  try {
    const data = await ky.get(`https://api.cloudconvert.com/v2/convert/formats?filter[input_format]=${InputFormat}`).json()
    console.log(data)
  } catch (ignore) {
    console.log(ignore)
    return null
  }
})

export const fetchConvert = createAsyncThunk('fetch/convert', async (ConvertDetails, thunkAPI) => {
  try {
    const data = await axios({
      method: 'post',
      url: 'https://api.cloudconvert.com/v2/convert',
      headers: {
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzljNTAyZDQzNzUwMDRkNzYxMDhhN2U5NTlmYjFiZTdlNTQ4YWIxZTAwYzY2NDJkYzc4M2Y2OWI5NTc0MDVkOWNhZTU4ZTZlZmE1YjBkMTEiLCJpYXQiOjE2NzYxNDYwMDIuMDU1NjcxLCJuYmYiOjE2NzYxNDYwMDIuMDU1NjcyLCJleHAiOjQ4MzE4MTk2MDIuMDUwMjg5LCJzdWIiOiI2MjA5NjQ1MCIsInNjb3BlcyI6WyJ0YXNrLndyaXRlIiwidGFzay5yZWFkIl19.SFCAdHa4X4SJpqhITlsqepJloKhPHWV8IeGyzgLXZk3RLZuPZveRBVV9i9Jt_jMeXde9FoiLnDh0a5NH-05VwR0W1JF86dbrTtZQEBkXq93MaqHImJJ-TrnqbtCrI14dWciZ383hE1JjsaS7rFIdHbDQJZL9v9XCoU9gHzgZUYJx1PhvSVvaJ4dkQOxkgjPI1Li0aJ27HhRPTesmRMXIHgGH1P4o2N1eR4155UqPoEyHkubCuw7x9IlkDKUTA8gmQ4Ddipfwv_h0OTt6PnJ-BhWHGT21NE1bhbzi-BRefMEiQ3W3OJtPfq3kbhza6_tK56HspTcbO1Id3klymPh5IKx7ZHmP-a663VN-E0t0KlDf7bUUba3Ag2Ojq_Cn5I9jWMRkSQlHk-0gC9ksnS_wlwEgpVChPQ9ptyrb1LpRC3RAkGEQ75w2Xg3cdsuQLYJt6xJOKIDEtIIEPq-Jw8rbKFaMVjRmvxDhko-FraHqtlk4kMQl2wImNKtV5mMxDlOGfGS970IvqC8Hkil-cWyFx30ym2jWzbkFLGicdjAipQy2Q8Ai0cu6oOYiyMlDVmWA_0a72iU6_NF5MRNFN40fQ3wX-TPUMI76i9aOttzQO5lSCEmTyPYA6VykxQEHs3id3QqGEP8CAGLwrpMndGLCj3U6Ig3qGfAmPoGu4yeTJcs',
      },
      data: {
        input: ConvertDetails.startId,
        output_format: '',
      },
    })
    console.log(data)
    // thunkAPI.dispatch(convertSlice.actions.setFinishId())
  } catch (ignore) {
    console.log(ignore)
    return null
  }
})

export const fetchDownload = createAsyncThunk('fetch/download', async (FinishId, thunkAPI) => {
  try {
    const data = await axios({
      method: 'post',
      url: 'https://api.cloudconvert.com/v2/export/url',
      headers: {
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzljNTAyZDQzNzUwMDRkNzYxMDhhN2U5NTlmYjFiZTdlNTQ4YWIxZTAwYzY2NDJkYzc4M2Y2OWI5NTc0MDVkOWNhZTU4ZTZlZmE1YjBkMTEiLCJpYXQiOjE2NzYxNDYwMDIuMDU1NjcxLCJuYmYiOjE2NzYxNDYwMDIuMDU1NjcyLCJleHAiOjQ4MzE4MTk2MDIuMDUwMjg5LCJzdWIiOiI2MjA5NjQ1MCIsInNjb3BlcyI6WyJ0YXNrLndyaXRlIiwidGFzay5yZWFkIl19.SFCAdHa4X4SJpqhITlsqepJloKhPHWV8IeGyzgLXZk3RLZuPZveRBVV9i9Jt_jMeXde9FoiLnDh0a5NH-05VwR0W1JF86dbrTtZQEBkXq93MaqHImJJ-TrnqbtCrI14dWciZ383hE1JjsaS7rFIdHbDQJZL9v9XCoU9gHzgZUYJx1PhvSVvaJ4dkQOxkgjPI1Li0aJ27HhRPTesmRMXIHgGH1P4o2N1eR4155UqPoEyHkubCuw7x9IlkDKUTA8gmQ4Ddipfwv_h0OTt6PnJ-BhWHGT21NE1bhbzi-BRefMEiQ3W3OJtPfq3kbhza6_tK56HspTcbO1Id3klymPh5IKx7ZHmP-a663VN-E0t0KlDf7bUUba3Ag2Ojq_Cn5I9jWMRkSQlHk-0gC9ksnS_wlwEgpVChPQ9ptyrb1LpRC3RAkGEQ75w2Xg3cdsuQLYJt6xJOKIDEtIIEPq-Jw8rbKFaMVjRmvxDhko-FraHqtlk4kMQl2wImNKtV5mMxDlOGfGS970IvqC8Hkil-cWyFx30ym2jWzbkFLGicdjAipQy2Q8Ai0cu6oOYiyMlDVmWA_0a72iU6_NF5MRNFN40fQ3wX-TPUMI76i9aOttzQO5lSCEmTyPYA6VykxQEHs3id3QqGEP8CAGLwrpMndGLCj3U6Ig3qGfAmPoGu4yeTJcs',
      },
      data: {
        input: FinishId,
      },
    })
    console.log(data)
    // thunkAPI.dispatch(convertSlice.actions.setUrl())
  } catch (ignore) {
    console.log(ignore)
    return null
  }
})

export default convertSlice.reducer
