import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login} from '../../actions/authAction';
import { clearErrors } from '../../actions/errorActions';
class LoginModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      username: '',
      password: '',
      msg: null,
    };
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;

    // check if there is new error after update
    if (error !== prevProps.error) {
      // Check for login error
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // if authenticated close modal
    if (this.state.modal && isAuthenticated) {
      this.toggle();
    }
  }
    
  toggle = () => {
    // clear errors
    this.props.clearErrors();

    this.setState({
      modal: !this.state.modal,
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    // Create user object
    const user = {
      username,
      password,
    };
    // attempt to login
    this.props.login(user);
  }

  render() {
    return (
      <Fragment>
        <NavLink onClick={this.toggle} className='cursorPointer'>
          <strong>Login</strong>
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Login User
          </ModalHeader>
          <ModalBody>
            { this.state.msg ? <Alert color='danger'>{this.state.msg}</Alert> : '' }
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='email'>Email</Label>
                <Input type='email' name='username' id='username' placeholder='Email' className='mb-3' onChange={this.onChange}/>
                <Label for='password'>Password</Label>
                <Input type='password' name='password' id='password' placeholder='Password' className='mb-3' onChange={this.onChange}/>
                <Button color='primary' className='mt-4' block> Login </Button>
              </FormGroup>
            </Form>
          </ModalBody>

        </Modal>

      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
