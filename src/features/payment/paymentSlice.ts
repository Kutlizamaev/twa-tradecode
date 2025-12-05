import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'

export type PaymentStatus = 'idle' | 'processing' | 'success' | 'error'
export type PaymentMethod = 'UID' | 'BEP20' | 'TRC20'

interface PaymentState {
    status: PaymentStatus
    amount: number
    method: PaymentMethod
}

const initialState: PaymentState = {
    status: 'idle',
    amount: 0,
    method: 'UID',
}

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setPaymentStatus(state, action: PayloadAction<PaymentStatus>) {
            state.status = action.payload
        },
        setPaymentParams(
            state,
            action: PayloadAction<{ amount: number; method: PaymentMethod }>
        ) {
            state.amount = action.payload.amount
            state.method = action.payload.method
        },
        setPaymentAmount(state, action: PayloadAction<number>) {
            state.amount = action.payload
        },
        setPaymentMethod(state, action: PayloadAction<PaymentMethod>) {
            state.method = action.payload
        },
        resetPayment(state) {
            state.status = 'idle'
            state.amount = 0
            state.method = 'UID'
        },
    },
})

export const {
    setPaymentStatus,
    resetPayment,
    setPaymentParams,
    setPaymentAmount,
    setPaymentMethod,
} = paymentSlice.actions

export const selectPaymentStatus = (state: RootState) => state.payment.status
export const selectPaymentAmount = (state: RootState) => state.payment.amount
export const selectPaymentMethod = (state: RootState) => state.payment.method

export default paymentSlice.reducer
