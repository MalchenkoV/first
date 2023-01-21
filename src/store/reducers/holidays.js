import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getHolidays } from '../../api'
import { pad } from '../../utils'

export const holidaysSlice = createSlice({
  name: 'holidays',
  initialState: {
    holidays: '',
  },
  reducers: {
    setHolidays (state, action) {
      const date = new Date()
      const dateFormat = `${date.getFullYear()}-${pad((date.getMonth() + 1), 2)}-${pad(date.getDate(), 2)}`
      const holidayItem = action.payload.find((item) => item.date === dateFormat)

      state.holidays = holidayItem ? holidayItem.name : 'Just ordinary day:('
    },
  },
})

// todo почитать про createAsyncThunk
// todo почитать про try catch
export const fetchHolidays = createAsyncThunk('fetch/holidays', async (_, thunkAPI) => {
  try {
    const { data } = await getHolidays()

    thunkAPI.dispatch(holidaysSlice.actions.setHolidays(data))
  } catch (ignore) {
    console.log(ignore)
    return null
  }
})

export default holidaysSlice.reducer
