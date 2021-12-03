import {SUBSCRIPTION_LOADING, GET_SUBSCRIPTION, EMPTY_SUBSCRIPTION, CHANGE_SUBSCRIPTION} from "../actions/types";

const initialState = {
    subscriptions: [],
    loading: false,
    subscriptionMessage: '',
    selectedSubscription : null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SUBSCRIPTION:
            return {
                ...state,
                subscriptionMessage: '',
                subscriptions: action.payload,
                loading: false,
            };
        case SUBSCRIPTION_LOADING:
            return {
                ...state,
                loading: true,
            };
        case EMPTY_SUBSCRIPTION:
            return {
                subscriptions: [],
                loading: false,
                subscriptionMessage: '',
            };
        case CHANGE_SUBSCRIPTION:
            return {
                ...state,
                selectedSubscription : action.payload
            };
        default:
            return state;
    }
}