import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './uiSlice'
import cartReducer from './cartSlice'
import { userApi } from '../api/userApi'

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        cart: cartReducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefault) => getDefault().concat(userApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
