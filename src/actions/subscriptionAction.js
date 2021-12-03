import {SUBSCRIPTION_LOADING, GET_SUBSCRIPTION, CHANGE_SUBSCRIPTION} from "./types";
import apiGtw from "../apis/catechismo";
import {returnErrors} from "./errorActions";


export const getSubscriptions = () => async(dispatch) => {

    dispatch({ type: SUBSCRIPTION_LOADING });

    try {
        const response = await apiGtw.get('/api/v1/subscription/active');
        dispatch({ type: GET_SUBSCRIPTION, payload: response.data.data});
    } catch (err) {
        dispatch(returnErrors(err.response.data.error.message, err.response.data.error.code, 'GET_SUBSCRIPTION_FAIL'));
    }

};

export const changeSelectedSubscription = id => (dispatch) => {
    dispatch({type: CHANGE_SUBSCRIPTION, payload: id});
};