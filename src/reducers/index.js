import { combineReducers } from 'redux'
import prescriptionsReducer from '../features/prescriptions/PrescriptionsSlice'
import hcReducer from '../features/hc/HcSlice'


export default combineReducers({
    hc: hcReducer,
    prescriptions: prescriptionsReducer,
})