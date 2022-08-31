import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    CREATE_USER_ERROR,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS
} from "../constants/userConstants"

const initialState = {
    loading: false
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_REQUEST:
        case CREATE_USER_REQUEST:
        case LOGIN_USER_REQUEST:
            return {
                loading: true
            }

        case GET_USER_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }

        case CREATE_USER_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case LOGIN_USER_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case GET_USER_ERROR:
        case CREATE_USER_ERROR:
        case LOGIN_USER_ERROR:
            return {
                ...state,
                loading: true,
                error: action.payload
            }
        case "CLEAR_ERROR":
            return {
                error: null
            }
        case "CLEAR_SUCCESS":
            return {
                success: null
            }
        default:
            return state;
    }
}