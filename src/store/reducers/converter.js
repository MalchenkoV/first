import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import ky from 'ky'

export const convertSlice = createSlice({
  name: 'convert',
  initialState: {
    taskImportId: '',
    taskConvertId: '',
    taskUrl: '',
    formatsList: [],
    taskStatus: '',
    urlTitle: 'There should be the link',
  },
  reducers: {
    setImportId (state, action) {
      state.taskImportId = action.payload
    },
    setConvertId (state, action) {
      state.taskConvertId = action.payload
    },
    setUrl (state, action) {
      state.taskUrl = action.payload
    },
    setFormatsList (state, action) {
      state.formatsList = action.payload
    },
    setTaskStatus (state, action) {
      state.taskStatus = action.payload
    },
    clearState (state) {
      state.taskImportId = ''
      state.taskConvertId = ''
      state.taskStatus = ''
      state.formatsList = []
      state.taskUrl = ''
      state.urlTitle = 'There should be the link'
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTaskStatus.pending, (state) => {
      state.urlTitle = 'loading...'
    })
    builder.addCase(fetchTaskStatus.fulfilled, (state) => {
      state.urlTitle = 'Push me'
    })
  },
})

export const fetchUpload = createAsyncThunk('fetch/upload', async (File, thunkAPI) => {
  try {
    // eslint-disable-next-line no-undef
    const formData = new FormData()
    formData.append('fileData', File)
    const { data } = await axios({
      method: 'post',
      url: 'https://api.cloudconvert.com/v2/import/upload',
      headers: {
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMTk1NDhiMTIxMTE4MzRkNTc0MjM2YjIxNDRlMGRmNDAyNWMwMzA0NzVjNGU1YzJhZjUyNzAxYjQxMTVmMzRmZTdlY2FmMTVkNjViYTJkZTIiLCJpYXQiOjE2NzYyMjQ3NDkuMDMwMzM1LCJuYmYiOjE2NzYyMjQ3NDkuMDMwMzM2LCJleHAiOjQ4MzE4OTgzNDkuMDIyNjE0LCJzdWIiOiI2MjA5NjQ1MCIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.Hho8HuRkc1muzWp248_CymULgCQeWpy5zavBqCKerNusamoYXfSJ8hU-XrtjwM0X1jfyEgziRjdMTcf6OLsZM_Oh43eKECn1QJrAvjlBXtZeZDULiT6WH91E96XPiMrPN3dUjwZeLDojwhsB5NmTE2jxhQd0bJ_hjk6Hw-lDFmcWwm0y3mDLloTCte_I02QvNYvmeOvOFtypQ0XzorkYjqH_VKj1iL11OA12bBzBKHIBLcPUtSp-pZTYREEc5f4WuqTR63r_T7hEInjnpzrv8mClLrzCmNdE3ET9jaVSY_Fm9nkXEl-pYOY0KgxnQSHNgZHskQiJbSxoeOrsHTAP1eKbxudoxUoowtBAwjARNwVWkk-W2_My5HrerIvSLkm_qZeil0sJQc3Dp-kEo0JKikw5jz3nUp194egdnBIxFb0_ZYGBNKUazrD_5coM4Dg12fh4qgkjKAPtbceMpa5V3j038SBGeuzYroNehTCip9vbws-u4nx5FTA8CMaFErRYsyjkJGbVYEe_PWxJ8RAGVHK6bUV9xBoS8o8uZebB7QGYWtzCO3nfr28SjLS8P0Vir9hj2J7zomeOrhvbfNLPE59uOKc-MonJg-WQ9VddZJfUtYeoV-5omjTQ2vrFblKyhJ7WYyegh1fk_jpjvhEtuVtgmrZrwSsRe1OLSKmU3g8',
      },
      data: formData,
    })
    console.log(data.data.data.id)
    thunkAPI.dispatch(convertSlice.actions.setImportId(data.data.data.id))
  } catch (ignore) {
    console.log(ignore)
    return null
  }
})

export const fetchFormats = createAsyncThunk('fetch/formats', async (InputFormat, thunkAPI) => {
  try {
    const data = await ky.get(`https://api.cloudconvert.com/v2/convert/formats?filter[input_format]=${InputFormat}`).json()
    console.log(data)
    const formats = []
    for (const key in data.data) {
      formats.push({
        to_format: data.data[key].output_format,
      })
    }
    console.log(data.data)
    thunkAPI.dispatch(convertSlice.actions.setFormatsList(formats))
  } catch (ignore) {
    console.log(ignore)
    return null
  }
})

export const fetchConvert = createAsyncThunk('fetch/convert', async (ConvertDetails, thunkAPI) => {
  try {
    const { data } = await axios({
      method: 'post',
      url: 'https://api.cloudconvert.com/v2/convert',
      headers: {
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMTk1NDhiMTIxMTE4MzRkNTc0MjM2YjIxNDRlMGRmNDAyNWMwMzA0NzVjNGU1YzJhZjUyNzAxYjQxMTVmMzRmZTdlY2FmMTVkNjViYTJkZTIiLCJpYXQiOjE2NzYyMjQ3NDkuMDMwMzM1LCJuYmYiOjE2NzYyMjQ3NDkuMDMwMzM2LCJleHAiOjQ4MzE4OTgzNDkuMDIyNjE0LCJzdWIiOiI2MjA5NjQ1MCIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.Hho8HuRkc1muzWp248_CymULgCQeWpy5zavBqCKerNusamoYXfSJ8hU-XrtjwM0X1jfyEgziRjdMTcf6OLsZM_Oh43eKECn1QJrAvjlBXtZeZDULiT6WH91E96XPiMrPN3dUjwZeLDojwhsB5NmTE2jxhQd0bJ_hjk6Hw-lDFmcWwm0y3mDLloTCte_I02QvNYvmeOvOFtypQ0XzorkYjqH_VKj1iL11OA12bBzBKHIBLcPUtSp-pZTYREEc5f4WuqTR63r_T7hEInjnpzrv8mClLrzCmNdE3ET9jaVSY_Fm9nkXEl-pYOY0KgxnQSHNgZHskQiJbSxoeOrsHTAP1eKbxudoxUoowtBAwjARNwVWkk-W2_My5HrerIvSLkm_qZeil0sJQc3Dp-kEo0JKikw5jz3nUp194egdnBIxFb0_ZYGBNKUazrD_5coM4Dg12fh4qgkjKAPtbceMpa5V3j038SBGeuzYroNehTCip9vbws-u4nx5FTA8CMaFErRYsyjkJGbVYEe_PWxJ8RAGVHK6bUV9xBoS8o8uZebB7QGYWtzCO3nfr28SjLS8P0Vir9hj2J7zomeOrhvbfNLPE59uOKc-MonJg-WQ9VddZJfUtYeoV-5omjTQ2vrFblKyhJ7WYyegh1fk_jpjvhEtuVtgmrZrwSsRe1OLSKmU3g8',
      },
      data: {
        input: ConvertDetails.taskImportId,
        input_format: ConvertDetails.inputValue,
        output_format: ConvertDetails.outputValue,
      },
    })
    console.log(data.data.data.id)
    thunkAPI.dispatch(convertSlice.actions.setConvertId(data.data.data.id))
  } catch (ignore) {
    console.log(ignore)
    return null
  }
})

export const fetchTaskStatus = createAsyncThunk('fetch/taskstatus', async (TaskConvertId, thunkAPI) => {
  try {
    const { data } = await axios({
      method: 'get',
      url: `https://api.cloudconvert.com/v2/tasks/${TaskConvertId}/wait`,
      headers: {
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMTk1NDhiMTIxMTE4MzRkNTc0MjM2YjIxNDRlMGRmNDAyNWMwMzA0NzVjNGU1YzJhZjUyNzAxYjQxMTVmMzRmZTdlY2FmMTVkNjViYTJkZTIiLCJpYXQiOjE2NzYyMjQ3NDkuMDMwMzM1LCJuYmYiOjE2NzYyMjQ3NDkuMDMwMzM2LCJleHAiOjQ4MzE4OTgzNDkuMDIyNjE0LCJzdWIiOiI2MjA5NjQ1MCIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.Hho8HuRkc1muzWp248_CymULgCQeWpy5zavBqCKerNusamoYXfSJ8hU-XrtjwM0X1jfyEgziRjdMTcf6OLsZM_Oh43eKECn1QJrAvjlBXtZeZDULiT6WH91E96XPiMrPN3dUjwZeLDojwhsB5NmTE2jxhQd0bJ_hjk6Hw-lDFmcWwm0y3mDLloTCte_I02QvNYvmeOvOFtypQ0XzorkYjqH_VKj1iL11OA12bBzBKHIBLcPUtSp-pZTYREEc5f4WuqTR63r_T7hEInjnpzrv8mClLrzCmNdE3ET9jaVSY_Fm9nkXEl-pYOY0KgxnQSHNgZHskQiJbSxoeOrsHTAP1eKbxudoxUoowtBAwjARNwVWkk-W2_My5HrerIvSLkm_qZeil0sJQc3Dp-kEo0JKikw5jz3nUp194egdnBIxFb0_ZYGBNKUazrD_5coM4Dg12fh4qgkjKAPtbceMpa5V3j038SBGeuzYroNehTCip9vbws-u4nx5FTA8CMaFErRYsyjkJGbVYEe_PWxJ8RAGVHK6bUV9xBoS8o8uZebB7QGYWtzCO3nfr28SjLS8P0Vir9hj2J7zomeOrhvbfNLPE59uOKc-MonJg-WQ9VddZJfUtYeoV-5omjTQ2vrFblKyhJ7WYyegh1fk_jpjvhEtuVtgmrZrwSsRe1OLSKmU3g8',
      },
    })
    console.log(data)
    thunkAPI.dispatch(convertSlice.actions.setTaskStatus(data.data.data.status))
  } catch (ignore) {
    console.log(ignore)
    return null
  }
})

export const fetchDownload = createAsyncThunk('fetch/download', async (TaskConvertId, thunkAPI) => {
  try {
    const { data } = await axios({
      method: 'post',
      url: 'https://api.cloudconvert.com/v2/export/url',
      headers: {
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMTk1NDhiMTIxMTE4MzRkNTc0MjM2YjIxNDRlMGRmNDAyNWMwMzA0NzVjNGU1YzJhZjUyNzAxYjQxMTVmMzRmZTdlY2FmMTVkNjViYTJkZTIiLCJpYXQiOjE2NzYyMjQ3NDkuMDMwMzM1LCJuYmYiOjE2NzYyMjQ3NDkuMDMwMzM2LCJleHAiOjQ4MzE4OTgzNDkuMDIyNjE0LCJzdWIiOiI2MjA5NjQ1MCIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.Hho8HuRkc1muzWp248_CymULgCQeWpy5zavBqCKerNusamoYXfSJ8hU-XrtjwM0X1jfyEgziRjdMTcf6OLsZM_Oh43eKECn1QJrAvjlBXtZeZDULiT6WH91E96XPiMrPN3dUjwZeLDojwhsB5NmTE2jxhQd0bJ_hjk6Hw-lDFmcWwm0y3mDLloTCte_I02QvNYvmeOvOFtypQ0XzorkYjqH_VKj1iL11OA12bBzBKHIBLcPUtSp-pZTYREEc5f4WuqTR63r_T7hEInjnpzrv8mClLrzCmNdE3ET9jaVSY_Fm9nkXEl-pYOY0KgxnQSHNgZHskQiJbSxoeOrsHTAP1eKbxudoxUoowtBAwjARNwVWkk-W2_My5HrerIvSLkm_qZeil0sJQc3Dp-kEo0JKikw5jz3nUp194egdnBIxFb0_ZYGBNKUazrD_5coM4Dg12fh4qgkjKAPtbceMpa5V3j038SBGeuzYroNehTCip9vbws-u4nx5FTA8CMaFErRYsyjkJGbVYEe_PWxJ8RAGVHK6bUV9xBoS8o8uZebB7QGYWtzCO3nfr28SjLS8P0Vir9hj2J7zomeOrhvbfNLPE59uOKc-MonJg-WQ9VddZJfUtYeoV-5omjTQ2vrFblKyhJ7WYyegh1fk_jpjvhEtuVtgmrZrwSsRe1OLSKmU3g8',
      },
      data: {
        input: TaskConvertId,
      },
    })
    console.log(data.data.data.links.self)
    thunkAPI.dispatch(convertSlice.actions.setUrl(data.data.data.links.self))
  } catch (ignore) {
    console.log(ignore)
    return null
  }
})

export default convertSlice.reducer
