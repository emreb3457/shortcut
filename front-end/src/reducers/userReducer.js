

const initialState = {
    loading: false
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_USER_REQUEST":
        case "CREATE_USER_REQUEST":
        case "LOGIN_USER_REQUEST":
            return {
                loading: true
            }

        case "GET_USER_SUCCESS":
            return {
                loading: false,
                user: action.payload
            }

        case "CREATE_USER_SUCCESS":
            return {
                loading: false,
                success: true,
            }
        case "LOGIN_USER_SUCCESS":
            return {
                loading: false,
                success: true,
            }
        case "GET_USER_FAIL":
        case "CREATE_USER_FAIL":
        case "LOGIN_USER_FAIL":
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