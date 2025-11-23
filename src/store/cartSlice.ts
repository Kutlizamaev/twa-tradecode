import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CartItem, CartState } from '../api/types'

const initialState: CartState = {
    items: [],
}

function createCartItemId() {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(
            state,
            action: PayloadAction<Omit<CartItem, 'id'> & { id?: string }>
        ) {
            const { id, ...rest } = action.payload
            state.items.push({
                id: id ?? createCartItemId(),
                ...rest,
            })
        },
        updateItem(
            state,
            action: PayloadAction<{ id: string; changes: Partial<CartItem> }>
        ) {
            const item = state.items.find((i) => i.id === action.payload.id)
            if (item) {
                Object.assign(item, action.payload.changes)
            }
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter((i) => i.id !== action.payload)
        },
        clearCart(state) {
            state.items = []
        },
    },
})

export const { addItem, updateItem, removeItem, clearCart } = cartSlice.actions

export default cartSlice.reducer
