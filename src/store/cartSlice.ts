import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface CartItem {
    id: number
    title: string
    price: number
    quantity: number
}

type CartState = {
    items: CartItem[]
}

const initialState: CartState = {
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            state.items.push(action.payload)
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((i) => i.id !== action.payload)
        },
    },
})

export const { addItem, removeItem } = cartSlice.actions
export default cartSlice.reducer
