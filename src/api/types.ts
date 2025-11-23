export type ServiceCode = 'BYBIT_EYE' | 'PDF_CHECKER' | 'HTX_EYE'

export interface User {
    id: number
    telegramId: number
    telegramUsername?: string
}

export interface AuthResponse {
    token: string
    user: User
}

export interface Balance {
    userId: number
    amount: number
    currency: string
}

export interface Service {
    id: number
    code: ServiceCode
    name: string
    description?: string
}

export interface ServiceStats {
    serviceId: number
    totalSubscriptions: number
    activeCount: number
    expiringSoonCount: number
    expiredCount: number
    notActivatedCount: number
}

export interface DashboardResponse {
    user: User
    balance: Balance
    services: Service[]
    stats: ServiceStats[]
}

export type RenderingStatus = 'pending' | 'paid' | 'cancelled'

export interface RenderingItem {
    id: number
    ownerTelegramId: number
    serviceId: number
    title: string
    price: number
    currency: string
    status: RenderingStatus
    createdAt: string
    service?: Service | null
}

export interface RenderingsResponse {
    items: RenderingItem[]
}

export type CartItemType = 'subscription' | 'prolongation'

export type CartPlanCode = '7d' | '30d'

export interface CartItem {
    id: string
    serviceId: number
    type: CartItemType
    plan: CartPlanCode
    count: number
    pricePerUnit: number

    accountNickname?: string
    accountUid?: string
    subscriptionId?: number
}

export interface CartState {
    items: CartItem[]
}

export type SubscriptionStatus =
    | 'active'
    | 'expiring'
    | 'expired'
    | 'not_activated'

export interface SubscriptionItem {
    id: number
    ownerTelegramId: number
    serviceId: number
    accountNickname: string
    accountUid: string
    status: SubscriptionStatus
    daysLeft: number | null
    service?: Service | null
}

export interface SubscriptionsResponse {
    items: SubscriptionItem[]
}
