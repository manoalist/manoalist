import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Grid, Image, Button } from 'semantic-ui-react';
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
        <Grid columns={2}>
          <Grid.Column width={8}>
            <Image floated='right' src={this.props.items.picture}/>
          </Grid.Column>
          <Grid.Column textAlign="left" width={8}>
            <Container>
              {this.props.items.owner}
            </Container>
            <Header as="h2">{this.props.items.name}</Header>
            <Container>
              <Header as="h4">Description</Header>
              {this.props.items.description}
            </Container>
            <Container>
              <Header as="h4">Contact</Header>
              <Button>EMAIL</Button>
              <Button>TEXT</Button>
            </Container>
          </Grid.Column>
          <Container>
            {this.props.items.owner}
          </Container>
        </Grid>
    );
  }
}

/** Require an array of Items documents in the props. */
ItemPage.propTypes = {
  items: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

export default withTracker(({ match }) => {
  // Get access to Stuff documents.
  const doc = match.params._id;
  const subscription = Meteor.subscribe('Items');
  const subscription2 = Meteor.subscribe('User');
  return {
    items: Items.findOne(doc),
    user: User.find({}).fetch()[1],
    ready: subscription.ready() && subscription2.ready(),
  };
})(ItemPage);
