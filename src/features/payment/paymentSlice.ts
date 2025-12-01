import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'

export type PaymentStatus = 'idle' | 'processing' | 'success' | 'error'

interface PaymentState {
    status: PaymentStatus
}

const initialState: PaymentState = {
    status: 'idle',
}

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setPaymentStatus(state, action: PayloadAction<PaymentStatus>) {
            state.status = action.payload
        },
        resetPayment(state) {
            state.status = 'idle'
        },
    },
})

export const { setPaymentStatus, resetPayment } = paymentSlice.actions

export const selectPaymentStatus = (state: RootState) => state.payment.status

export default paymentSlice.reducer
