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
    id: number
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
    id: number
    serviceId: number
    totalSubscriptions: number
    activeCount: number
    expiringSoonCount: number
    expiredCount: number
    notActivatedCount: number
}

export interface DashboardData {
    user: User
    balance: Balance
    services: Service[]
    stats: ServiceStats[]
}
