import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Items } from '../../api/item/Item';
import ItemItem from '../components/ItemItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListItem extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">List Stuff</Header>
          <Card.Group itemsPerRow={4}>
            {this.props.items.map((item, index) => <ItemItem
                key={index}
                item={item}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListItem.propTypes = {
  items: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Items');
  const documentName = match.params.name;
  if (documentName === 'all') {
    return {
      items: Items.find({}).fetch(),
      ready: subscription.ready(),
    };
  }
    return {
      items: Items.find({ name: documentName }).fetch(),
      ready: subscription.ready(),
    };
})(ListItem);
