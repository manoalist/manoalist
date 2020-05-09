import React from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Container, Card, Header, Loader, Divider, Pagination, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Items } from '../../api/item/Item';
import ItemItem from '../components/ItemItem';
import { User } from '../../api/user/User';

/** a page filled with a user's liked items */
class Likes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
  }

  handleChange = (e, data) => {
    this.setState({ activePage: data.activePage });
  };

  render() {
    return (this.props.ready) ? this.renderPage() :
        <Loader active>Loading your likes</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    /** filter out items for sale then by users likes */
    const availItems = this.props.items.filter(item => item.forSale === true)
        .filter(item => item.approvedForSale === true)
        .filter(item => item.sold === false);
    const likes = _.filter(availItems, (item) => _.contains(this.props.user.likedItems, item._id));

    return (
        <Container textAlign={'center'}>
          <Header as={'h1'} style={{ paddingTop: '20px' }}>My Likes</Header>
          <Divider style={{ paddingBottom: '10px' }}/>
          {(likes.length === 0) ?
              <Container className={'no-items-message'} textAlign={'center'}>
                <Header as={'h3'} icon>
                  <Icon name={'meh outline'}/>Sorry! No items were found.</Header>
              </Container> :
              <Card.Group itemsPerRow={4}>
                {likes.slice((this.state.activePage - 1) * 20, this.state.activePage * 20)
                    .map((item, index) => <ItemItem key={index} item={item}/>)}
              </Card.Group>
          }
          <Divider style={{ marginTop: '60px', marginBottom: '20px' }}/>
          <Container textAlign={'center'} style={{ paddingBottom: '30px' }}>
            <Pagination
                defaultActivePage={1}
                ellipsisItem={{ content: <Icon name='ellipsis horizontal'/>, icon: true }}
                firstItem={{ content: <Icon name='angle double left'/>, icon: true }}
                lastItem={{ content: <Icon name='angle double right'/>, icon: true }}
                prevItem={{ content: <Icon name='angle left'/>, icon: true }}
                nextItem={{ content: <Icon name='angle right'/>, icon: true }}
                totalPages={Math.ceil(likes.length / 20)}
                onPageChange={this.handleChange}
            />
          </Container>
        </Container>
    );
  }
}

Likes.propTypes = {
  items: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Items');
  const subscription2 = Meteor.subscribe('User');
  return {
    items: Items.find({}).fetch(),
    user: User.find({}).fetch()[0],
    ready: subscription.ready() && subscription2.ready(),
  };
})(Likes);
