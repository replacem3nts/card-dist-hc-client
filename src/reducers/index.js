import { combineReducers } from 'redux'
import prescriptionsReducer from '../features/prescriptions/PrescriptionsSlice'

export default combineReducers({
    prescriptions: prescriptionsReducer,
})