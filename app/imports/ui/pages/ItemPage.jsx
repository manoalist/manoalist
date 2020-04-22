import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Grid, Image, Button, Divider } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Items } from '../../api/item/Item';
import { User } from '../../api/user/User';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ItemPage extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting Item Data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
        <Grid columns={2}>
          <Grid.Column width={8}>
            <Image floated='right' src={this.props.items.picture} size={'medium'}/>
          </Grid.Column>
          <Grid.Column textAlign="left" width={8}>
            {this.props.items.owner}
            <Container>
              <Header as="h2">{this.props.items.name}</Header>
              <Header>${this.props.items.price}</Header>
              <p>Quantity: {this.props.items.quantity}</p>
              <Header as="h4">Description</Header>
              {this.props.items.description}
              <Divider horizontal/>
              <Header as="h4">Contact</Header>
              <Button>EMAIL</Button>
              <Button>TEXT</Button>
            </Container>
          </Grid.Column>
          {this.props.items.owner}
        </Grid>
        </Container>
    );
  }
}

/** Require an array of Items documents in the props. */
ItemPage.propTypes = {
  items: PropTypes.object.isRequired,
  // items: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

export default withTracker(({ match }) => {
  // Get access to Items and User documents.
  const itemID = match.params._id;
  const subscription = Meteor.subscribe('Items');
  const subscription2 = Meteor.subscribe('User');
  return {
    items: Items.findOne({ _id: itemID }),
    user: User.findOne({ _id: itemID }),
    ready: subscription.ready() && subscription2.ready(),
  };
})(ItemPage);
