const { createSlice } = require("@reduxjs/toolkit");

const prescriptionsSlice = createSlice({
    name: 'prescriptions',
    initialState: [],
    reducers: {
        setPrescriptions(state, action) {
            const { rxes } = action.payload
            state.push(...rxes)
        },
        updatePrescription(state, action) {
            const { rx } = action.payload
            console.log(rx)
            let toUpdateInd = state.findIndex(presc => presc.id === rx.id)
            state.splice(toUpdateInd, 1, rx)
        }
    }
})

export const { setPrescriptions, updatePrescription } = prescriptionsSlice.actions
export default prescriptionsSlice.reducer