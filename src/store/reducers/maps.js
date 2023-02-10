import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import base64 from 'base-64'
import UTF8 from 'utf-8'

export const mapsSlice = createSlice({
  name: 'maps',
  initialState: {
    latitude: '',
    longitude: '',
    image: '',
  },
  reducers: {
    setLocation (state, action) {
      state.latitude = action.payload.latitude
      state.longitude = action.payload.longitude
    },
    setMap (state, action) {
      state.image = action.payload.image
    },
  },
})

export const fetchLocation = createAsyncThunk('fetch/location', async (_, thunkAPI) => {
  try {
    const { data } = await axios.get('https://ipgeolocation.abstractapi.com/v1/?api_key=e25e2c9dd85d461e8f2c79dcac6b978f')
    thunkAPI.dispatch(mapsSlice.actions.setLocation({
      latitude: data.latitude,
      longitude: data.longitude,
    }))
  } catch (ignore) {
    console.log(ignore)
    return null
  }
})

export const fetchMaps = createAsyncThunk('fetch/maps', async (UserLocation, thunkAPI) => {
  try {
    const { data } = await axios.get(`https://dev.virtualearth.net/REST/v1/Imagery/Map/Aerial/${UserLocation.latitude},${UserLocation.longitude}/10?mapSize=400,400&pp=${UserLocation.latitude},${UserLocation.longitude};66&mapLayer=Basemap,Buildings&key=AjhFzAhsDYFZisd16U3T_Y_H8-aK2T-6b6BN_CNgA1Vj3MdLsBqgsOlPJsivlOPt`)
    const image = UTF8.setBytesFromString(data)
    const img = base64.encode(image)
    thunkAPI.dispatch(mapsSlice.actions.setMap({
      image: img,
    }))
  } catch (ignore) {
    console.log(ignore)
    return null
  }
})

export default mapsSlice.reducer
