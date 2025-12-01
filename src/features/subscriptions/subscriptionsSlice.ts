import {
    createSlice,
    createSelector,
    type PayloadAction,
} from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'

export type PlanType = 7 | 30

export type SelectedForCartItem = {
    subscriptionId: string // тот самый subscriptionKey
    serviceId: string
    serviceName: string // "ByBit Eye", "PDF Checker" и т.д.
    userName: string // title из карточки
    uid: string
    plan: PlanType
    price: number
}

type SubscriptionsState = {
    // ключ — subscriptionId (subscriptionKey)
    selectedForCart: Record<string, SelectedForCartItem>
}

const initialState: SubscriptionsState = {
    selectedForCart: {},
}

const subscriptionsSlice = createSlice({
    name: 'subscriptions',
    initialState,
    reducers: {
        toggleSelection: (
            state,
            action: PayloadAction<SelectedForCartItem>
        ) => {
            const { subscriptionId, plan } = action.payload
            const existing = state.selectedForCart[subscriptionId]

            // если тот же план уже выбран → снимаем выбор
            if (existing && existing.plan === plan) {
                delete state.selectedForCart[subscriptionId]
            } else {
                // иначе ставим/меняем план
                state.selectedForCart[subscriptionId] = action.payload
            }
        },

        clearSelection: (state) => {
            state.selectedForCart = {}
        },
    },
})

export const { toggleSelection, clearSelection } = subscriptionsSlice.actions
export default subscriptionsSlice.reducer

// ------------ SELECTORS ------------

export const selectSelectedForCartMap = (state: RootState) =>
    state.subscriptions.selectedForCart

// списком (для переноса в cartSlice)
export const selectSelectedForCartList = createSelector(
    selectSelectedForCartMap,
    (map) => Object.values(map)
)

export const selectSubscriptionsSummary = createSelector(
    selectSelectedForCartList,
    (selected) => {
        const selectedUsers = selected.length
        const totalPrice = selected.reduce((sum, i) => sum + i.price, 0)

        return { selectedUsers, totalPrice }
    }
)
