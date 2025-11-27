import {
    createSlice,
    createSelector,
    type PayloadAction,
} from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'

export type PlanType = 7 | 30

export type CartItem = {
    subscriptionId: string
    serviceId: string
    userName: string
    uid: string
    plan: PlanType
    price: number
}

type CartState = {
    items: Record<string, CartItem | undefined>
}

const initialState: CartState = {
    items: {},
}

type ToggleSelectionPayload = {
    subscriptionId: string
    serviceId: string
    userName: string
    uid: string
    plan: PlanType
    price: number
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleSelection(state, action: PayloadAction<ToggleSelectionPayload>) {
            const { subscriptionId, plan } = action.payload
            const existing = state.items[subscriptionId]

            if (existing && existing.plan === plan) {
                delete state.items[subscriptionId]
                return
            }

            state.items[subscriptionId] = action.payload
        },
        clearCart(state) {
            state.items = {}
        },
    },
})

export const { toggleSelection, clearCart } = cartSlice.actions

const selectCartItemsMap = (state: RootState) => state.cart.items

export const selectCartItems = createSelector(
    [selectCartItemsMap],
    (itemsMap) =>
        Object.values(itemsMap).filter((item): item is CartItem => !!item)
)

export const selectCartSummary = createSelector(
    [selectCartItemsMap],
    (itemsMap) => {
        const items = Object.values(itemsMap).filter(
            (item): item is CartItem => !!item
        )

        const selectedUsers = items.length
        const totalPrice = items.reduce((sum, item) => sum + item.price, 0)

        return { selectedUsers, totalPrice }
    }
)

export default cartSlice.reducer
