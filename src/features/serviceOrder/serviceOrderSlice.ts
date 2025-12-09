import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
// поправь путь при необходимости
import type { RootState } from '../../store/store'
import type { ServiceCode } from '../../api/types'

// Форматы для PDF Checker — те же, что в FORMATS
export type PdfFormatId = '100' | '1000' | '5000' | '1m'

export type PdfAccountsByFormat = Record<PdfFormatId, number>

export interface BybitOrderState {
    weekCount: number
    monthCount: number
    total: number
}

export interface PdfOrderState {
    formatId: PdfFormatId
    accountsByFormat: PdfAccountsByFormat
    total: number
}

export interface HtxOrderState {
    accounts: number
    total: number
}

export interface ServiceOrderState {
    bybit: BybitOrderState
    pdf: PdfOrderState
    htx: HtxOrderState
}

const initialState: ServiceOrderState = {
    bybit: {
        weekCount: 0,
        monthCount: 0,
        total: 0,
    },
    pdf: {
        formatId: '100',
        accountsByFormat: {
            '100': 0,
            '1000': 0,
            '5000': 0,
            '1m': 0,
        },
        total: 0,
    },
    htx: {
        accounts: 0,
        total: 0,
    },
}

const serviceOrderSlice = createSlice({
    name: 'serviceOrder',
    initialState,
    reducers: {
        // ByBit Eye: сохраняем выбор
        setBybitOrder(
            state,
            action: PayloadAction<{
                weekCount: number
                monthCount: number
                total: number
            }>
        ) {
            state.bybit.weekCount = action.payload.weekCount
            state.bybit.monthCount = action.payload.monthCount
            state.bybit.total = action.payload.total
        },

        // PDF Checker: сохраняем текущий формат + все счётчики
        setPdfOrder(
            state,
            action: PayloadAction<{
                formatId: PdfFormatId
                accountsByFormat: PdfAccountsByFormat
                total: number
            }>
        ) {
            state.pdf.formatId = action.payload.formatId
            state.pdf.accountsByFormat = action.payload.accountsByFormat
            state.pdf.total = action.payload.total
        },

        // HTX Eye: сохраняем количество аккаунтов
        setHtxOrder(
            state,
            action: PayloadAction<{
                accounts: number
                total: number
            }>
        ) {
            state.htx.accounts = action.payload.accounts
            state.htx.total = action.payload.total
        },

        // Сброс конкретного сервиса
        resetServiceOrder(state, action: PayloadAction<ServiceCode>) {
            const serviceId = action.payload

            if (serviceId === 'BYBIT_EYE') {
                state.bybit = { weekCount: 0, monthCount: 0, total: 0 }
            }

            if (serviceId === 'PDF_CHECKER') {
                state.pdf = {
                    formatId: '100',
                    accountsByFormat: {
                        '100': 0,
                        '1000': 0,
                        '5000': 0,
                        '1m': 0,
                    },
                    total: 0,
                }
            }

            if (serviceId === 'HTX_EYE') {
                state.htx = { accounts: 0, total: 0 }
            }
        },

        // Полный сброс всех выборов
        resetAllServiceOrders(state) {
            Object.assign(state, initialState)
        },
    },
})

export const {
    setBybitOrder,
    setPdfOrder,
    setHtxOrder,
    resetServiceOrder,
    resetAllServiceOrders,
} = serviceOrderSlice.actions

export default serviceOrderSlice.reducer

// 🔍 Селекторы

export const selectBybitOrder = (state: RootState) => state.serviceOrder.bybit

export const selectPdfOrder = (state: RootState) => state.serviceOrder.pdf

export const selectHtxOrder = (state: RootState) => state.serviceOrder.htx
