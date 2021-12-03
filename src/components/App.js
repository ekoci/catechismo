import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import VideoList from "./videos/VideoList";
import VideoShow from "./videos/VideoShow";
import ChannelList from "./channels/ChannelList";
import HomePage from "./HomePage";
import "./App.css";
import "../styles/sb-admin-2.min.css";
import FooterApp from "../components/FooterApp";
import NavbarApp from "../components/NavbarApp";
import {store} from '../store';
import NotFound from '../components/NotFound';
import {loadUser} from '../actions/authAction';
import ChannelVideos from '../components/channels/ChannelVideos';


class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <ConnectedRouter history={this.props.history} context={this.props.context}>
                <NavbarApp/>
                <Switch>
                    <Route path="/" exact component={HomePage}/>
                    <Route path="/video" exact component={VideoList}/>
                    <Route path="/video/show/:id" exact component={VideoShow}/>
                    <Route path="/channel" exact component={ChannelList}/>
                    <Route path="/channel/:id" exact component={ChannelVideos}/>
                    <Route component={NotFound}/>
                </Switch>
                <FooterApp/>
            </ConnectedRouter>
        );
    }
}

export default App;