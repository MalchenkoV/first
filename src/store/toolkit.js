import { createSlice } from '@reduxjs/toolkit'

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    news: [],
  },
  reducers: {
    addNewsFunc (state, action) {
      return {
        news: [action.payload],
      }
    },
  },
})

export const { addNewsFunc } = newsSlice.actions

export default newsSlice.reducer
