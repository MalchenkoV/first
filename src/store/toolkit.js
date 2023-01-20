import { createSlice } from '@reduxjs/toolkit'

const newsSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
  },
  reducers: {
    addNewsFunc (state, action) {
      return {
        articles: [action.payload],
      }
    },
  },
})

export const { addNewsFunc } = newsSlice.actions

export default newsSlice.reducer
