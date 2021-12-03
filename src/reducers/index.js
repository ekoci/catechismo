import {combineReducers} from "redux";
import { connectRouter } from 'connected-react-router';
import authReducer from "./authReducer";
import {reducer as formReducer} from "redux-form";
import errorReducer from './errorReducer';
import channelReducer from "./channelReducer";
import videoReducer from "./videoReducer";
import subscriptionReducer from "./subscriptionReducer";

export default history =>  combineReducers({
    router: connectRouter(history),
    error: errorReducer,
    auth: authReducer,
    form: formReducer,
    channel : channelReducer,
    video : videoReducer,
    subscription: subscriptionReducer
});