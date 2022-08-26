import { combineReducers } from "redux"
import { authReducer } from "./userReducer"
export default combineReducers({
    auth: authReducer
})