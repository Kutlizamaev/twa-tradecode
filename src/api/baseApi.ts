import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../store/store'
import type { AuthResponse, DashboardResponse } from './types'

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://tradecode-local-server.vercel.app/api',
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState
            const token = state.session.token

            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ['User', 'Session', 'Dashboard'],
    endpoints: (build) => ({
        authTelegram: build.mutation<AuthResponse, { initData: string }>({
            query: (body) => ({
                url: '/auth-telegram',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['User', 'Session', 'Dashboard'],
        }),
        getDashboard: build.query<DashboardResponse, void>({
            query: () => '/dashboard',
            providesTags: ['Dashboard'],
        }),
    }),
})

export const { useAuthTelegramMutation, useGetDashboardQuery } = baseApi
