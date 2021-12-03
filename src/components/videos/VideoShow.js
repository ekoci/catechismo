import React, {Component} from "react";
import './VideoShow.css';
import {Container} from "semantic-ui-react";
import {showVideo} from "../../actions/videoAction";
import {connect} from "react-redux";
import PropTypes from "prop-types";


class VideoShow extends Component {

    static propTypes = {
        video: PropTypes.object.isRequired,
    }

    componentDidMount() {
        this.props.showVideo(this.props.match.params.id);
    }

    render () {
        return <Container style={{width: 100 + "vh", height: 100 + "vh"}}>
            {this.props.video &&
            <iframe src={this.props.video.videoLink} style={{width: 100 + "vh", height: 95 + "vh"}}
                    frameBorder="0"
                    allow="autoplay; fullscreen" allowFullScreen></iframe>
        }
        </Container>
    }
};

const mapStateToProps = state => ({
    video: state.video.showVideo
});


export default connect(mapStateToProps, {showVideo}) (VideoShow);
