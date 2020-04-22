import React from 'react';
import { Card, Image, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ItemItem extends React.Component {
  render() {
    return (
        <Link to={`/details/${this.props.item._id}`}>
        <Card centered>
          <Container style={{ height: '300px' }}>
              <Image centered src={this.props.item.picture} style={{ maxHeight: '300px' }}/>
          </Container>
          <Card.Content>
              <Card.Header>{this.props.item.name}</Card.Header>
              <Card.Meta>price: ${this.props.item.price}</Card.Meta>
              <Card.Meta>quantity: {this.props.item.quantity}</Card.Meta>
              <Card.Description>{this.props.item.description}</Card.Description>
              <Card.Meta>post at {this.props.item.createdAt.toLocaleDateString('en-US')}</Card.Meta>
          </Card.Content>
          <Card.Content extra>
                Contact Information: <a href={'/profile'}>{this.props.item.owner}</a>
          </Card.Content>
        </Card>
        </Link>
    );
  }
}

/** Require a document to be passed to this component. */
ItemItem.propTypes = {
  item: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ItemItem);
