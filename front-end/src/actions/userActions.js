import instance from "../utils/axios"
import { toast } from 'react-toastify';
export const getUsers = () => async (dispatch) => {
    try {
        dispatch({ type: "GET_USER_REQUEST" })

        const { data } = await instance.get("/getusers");
        dispatch({
            type: "GET_USER_SUCCESS",
            payload: data
        })
    } catch (error) {
        dispatch({
            type: "GET_USER_ERROR",
            payload: error
        })
    }
}

export const createUser = ({ name, email, password }) => async (dispatch) => {
    try {
        dispatch({ type: "CREATE_USER_REQUEST" })

        const { data } = await instance.post("/createuser", { name, email, password });
        dispatch({
            type: "CREATET_USER_SUCCESS",
            payload: data
        })
        sessionStorage.setItem("sessionUser", JSON.stringify(data.result));
        sessionStorage.setItem('acctoken', data.result.token);
        toast.success("Success.")
    } catch (error) {
        dispatch({
            type: "CREATE_USER_ERROR",
            payload: error
        })

        toast.error(error?.response?.data?.message)
    }
}


export const loginUser = ({ email, password }) => async (dispatch) => {
    try {
        dispatch({ type: "LOGIN_USER_REQUEST" })

        const { data } = await instance.post("/loginuser", { email, password });
        dispatch({
            type: "LOGIN_USER_SUCCESS",
            payload: data
        })
        sessionStorage.setItem("sessionUser", JSON.stringify(data.result));
        sessionStorage.setItem('acctoken', data.result.token);
        toast.success("Success.")
    } catch (error) {
        dispatch({
            type: "LOGIN_USER_ERROR",
            payload: error
        })
        toast.error(error?.response?.data?.message)
    }
}

export const createOutherUser = ({ name, email, password }) => async (dispatch) => {
    try {
        dispatch({ type: "CREATE_USER_REQUEST" })

        const { data } = await instance.post("/createuser", { name, email, password });
        dispatch({
            type: "CREATET_USER_SUCCESS",
            payload: data
        })
        toast.success("Success.")
    } catch (error) {
        dispatch({
            type: "CREATE_USER_ERROR",
            payload: error
        })

        toast.error(error?.response?.data?.message)
    }
}


