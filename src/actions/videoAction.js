import {VIDEOS_LOADING, EMPTY_VIDEO, GET_VIDEOS, SHOW_VIDEO} from "./types";
import apiGtw from "../apis/catechismo";
import {tokenConfig} from "./authAction";
import {returnErrors} from "./errorActions";
import {push} from "connected-react-router";


export const getVideos = () => async(dispatch, getState) => {

    dispatch({ type: VIDEOS_LOADING });

    try {
        const response = await apiGtw.get('/api/v1/vc/video', tokenConfig(getState));
        dispatch({ type: GET_VIDEOS, payload: response.data.data});
    } catch (err) {
        dispatch(returnErrors(err.response.data.error.message, err.response.data.error.code, 'GET_VIDEOS_FAIL'));
    }

};

export const showVideo = id => async(dispatch, getState) => {

    try {
        const response = await apiGtw.get('/api/v1/vc/video/' + id, tokenConfig(getState));
        dispatch({ type: SHOW_VIDEO, payload: response.data.data});
    } catch (err) {
        dispatch(returnErrors(err.response.data.error.message, err.response.data.error.code, 'GET_VIDEO_FAIL'));
    }

};

export const getVideosByChannelId = id => async(dispatch, getState) => {

    dispatch({ type: VIDEOS_LOADING });

    try {
        const response = await apiGtw.get('/api/v1/vc/video/channel/' + id, tokenConfig(getState));
        dispatch({ type: GET_VIDEOS, payload: response.data.data});
    } catch (err) {
        dispatch(returnErrors(err.response.data.error.message, err.response.data.error.code, 'GET_VIDEOS_FAIL'));
    }

};