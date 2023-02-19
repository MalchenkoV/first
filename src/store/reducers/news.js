import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ky from 'ky'

export const newsSlice = createSlice({
  name: 'news',
  initialState: {
    title: '',
    url: '',
    articles: [],
    lastFetchAt: '',
  },
  reducers: {
    setNewsTitle (state, action) {
      state.title = action.payload.title
      state.url = action.payload.url
    },
    addNewsFunc (state, action) {
      const newsForAdd = []

      action.payload.forEach((item) => {
        const foundItem = state.articles.find((current) => current.title === item.title)
        if (!foundItem) {
          newsForAdd.push(item)
        }
      })

      state.articles = [...state.articles, ...newsForAdd]
      state.lastFetchAt = Date.now()
    },
    clearState (state) {
      state.articles = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state) => {
      state.title = 'loading...'
      state.url = 'loading...'
    })
  },
})

export const fetchNews = createAsyncThunk('fetch/news', async (_, thunkAPI) => {
  try {
    const data = await ky.get('https://content.guardianapis.com/uk-news?api-key=a04d1215-c861-4577-bb98-eacebf2194f9&show-blocks=body:latest:10').json()

    const news = []
    for (const key in data.response.results) {
      news.push({
        title: data.response.results[key].webTitle,
        url: data.response.results[key].webUrl,
      })
    }

    thunkAPI.dispatch(newsSlice.actions.addNewsFunc(news))

    const title = data.response.edition
    thunkAPI.dispatch(newsSlice.actions.setNewsTitle({
      title: title.webTitle,
      url: title.webUrl,
    }))
  } catch (ignore) {
    console.log(ignore)
    return null
  }
})

export default newsSlice.reducer
