import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const holidaysSlice = createSlice({
  name: 'holidays',
  initialState: {
    // todo
  },
  reducers: {
    setHolidays (state, action) {
      // todo
    },
  },
})

// todo почитать про createAsyncThunk
// todo почитать про try catch
export const fetchHolidays = createAsyncThunk('fetch/holidays', async (_, thunkAPI) => {
  // todo
})

export default holidaysSlice.reducer
