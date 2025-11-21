import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        loading: false,
        modal: null as null | string,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setModal: (state, action) => {
            state.modal = action.payload
        },
    },
})

export const { setLoading, setModal } = uiSlice.actions
export default uiSlice.reducer
