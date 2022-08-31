import instance from "../utils/axios"
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

export const getUsers = () => async (dispatch) => {
    try {
        dispatch({ type: GET_USER_REQUEST })

        const { data } = await instance.get("/getusers");
        dispatch({
            type: GET_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_USER_ERROR,
            payload: error
        })
    }
}

export const createUser = ({ name, email, password }) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_USER_REQUEST })

        const { data } = await instance.post("/createuser", { name, email, password });
        dispatch({
            type: CREATE_USER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CREATE_USER_ERROR,
            payload: error
        })

    }
}


export const loginUser = ({ email, password }) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_USER_REQUEST })

        const { data } = await instance.post("/loginuser", { email, password });
        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: data
        })
        sessionStorage.setItem("sessionUser", JSON.stringify(data.result));
        sessionStorage.setItem('acctoken', data.result.token);
    } catch (error) {
        dispatch({
            type: LOGIN_USER_ERROR,
            payload: error
        })
        console.log(error?.response)

    }
}

export const createOutherUser = ({ name, email, password }) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_USER_REQUEST })

        const { data } = await instance.post("/createuser", { name, email, password });
        dispatch({
            type: CREATE_USER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CREATE_USER_ERROR,
            payload: error
        })


    }
}


