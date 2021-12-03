import React, { Component } from "react";
import { Container, Jumbotron, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginModal from './auth/LoginModal';
import welcome  from '../assets/welcome.jpg';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: true,
        };
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    onDismiss = () => {
        this.setState({ visible: false });
    }

    componentDidUpdate(prevProps) {
   /*     if (prevProps.note.noteMessage._id !== this.props.note.noteMessage._id) {
            this.setState({ visible: true });
            this.interval = setTimeout(() => this.onDismiss(), 3000);
        }*/
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { isAuthenticated, user, isRegistered} = this.props.auth;

        return (
            <Container>

                { isAuthenticated
                && <div className='my-5'>
                    <h3 className='text-secondary'> Welcome, {user.name && user.name.charAt(0).toUpperCase() + user.name.slice(1)}</h3>
                </div>
                }

                {!isAuthenticated && !isRegistered
                && <div>
                    <img src={welcome} />
                </div>
                }

                {isRegistered && !isAuthenticated &&
                <Jumbotron className='mt-5 text-center'>
                    <h3 className='display-3'>Welcome To Our App!</h3>
                    <p className='lead'>Your account was successfully created! </p>
                    <hr className='my-2' />
                    <p>It you want to start using this app, you have to confirm the link in your email.</p>
                    <p className='lead'>
                        If you have confirmed your email pls login here  <LoginModal/>
                    </p>
                </Jumbotron>
                }


            </Container>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { })(HomePage);
