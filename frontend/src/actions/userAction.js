import axios from "axios";

import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_RESET,
    USER_LOAD_REQUEST,
    USER_LOAD_SUCCESS,
    USER_LOAD_FAIL,
    USER_LOAD_RESET,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_RESET,
    USER_UPDATE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_RESET,
    USER_DELETE_FAIL,
    CLEAR_ERRORS,
} from "../constants/userConstants";

// Login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post("/api/v1/login", { email, password }, config);

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: USER_LOGIN_FAIL, payload: error.response.data.message });
    }
}

// Register user
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        const { data } = await axios.post("/api/v1/register", userData, config);

        dispatch({ type: USER_REGISTER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: error.response.data.message });
    }
}

// Load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: USER_LOAD_REQUEST });

        const { data } = await axios.get("/api/v1/me");

        dispatch({ type: USER_LOAD_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: USER_LOAD_FAIL, payload: error.response.data.message });
    }
}

// Update user
export const updateUser = (userData) => async (dispatch) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST });

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        const { data } = await axios.put("/api/v1/me/update", userData, config);

        dispatch({ type: USER_UPDATE_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({ type: USER_UPDATE_FAIL, payload: error.response.data.message });
    }
}

// Delete user
export const deleteUser = () => async (dispatch) => {
    try {
        dispatch({ type: USER_DELETE_REQUEST });

        const { data } = await axios.delete("/api/v1/me/delete");

        dispatch({ type: USER_DELETE_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({ type: USER_DELETE_FAIL, payload: error.response.data.message });
    }
}

// Logout user
export const logout = () => async (dispatch) => {
    try {
        await axios.get("/api/v1/logout");

        dispatch({ type: USER_LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({ type: USER_LOGOUT_FAIL, payload: error.response.data.message });
    }
}

// Clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}