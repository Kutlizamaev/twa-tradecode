import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getTelegramWebApp } from '../telegram/webapp'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers) => {
            const tg = getTelegramWebApp()
            headers.set('X-Telegram-Init', tg?.initData ?? '')
            return headers
        },
    }),
    endpoints: (builder) => ({
        getProfile: builder.query<any, void>({
            query: () => '/user/profile',
        }),
    }),
})

export const { useGetProfileQuery } = userApi
