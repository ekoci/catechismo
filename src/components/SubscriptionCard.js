import React, {Component} from 'react'
import {Button, Card, Image} from 'semantic-ui-react'
import {changeSelectedSubscription} from '../actions/subscriptionAction';
import {connect} from "react-redux";

class SubscriptionCard extends Component {

    state = {
        active: false
}
     chooseSubscription = (e) => {
         e.preventDefault();
        this.props.changeSelectedSubscription(this.props.subscription.id);
    };

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({active : nextProps.active});
    }

    render() {

         return (
             <Card.Group>
                 <Card color={this.state.active ? "red" : ""}>
                     <Card.Content>
                         <Card.Header>{this.props.subscription.name}</Card.Header>
                         <Card.Meta>{this.props.subscription.price} {this.props.subscription.currency}</Card.Meta>
                         <Card.Description>
                             {this.props.subscription.description}
                         </Card.Description>
                     </Card.Content>
                     <Card.Content extra>
                         <div className='ui two buttons'>
                             <Button basic color='green' onClick={this.chooseSubscription}>
                                 Choose
                             </Button>
                         </div>
                     </Card.Content>
                 </Card>
             </Card.Group>
         )
     }
}

const mapStateToProps = (state, ownProps) => {
    if(state.subscription.selectedSubscription === ownProps.subscription.id) {
      return { active : true};
    } else return { active : false};

};

export default connect(mapStateToProps, {changeSelectedSubscription})(SubscriptionCard);