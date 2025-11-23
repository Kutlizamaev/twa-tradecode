import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../store/store'
import type {
    AuthResponse,
    DashboardResponse,
    RenderingsResponse,
    SubscriptionsResponse,
} from './types'

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
    tagTypes: ['User', 'Session', 'Dashboard', 'Renderings', 'Subscriptions'],
    endpoints: (build) => ({
        authTelegram: build.mutation<AuthResponse, { initData: string }>({
            query: (body) => ({
                url: '/auth-telegram',
                method: 'POST',
                body,
            }),
            invalidatesTags: [
                'User',
                'Session',
                'Dashboard',
                'Renderings',
                'Subscriptions',
            ],
        }),
        getDashboard: build.query<DashboardResponse, void>({
            query: () => '/dashboard',
            providesTags: ['Dashboard'],
        }),
        getRenderings: build.query<RenderingsResponse, void>({
            query: () => '/renderings',
            providesTags: ['Renderings'],
        }),
        getSubscriptions: build.query<SubscriptionsResponse, void>({
            query: () => '/subscriptions',
            providesTags: ['Subscriptions'],
        }),
    }),
})

export const {
    useAuthTelegramMutation,
    useGetDashboardQuery,
    useGetRenderingsQuery,
    useGetSubscriptionsQuery,
} = baseApi
