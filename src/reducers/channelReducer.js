import {CHANNELS_LOADING, GET_CHANNELS, EMPTY_CHANNELS, SHOW_CHANNEL} from "../actions/types";

const initialState = {
    channels: [],
    loading: false,
    channelMessage: '',
    showChannel: null,
    latestChannel: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CHANNELS:
            return {
                ...state,
                channelMessage: '',
                channels: action.payload.channels,
                loading: false,
                latestChannel: action.payload.latestChannel
            };
        case CHANNELS_LOADING:
            return {
                ...state,
                loading: true,
            };
        case EMPTY_CHANNELS:
            return {
                channels: [],
                loading: false,
                channelMessage: '',
            };
        case SHOW_CHANNEL:
            return {
                ...state,
                channelMessage: '',
                showChannel: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}