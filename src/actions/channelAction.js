import apiGtw from '../apis/catechismo';
import {returnErrors} from './errorActions';
import { tokenConfig } from './authAction';
import {CHANNELS_LOADING, GET_CHANNELS, SHOW_CHANNEL} from "./types";


export const getChannels = () => async(dispatch, getState) => {

    dispatch({ type: CHANNELS_LOADING });

    try {
        const response = await apiGtw.get('/api/v1/vc/channel', tokenConfig(getState));
        dispatch({ type: GET_CHANNELS, payload: response.data.data});
    } catch (err) {
        dispatch(returnErrors(err.response.data.error.message, err.response.data.error.code, 'GET_CHANNELS_FAIL'));
    }

};

export const getChannel = id => async(dispatch, getState) => {

    dispatch({ type: CHANNELS_LOADING });

    try {
        const response = await apiGtw.get('/api/v1/vc/channel/' + id, tokenConfig(getState));
        dispatch({ type: SHOW_CHANNEL, payload: response.data.data});
    } catch (err) {
        dispatch(returnErrors(err.response.data.error.message, err.response.data.error.code, 'GET_CHANNEL_FAIL'));
    }

};