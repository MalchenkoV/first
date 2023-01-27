import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const librarySlice = createSlice({
  name: 'library',
  initialState: {
    books: [],
  },
  reducers: {
    setPopularBooks (state, action) {
      state.books = action.payload
    },
    clearState (state, action) {
      state.books = []
    },
    setSearchResults (state, action) {
      state.books = action.payload
    },
  },
})

export const fetchPopularBooks = createAsyncThunk('fetch/popularBooks', async (PageNumber, thunkApi) => {
  try {
    const { data } = await axios.get(`https://gutendex.com/books?page=${PageNumber}`)
    const popularBooks = []
    for (const key in data.results) {
      popularBooks.push({
        title: data.results[key].title,
        image: data.results[key].formats['image/jpeg'],
        id: data.results[key].id,
      })
    }
    thunkApi.dispatch(librarySlice.actions.setPopularBooks(popularBooks))
  } catch (ignore) {
    console.log(ignore)
    return null
  }
})

export const fetchSearchResults = createAsyncThunk('fetch/searchResults', async (SearchParams, thunkApi) => {
  try {
    const { data } = await axios.get(`https://gutendex.com/books?page=${SearchParams.pageNumber}&search=${SearchParams.searchLineValue}`)
    console.log(data)
    const searchResults = []
    for (const key in data.results) {
      searchResults.push({
        title: data.results[key].title,
        image: data.results[key].formats['image/jpeg'],
        id: data.results[key].id,
      })
    }
    thunkApi.dispatch(librarySlice.actions.setSearchResults(searchResults))
  } catch (ignore) {
    console.log(ignore)
    return null
  }
})

export default librarySlice.reducer
