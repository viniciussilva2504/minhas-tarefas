import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import tarefasReducer from './reducers/tarefas'
import filtrosReducer from './reducers/filtros'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['tarefas']
}

const rootReducer = combineReducers({
  tarefas: tarefasReducer,
  filtros: filtrosReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
})

export const persistor = persistStore(store)
export type RootReducer = ReturnType<typeof store.getState>
export default store
