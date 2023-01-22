import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { pad } from '../../utils'

export const forecastSlice = createSlice({
  name: 'forecast',
  initialState: {
    temperature: '',
    windspeed: '',
    time: '',
    day: '',
  },
  reducers: {
    setForecast (state, action) {
      state.temperature = action.payload.temperature
      state.windspeed = action.payload.windspeed
    },
    setDate (state, action) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const date = new Date()
      const currentTime = `${pad(date.getHours(), 2)}:${pad(date.getMinutes(), 2)}:${pad(date.getSeconds(), 2)}`
      const currentDay = `${pad(date.getDate(), 2)} ${months[date.getMonth()]} ${date.getFullYear()}`
      state.time = currentTime
      state.day = currentDay
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchForecast.pending, (state) => {
      state.temperature = 'loading...'
      state.windspeed = 'loading...'
      state.time = 'loading...'
      state.day = 'loading...'
    })
  },
})

export const fetchForecast = createAsyncThunk('fetch/forecast', async (_, thunkAPI) => {
  try {
    const { data } = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=41.79&longitude=44.74&current_weather=true&timezone=auto')
    const weather = data.current_weather
    thunkAPI.dispatch(forecastSlice.actions.setForecast({
      temperature: weather.temperature,
      windspeed: weather.windspeed,
    }))
  } catch (ignore) {
    console.log(ignore)
    return null
  }
})

export const fetchDate = createAsyncThunk('fetch/date', async (_, thunkAPI) => {
  try {
    thunkAPI.dispatch(forecastSlice.actions.setDate())
  } catch (ignore) {
    console.log(ignore)
    return null
  }
})

export default forecastSlice.reducer
