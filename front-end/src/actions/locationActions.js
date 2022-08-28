import instance from "../utils/axios"
import { toast } from 'react-toastify';
export const getLocation = () => async (dispatch) => {
    try {
        dispatch({ type: "GET_LOCATION_REQUEST" })

        const { data } = await instance.get("/getlocations");
        dispatch({
            type: "GET_LOCATION_SUCCESS",
            payload: data
        })
    } catch (error) {
        dispatch({
            type: "GET_LOCATION_ERROR",
            payload: error
        })
    }
}

export const setLocation = ({ lng, lat, id, name }) => async (dispatch) => {
    try {
        dispatch({ type: "GET_LOCATION_REQUEST" })

        const { data } = await instance.post("/setlocations", { lng, lat, id, name });
        dispatch({
            type: "GET_LOCATION_SUCCESS",
            payload: data
        })
        toast.success("Success.")
    } catch (error) {
        dispatch({
            type: "GET_LOCATION_ERROR",
            payload: error
        })
    }
}
