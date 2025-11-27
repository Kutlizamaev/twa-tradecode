import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '../api/baseApi'
import cartReducer from '../features/cart/cartSlice'
import subscriptionsReducer from '../features/subscriptions/subscriptionsSlice'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        subscriptions: subscriptionsReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
