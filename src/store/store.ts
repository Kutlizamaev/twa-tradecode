import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '../api/baseApi'
import sessionReducer from './sessionSlice'
import cartReducer from './cartSlice'

export const store = configureStore({
    reducer: {
        session: sessionReducer,
        cart: cartReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
