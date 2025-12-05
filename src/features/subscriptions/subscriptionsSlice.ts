import {
    createSlice,
    createSelector,
    type PayloadAction,
} from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'

export type PlanType = 7 | 30

export type SelectedForCartItem = {
    subscriptionId: string
    serviceId: string
    serviceName: string
    userName: string
    uid: string
    plan: PlanType
    price: number
}

type SubscriptionsState = {
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

            if (existing && existing.plan === plan) {
                delete state.selectedForCart[subscriptionId]
            } else {
                state.selectedForCart[subscriptionId] = action.payload
            }
        },

        clearSelectionByServiceName: (state, action: PayloadAction<string>) => {
            const serviceName = action.payload

            for (const [subscriptionId, item] of Object.entries(
                state.selectedForCart
            )) {
                if (item.serviceName === serviceName) {
                    delete state.selectedForCart[subscriptionId]
                }
            }
        },

        removeSelectionById: (state, action: PayloadAction<string>) => {
            const subscriptionId = action.payload
            delete state.selectedForCart[subscriptionId]
        },

        clearSelection: (state) => {
            state.selectedForCart = {}
        },
    },
})

export const {
    toggleSelection,
    clearSelectionByServiceName,
    removeSelectionById,
    clearSelection,
} = subscriptionsSlice.actions
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
