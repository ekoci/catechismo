import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {register} from '../../actions/authAction';
import {clearErrors} from '../../actions/errorActions';
import {getSubscriptions} from "../../actions/subscriptionAction";
import SubscriptionCard from "../SubscriptionCard";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert,
    Container,
    Row,
    Col
} from 'reactstrap';


class RegisterModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            name: '',
            surname: '',
            email: '',
            password: '',
            msg: null,
            subscriptionId: null
        };
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        isRegistered: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        getSubscriptions: PropTypes.func.isRequired,
        subscription: PropTypes.object.isRequired,
    };

    componentDidMount() {
        this.props.getSubscriptions();
    }

    componentDidUpdate(prevProps) {
        const {error, isAuthenticated, isRegistered} = this.props;

        // check if there is new error after update
        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === 'REGISTER_FAIL') {
                this.setState({msg: error.msg});
            } else {
                this.setState({msg: null});
            }
        }
        // if authenticated close modal
        if (this.state.modal && isRegistered) {
            this.toggle();
        }
    }

    toggle = () => {
        // clear errors
        this.props.clearErrors();

        this.setState({
            modal: !this.state.modal,
        });
    };

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    onSubmit = (e) => {
        e.preventDefault();
        const {name, surname, email, password } = this.state;
        const subscriptionId = this.props.subscriptionId;
        const newUser = {
            name,
            surname,
            email,
            password,
            subscriptionId
        };
        this.props.register(newUser);
    };

    render() {

        const {subscriptions} = this.props.subscription;

        return (
            <Fragment>
                <NavLink onClick={this.toggle} className='cursorPointer'>
                    <strong>Register</strong>
                </NavLink>

                <Modal isOpen={this.state.modal} toggle={this.toggle}  size="lg">
                    <ModalHeader toggle={this.toggle}> Register new user </ModalHeader>
                    <ModalBody>
                        {this.state.msg ? <Alert color='danger'>{this.state.msg}</Alert> : ''}
                        <Form onSubmit={this.onSubmit}>
                            <Row form> <Col md={6}>
                                <FormGroup>
                                    <Label for='name'>Name</Label>
                                    <Input type='text' name='name' id='name' placeholder='Name' className='mb-3'
                                           onChange={this.onChange}/>
                                </FormGroup>
                            </Col>

                                <Col md={6}>
                                    <FormGroup>
                                        <Label for='surname'>Surname</Label>
                                        <Input type='text' name='surname' id='surname' placeholder='Surname'
                                               className='mb-3'
                                               onChange={this.onChange}/>
                                    </FormGroup></Col>
                            </Row>

                            <Row form>
                                <Col md={6}>
                                    <FormGroup>

                                        <Label for='email'>Email</Label>
                                        <Input f type='email' name='email' id='email' placeholder='Email'
                                               className='mb-3'
                                               onChange={this.onChange}/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for='password'>Password</Label>
                                        <Input type='password' name='password' id='password' placeholder='Password'
                                               className='mb-3' onChange={this.onChange}/>
                                    </FormGroup>
                                </Col></Row>

                                <Row form>
                                    {subscriptions.length === 0
                                        ? <h4 className='mt-5 text-secondary text-center'>No Videos</h4>
                                        : subscriptions.map((subscription, idx) =>
                                            <Col md={3} key={`subs-${idx}`}>
                                                <FormGroup>
                                                    <SubscriptionCard subscription={subscription} />
                                                </FormGroup>
                                            </Col>
                                        )}
                                </Row>
                                <Button color="primary"  block>Register</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </Fragment>
    );
    }
    }

    const mapStateToProps = state => ({
        isAuthenticated: state.auth.isAuthenticated,
        isRegistered: state.auth.isRegistered,
        error: state.error,
        subscription: state.subscription,
        subscriptionId: state.subscription.selectedSubscription
    });

    export default connect(mapStateToProps, {register, clearErrors, getSubscriptions})(RegisterModal);
