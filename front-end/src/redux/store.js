import {  configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import ProductSlice from "./productSlice.jsx"

import {

  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'



const persistConfig = {
  key: 'Ekart',
  version: 1,
  storage,
}

const rootReducer=combineReducers({
    user:userSlice,
    product:ProductSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  user:userSlice,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export default store