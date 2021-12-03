import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getChannels} from '../../actions/channelAction';
import ChannelCard from "./ChannelCard";
import {Container, Row, Col, FormGroup} from 'reactstrap';
import Example from "../Example";

class ChannelList extends Component {

    static propTypes = {
        getChannels: PropTypes.func.isRequired,
        channel: PropTypes.object.isRequired,
        latestChannel: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getChannels();
    }


    render() {
        const {channels} = this.props.channel;
        return <div>
            <div style={{width: 100 + "vh"}} id='test'>
                {this.props.channel.latestChannel &&
                <Example img={this.props.channel.latestChannel.logoUrl}/>
                }
            </div>
            <Container style={{margin: 10}}>
                <Row xs="3">
                    {channels.length === 0
                        ? <h4 className='mt-5 text-secondary text-center'>No Channels</h4>
                        :
                        channels.map((channel, idx) =>
                            <Col md={3} key={`vid-${idx}`}>
                                <FormGroup>
                                    <ChannelCard channel={channel}/>
                                </FormGroup>
                            </Col>
                        )}
                </Row>
            </Container>
        </div>;

    }

}

const mapStateToProps = state => ({
    channel: state.channel
});


export default connect(mapStateToProps, {getChannels})(ChannelList);