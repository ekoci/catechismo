import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getChannel} from "../../actions/channelAction";
import VideoList from "../videos/VideoList";

class ChannelVideos extends Component {

    static propTypes = {
        channel: PropTypes.object.isRequired,
    }

    componentDidMount() {
        this.props.getChannel(this.props.match.params.id);
    }


    render() {
        const {channel} = this.props.channel;
        return <div>
         <VideoList id={this.props.match.params.id}/>
        </div>;
    }

}

const mapStateToProps = state => ({
    channel: state.channel
});


export default connect(mapStateToProps, {getChannel})(ChannelVideos);
