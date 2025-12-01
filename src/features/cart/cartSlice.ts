// src/features/cart/cartSlice.ts
import {
    createSlice,
    createSelector,
    nanoid,
    type PayloadAction,
} from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'

// такой же тип, как на подписках
export type PlanType = 7 | 30

export type CartItem = {
    id: string
    subscriptionId: string
    serviceId: string
    serviceName: string
    userName: string
    uid: string
    plan: PlanType
    price: number
    isSelected: boolean
}

type CartState = {
    items: CartItem[]
}

const initialState: CartState = {
    items: [],
}

// полезный тип для добавления из subscriptionsSlice
type AddFromSubscriptionsPayload = {
    subscriptionId: string
    serviceId: string
    serviceName: string
    userName: string
    uid: string
    plan: PlanType
    price: number
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addManyFromSubscriptions: (
            state,
            action: PayloadAction<AddFromSubscriptionsPayload[]>
        ) => {
            action.payload.forEach((s) => {
                // ищем, есть ли уже такая подписка в корзине
                const existingIndex = state.items.findIndex(
                    (item) => item.subscriptionId === s.subscriptionId
                )

                if (existingIndex === -1) {
                    // нет в корзине — добавляем новую
                    state.items.push({
                        id: nanoid(),
                        subscriptionId: s.subscriptionId,
                        serviceId: s.serviceId,
                        serviceName: s.serviceName,
                        userName: s.userName,
                        uid: s.uid,
                        plan: s.plan,
                        price: s.price,
                        isSelected: true,
                    })
                } else {
                    // уже есть — просто обновляем план/цену/данные
                    const existing = state.items[existingIndex]

                    existing.serviceId = s.serviceId
                    existing.serviceName = s.serviceName
                    existing.userName = s.userName
                    existing.uid = s.uid
                    existing.plan = s.plan
                    existing.price = s.price
                    existing.isSelected = true // можно снова отметить выбранным
                }
            })
        },

        // Выбор / снятие выбора конкретной позиции в корзине
        toggleItemSelection: (state, action: PayloadAction<string>) => {
            const id = action.payload
            const item = state.items.find((i) => i.id === id)
            if (item) {
                item.isSelected = !item.isSelected
            }
        },

        unselectAll: (state, action: PayloadAction<string>) => {
            state.items.forEach((item) => {
                if (item.serviceName === action.payload) item.isSelected = false
            })
        },

        removeItem: (state, action: PayloadAction<string>) => {
            const id = action.payload
            state.items = state.items.filter((i) => i.id !== id)
        },

        clearCart: (state) => {
            state.items = []
        },
    },
})

export const {
    addManyFromSubscriptions,
    toggleItemSelection,
    unselectAll,
    removeItem,
    clearCart,
} = cartSlice.actions

export default cartSlice.reducer

// -------- SELECTORS --------

export const selectCartItems = (state: RootState) => state.cart.items

export const selectCartSummary = createSelector(selectCartItems, (items) => {
    const selected = items.filter((i) => i.isSelected)
    const selectedUsers = selected.length
    const totalPrice = selected.reduce((sum, item) => sum + item.price, 0)

    return { selectedUsers, totalPrice }
})
