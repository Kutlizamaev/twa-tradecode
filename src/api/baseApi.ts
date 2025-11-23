import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../store/store'
import type { AuthResponse } from './types'

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/',
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState
            const token = state.session.token

            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ['User', 'Session'],
    endpoints: (build) => ({
        authTelegram: build.mutation<AuthResponse, { initData: string }>({
            query: (body) => ({
                url: '/auth/telegram',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['User', 'Session'],
        }),
    }),
})

export const { useAuthTelegramMutation } = baseApi
