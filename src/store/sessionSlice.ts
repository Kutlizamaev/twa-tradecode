import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../api/types'

interface SessionState {
    token: string | null
    user: User | null
}

const initialState: SessionState = {
    token: null,
    user: null,
}

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<{ token: string; user: User }>) {
            state.token = action.payload.token
            state.user = action.payload.user
        },
        clearSession(state) {
            state.token = null
            state.user = null
        },
    },
})

export const { setAuth, clearSession } = sessionSlice.actions
export default sessionSlice.reducer
