import {VIDEOS_LOADING, EMPTY_VIDEO, GET_VIDEOS, SHOW_VIDEO} from "../actions/types";

const initialState = {
    videos: [],
    loading: false,
    videoMessage: '',
    showVideo: null,
    latestVideo:null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_VIDEOS:
            return {
                ...state,
                videoMessage: '',
                videos: action.payload.videos,
                loading: false,
                latestVideo: action.payload.latestVideo
            };
        case VIDEOS_LOADING:
            return {
                ...state,
                loading: true,
            };
        case EMPTY_VIDEO:
            return {
                videos: [],
                loading: false,
                videoMessage: '',
            };
        case SHOW_VIDEO:
            return {
                ...state,
                loading: false,
                videoMessage: '',
                showVideo: action.payload
            };
        default:
            return state;
    }
}