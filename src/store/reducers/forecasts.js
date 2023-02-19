/* eslint-disable max-len */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ky from 'ky'

import { pad } from '../../utils'

export const forecastSlice = createSlice({
  name: 'forecast',
  initialState: {
    temperature: '',
    windspeed: '',
    time: '',
    day: '',
    city: '',
    latitude: '',
    longitude: '',
    sunrise: '',
    sunset: '',
    earthquakes: '',
  },
  reducers: {
    setForecast (state, action) {
      state.temperature = action.payload.temperature
      state.windspeed = action.payload.windspeed
    },
    setSuntimes (state, action) {
      state.sunrise = (Number(action.payload.sunrise.slice(0, -9)) + 4) + (action.payload.sunrise.slice(-9, action.payload.sunrise.length))
      state.sunset = (Number(action.payload.sunset.slice(0, -9)) + 4) + (action.payload.sunset.slice(-9, action.payload.sunset.length))
    },
    setDate (state) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const date = new Date()
      const currentTime = `${pad(date.getHours(), 2)}:${pad(date.getMinutes(), 2)}:${pad(date.getSeconds(), 2)}`
      const currentDay = `${pad(date.getDate(), 2)} ${months[date.getMonth()]} ${date.getFullYear()}`
      state.time = currentTime
      state.day = currentDay
    },
    setLocation (state, action) {
      state.city = action.payload.city
      state.latitude = action.payload.latitude
      state.longitude = action.payload.longitude
    },
    setCountEarthquakes (state, action) {
      state.earthquakes = action.payload.earthquakes
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchForecast.pending, (state) => {
      state.temperature = 'loading...'
      state.windspeed = 'loading...'
      state.time = 'loading...'
      state.day = 'loading...'
      state.earthquakes = 'loading...'
      state.sunrise = 'loading...'
      state.sunset = 'loading...'
    })
  },
})

export const fetchLocation = createAsyncThunk('fetch/location', async (_, thunkAPI) => {
  try {
    const data = await ky.get('https://ipgeolocation.abstractapi.com/v1/?api_key=e25e2c9dd85d461e8f2c79dcac6b978f').json()
    thunkAPI.dispatch(forecastSlice.actions.setLocation({
      city: data.city,
      latitude: data.latitude,
      longitude: data.longitude,
    }))
  } catch (ignore) {
    console.log(ignore)
    return null
  }
})

export const fetchForecast = createAsyncThunk('fetch/forecast', async (userLocation, thunkAPI) => {
  try {
    const data = await ky.get(`https://api.open-meteo.com/v1/forecast?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&current_weather=true&timezone=auto`).json()
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

export const fetchSuntimes = createAsyncThunk('fetch/suntimes', async (userLocation, thunkAPI) => {
  try {
    const data = await ky.get(`https://api.sunrise-sunset.org/json?lat=${userLocation.latitude}&lng=${userLocation.longitude}`).json()
    thunkAPI.dispatch(forecastSlice.actions.setSuntimes({
      sunrise: data.results.sunrise,
      sunset: data.results.sunset,
    }))
  } catch (ignore) {
    console.log(ignore)
    return null
  }
})

export const fetchEarthquakes = createAsyncThunk('fetch/earthquakes', async (userLocation, thunkAPI) => {
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

    const data = await api.get(`https://earthquake.usgs.gov/fdsnws/event/1/count?format=geojson&latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&maxradiuskm=500&minmagnitude=5`).json()
    console.log(data)
    thunkAPI.dispatch(forecastSlice.actions.setCountEarthquakes({
      earthquakes: data.count,
    }))
  } catch (error) {
    console.log(error)
    return null
  }
})

export default forecastSlice.reducer
