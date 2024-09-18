import axios from "axios";
import {
    GET_USER_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS,
    USER_LOGIN_FAILED,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_REGISTER_FAILED,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_FAILED,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS
} from "../consents/userConsents";
import CustomError from "../../../../backend/utils/customError.js";

const backendUrl = "http://localhost:5000/user"

const getToken = () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    return {
        accessToken, refreshToken
    }
}
const setToken = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
}
export const registerUserAction = (registrationCredentials) => async (dispatch) => {
    try {
        const link = backendUrl + "/register";
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        const config = { headers: { "Content-type": "application/json" } };
        const data = (await axios.post(link, registrationCredentials, config)).data;
        if (!data.success) {
            throw new CustomError(data.message);
        }
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data.user
        })
        setToken(data.accessToken, data.refreshToken);

    } catch (err) {
        dispatch({
            type: USER_REGISTER_FAILED,
            payload: err.message
        })
    }
}

export const loginUserAction = (loginCredentials) => async (dispatch) => {
    try {
        const link = backendUrl + "/login";
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config = { headers: { "Content-type": "application/json" } };
        const data = (await axios.post(link, loginCredentials, config)).data;
        if (!data.success) {
            throw new CustomError(data.message);
        }
        setToken(data.accessToken, data.refreshToken);
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data.user
        })
    } catch (err) {
        dispatch({
            type: USER_LOGIN_FAILED,
            payload: err.message
        })
    }
}
export const forgotPasswordAction = (forgotPasswordCredentials) => async (dispatch) => {
    try {
        const config = { headers: { "Content-type": "application/json" } };
        var link = backendUrl + "/forgot-password";
        const data = (await axios.post(link, forgotPasswordCredentials, config)).data;
        if (!data.success) {
            throw new CustomError(data.message);
        }
        return data.message;

    } catch (err) {
        return err.message;
    }
}
export const resetPasswordAction = (resetPasswordCredentials) => async (dispatch) => {
    try {
        const link = backendUrl + "/reset-password";
        dispatch({
            type: USER_UPDATE_REQUEST
        })
        const config = { headers: { "Content-type": "application/json" } };
        const data = (await axios.post(link, resetPasswordCredentials, config)).data;
        if (!data.success) {
            throw new CustomError(data.message);
        }
        setToken(data.accessToken, data.refreshToken);
        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data.user
        })
    } catch (err) {
        dispatch({
            type: USER_UPDATE_FAILED,
            payload: err.message
        })
    }
}
export const getProfileAction = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_USER_REQUEST
        })
        const { accessToken, refreshToken } = getToken();
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const link = backendUrl + "/me";
        const data = (await axios.get(link,config)).data;
        if(!data.success) {
            throw new CustomError(data.message);
        }

        dispatch({
            type: GET_USER_SUCCESS,
            payload: data.user
        })
    } catch (err) {
        dispatch({
            type: GET_USER_FAILED,
            payload: err.message
        })
    }
}

