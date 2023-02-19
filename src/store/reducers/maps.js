import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ky from 'ky'

export const mapsSlice = createSlice({
  name: 'maps',
  initialState: {
    latitude: '',
    longitude: '',
  },
  reducers: {
    setLocation (state, action) {
      state.latitude = action.payload.latitude
      state.longitude = action.payload.longitude
    },
  },
})

export const fetchLocation = createAsyncThunk('fetch/location', async (_, thunkAPI) => {
  try {
    const data = await ky.get('https://ipgeolocation.abstractapi.com/v1/?api_key=e25e2c9dd85d461e8f2c79dcac6b978f').json()
    thunkAPI.dispatch(mapsSlice.actions.setLocation({
      latitude: data.latitude,
      longitude: data.longitude,
    }))
  } catch (ignore) {
    console.log(ignore)
    return null
  }
})

export default mapsSlice.reducer
