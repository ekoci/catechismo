import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import MovieCard from "./MovieCard";
import {connect} from "react-redux";
import {getVideos} from "../../actions/videoAction";
import {getVideosByChannelId} from "../../actions/videoAction";
import Example from "../Example";
import {Container, Row, Col, FormGroup} from 'reactstrap';


class VideoList extends Component {

    static propTypes = {
        getVideos: PropTypes.func.isRequired,
        video: PropTypes.object.isRequired,
    }

    componentDidMount() {
        if (this.props.id) {
            this.props.getVideosByChannelId(this.props.id);
        } else {
            this.props.getVideos();
        }
    }

    render() {
        const {videos} = this.props.video;
        return <div>
            <div style={{width: 100 + "vh"}} id='test'>
                {this.props.video.latestVideo &&
                <Example img={this.props.video.latestVideo.photoUrl}/>
                }
            </div>
            <Container style={{margin: 10}}>
                <Row xs="3">
                    {videos.length === 0
                        ? <h4 className='mt-5 text-secondary text-center'>No Videos</h4>
                        :
                        videos.map((video, idx) =>
                            <Col md={3} key={`vid-${idx}`}>
                                <FormGroup>
                                    <MovieCard video={video}/>
                                </FormGroup>
                            </Col>
                        )}
                </Row>
            </Container>
        </div>;
    }
}

const mapStateToProps = state => ({
    video: state.video
});


export default connect(mapStateToProps, {getVideos, getVideosByChannelId})(VideoList);
