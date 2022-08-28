import { combineReducers } from "redux"
import { locationReducer } from "./locationReducer"
import { authReducer } from "./userReducer"
export default combineReducers({
    auth: authReducer,
    location:locationReducer
})