// src/features/cart/cartSlice.ts
import {
    createSlice,
    createSelector,
    nanoid,
    type PayloadAction,
} from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'
import type { ServiceCode } from '../../api/types'
import type { PdfFormatId } from '../serviceOrder/serviceOrderSlice' // поправь путь, если нужно

// ---- Общие типы ----

export type PlanType = 7 | 30 // для подписок

// ---- BYBIT ----

export type BybitAccessPeriod = '7_DAYS' | '30_DAYS'

export type BybitUserForCart = {
    uid: string
    p2pName: string
    password: string
    accessPeriod: BybitAccessPeriod
}

// ---- HTX ----

export type HtxUserForCart = {
    uid: string
    p2pName: string
    password: string
}

// ---- PDF ----

type PdfPlan = {
    formatId: PdfFormatId
    label: string
    accountsCount: number
}

// ---- CartItem ----

// корзина умеет хранить и подписки, и сервисные заказы
export type CartItem = {
    id: string

    // общие поля
    serviceId: ServiceCode
    serviceName: string
    price: number // для подписок — цена за пользователя, для сервиса — сумма заказа
    isSelected: boolean
    kind: 'subscription' | 'serviceOrder'

    // --- для подписок (SubscriptionsPage) ---
    subscriptionId?: string
    userName?: string
    uid?: string
    plan?: PlanType

    // --- для сервисных заказов (ServiceOrderPage + UsersSelectionPage) ---
    usersCount?: number
    usersData?: unknown // BybitUserForCart[] | { uid... }[] | string[] (теги для PDF)

    // только для PDF Checker
    pdfPlan?: PdfPlan
}

type CartState = {
    items: CartItem[]
}

const initialState: CartState = {
    items: [],
}

// ---- Payload-типы ----

// добавление из SubscriptionsPage
type AddFromSubscriptionsPayload = {
    subscriptionId: string
    serviceId: ServiceCode
    serviceName: string
    userName: string
    uid: string
    plan: PlanType
    price: number
}

// добавление сервисного заказа (Bybit / HTX / PDF)
type AddServiceOrderToCartPayload = {
    serviceId: ServiceCode
    serviceName: string
    totalPrice: number
    usersCount: number
    usersData?: unknown
    pdfPlan?: PdfPlan
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // ---- ПОДПИСКИ ----
        addManyFromSubscriptions: (
            state,
            action: PayloadAction<AddFromSubscriptionsPayload[]>
        ) => {
            action.payload.forEach((s) => {
                const existingIndex = state.items.findIndex(
                    (item) =>
                        item.kind === 'subscription' &&
                        item.subscriptionId === s.subscriptionId
                )

                if (existingIndex === -1) {
                    state.items.push({
                        id: nanoid(),
                        kind: 'subscription',
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
                    const existing = state.items[existingIndex]

                    existing.serviceId = s.serviceId
                    existing.serviceName = s.serviceName
                    existing.userName = s.userName
                    existing.uid = s.uid
                    existing.plan = s.plan
                    existing.price = s.price
                    existing.isSelected = true
                }
            })
        },

        // ---- СЕРВИСНЫЕ ЗАКАЗЫ (Bybit / HTX / PDF) ----
        addServiceOrderToCart: (
            state,
            action: PayloadAction<AddServiceOrderToCartPayload>
        ) => {
            const {
                serviceId,
                serviceName,
                totalPrice,
                usersCount,
                usersData,
                pdfPlan,
            } = action.payload

            state.items.push({
                id: nanoid(),
                kind: 'serviceOrder',
                serviceId,
                serviceName,
                price: totalPrice,
                isSelected: true,
                usersCount,
                usersData,
                pdfPlan,
            })
        },

        // переключение выбора одного item
        toggleItemSelection: (state, action: PayloadAction<string>) => {
            const id = action.payload
            const item = state.items.find((i) => i.id === id)
            if (item) {
                item.isSelected = !item.isSelected
            }
        },

        // снять выбор со всех позиций конкретного сервиса (по имени)
        unselectAll: (state, action: PayloadAction<string>) => {
            const serviceName = action.payload
            state.items.forEach((item) => {
                if (item.serviceName === serviceName) {
                    item.isSelected = false
                }
            })
        },

        // удалить одну позицию
        removeItem: (state, action: PayloadAction<string>) => {
            const id = action.payload
            state.items = state.items.filter((i) => i.id !== id)
        },

        // очистить корзину по имени сервиса (используется в CartAccordeon)
        clearCartByServiceName: (state, action: PayloadAction<string>) => {
            const serviceName = action.payload
            state.items = state.items.filter(
                (i) => i.serviceName !== serviceName
            )
        },
    },
})

export const {
    addManyFromSubscriptions,
    addServiceOrderToCart,
    toggleItemSelection,
    unselectAll,
    removeItem,
    clearCartByServiceName,
} = cartSlice.actions

export default cartSlice.reducer

// -------- SELECTORS --------

export const selectCartItems = (state: RootState) => state.cart.items

export const selectCartSummary = createSelector(selectCartItems, (items) => {
    const selected = items.filter((i) => i.isSelected)

    // для подписок: каждый item = 1 пользователь
    // для сервисных заказов: usersCount пользователей
    const selectedUsers = selected.reduce((sum, item) => {
        if (item.kind === 'serviceOrder' && item.usersCount) {
            return sum + item.usersCount
        }
        return sum + 1
    }, 0)

    const totalPrice = selected.reduce((sum, item) => sum + item.price, 0)

    return { selectedUsers, totalPrice }
})
