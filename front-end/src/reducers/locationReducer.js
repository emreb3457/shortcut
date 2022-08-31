import { GET_LOCATION_REQUEST, GET_LOCATION_ERROR, GET_LOCATION_SUCCESS } from "../constants/locationConstants"

const initialState = {
    loading: false
}
export const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LOCATION_REQUEST:
            return {
                loading: true
            }

        case GET_LOCATION_SUCCESS:
            return {
                loading: false,
                locations: action.payload
            }

        case GET_LOCATION_ERROR:
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