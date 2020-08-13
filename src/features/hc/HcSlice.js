const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    id: '',
    name: ''
}

const hcSlice = createSlice({
    name: 'hc',
    initialState,
    reducers: {
        setHc(state, action) {
            const { id, name, token } = action.payload
            localStorage.token = token
            state.id = id
            state.name = name
        },
        removeHc(state) {
            localStorage.clear()
            state = initialState
        }
    }
})

export const { setHc, removeHc } = hcSlice.actions
export default hcSlice.reducer