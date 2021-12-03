import React, {Component, Fragment} from 'react';
import {Collapse, Container, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import LoginModal from './auth/LoginModal';


class NavbarApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    render() {
        const {isAuthenticated} = this.props.auth;

        const authLinks = (
            <Fragment>
                <NavItem>
                    <NavLink href='/video'><strong>Videos</strong></NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href='/channel'><strong>Channels</strong></NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href='/'><strong>Profile</strong></NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href='/'><strong>Settings</strong></NavLink>
                </NavItem>
                <NavItem>
                    <Logout/>
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal/>
                </NavItem>
                <NavItem>
                    <LoginModal/>
                </NavItem>
            </Fragment>
        );

        return (
            <Navbar style={{backgroundColor: '#EAE6F3'}} expand='md'>
                <Container>
                    <NavbarBrand href='/' className='text-secondary'><strong>Catechismo App</strong></NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className='ml-auto' navbar>
                            {isAuthenticated ? authLinks : guestLinks}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {})(NavbarApp);
