import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'

import newsReducer from './reducers/news'
import holidaysReducer from './reducers/holidays'
import forecastReducer from './reducers/forecasts'
import libraryReducer from './reducers/library'
import userformReducer from './reducers/userform'
import uploadReducer from './reducers/uploadfile'
import mapsReducer from './reducers/maps'
import convertReducer from './reducers/converter'

const rootReducer = combineReducers({
  articles: newsReducer,
  holidays: holidaysReducer,
  forecast: forecastReducer,
  library: libraryReducer,
  userform: userformReducer,
  uploadfiles: uploadReducer,
  maps: mapsReducer,
  converter: convertReducer,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)
export default store
