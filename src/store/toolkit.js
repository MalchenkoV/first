import { createSlice } from '@reduxjs/toolkit'

const newsSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
  },
  reducers: {
    addNewsFunc (state, action) {
      state.articles = [...state.articles, ...action.payload]
    },
    clearState (state, action) {
      state.articles = []
    },
  },
})

export const { addNewsFunc, clearState, filterArticles } = newsSlice.actions

export default newsSlice.reducer
