import apiGtw from '../apis/catechismo';
import {push} from 'connected-react-router';
import {LOGIN_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_FAIL, LOGOUT_SUCCESS, USER_LOADING, USER_LOADED, AUTH_ERROR} from "./types";
import {returnErrors} from './errorActions';

export const login = formValues => async dispatch => {
    const headers = {headers: {'Content-type': 'application/json'}};
    try {
        const response = await apiGtw.post('/login', formValues, headers);
        dispatch({type: LOGIN_SUCCESS, payload: response.data.data.user, token: response.data.data.token});
        dispatch(push('/'));
    } catch (err) {
        dispatch(returnErrors(err.response.data.error.message, err.response.data.error.code, 'LOGIN_FAIL'));
        dispatch({type: LOGIN_FAIL});
    }
};

export const register = formValues => async dispatch => {
    const headers = {headers: {'Content-type': 'application/json'}};
    try {
        const response = await apiGtw.post('/api/v1/account', formValues);
        dispatch({type: REGISTER_SUCCESS});
        dispatch(push('/'));
    } catch (err) {
        dispatch(returnErrors(err.response.data.error.message, err.response.data.error.code, 'REGISTER_FAIL'));
        dispatch({type: REGISTER_FAIL});
    }
};

export const loadUser = () => async (dispatch, getState) => {
    dispatch({ type: USER_LOADING });
    try {
        const response = await apiGtw.get('/api/v1/account/load', tokenConfig(getState));
        dispatch({ type: USER_LOADED, payload: response.data.data });
    } catch (err) {
        dispatch({ type: AUTH_ERROR });
    }
};

export const logout = () => async (dispatch) => {
    dispatch({type: LOGOUT_SUCCESS});
};

export const tokenConfig = (getState) => {
    const { token } = getState().auth;
    const config = { headers: { 'Content-type': 'application/json' } };
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
};

