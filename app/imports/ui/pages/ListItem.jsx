import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader, Divider, Pagination, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Items } from '../../api/item/Item';
import ItemItem from '../components/ItemItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
  }

  handleChange = (e, data) => {
    this.setState({ activePage: data.activePage });
  };

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() :
        <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    const listings = this.props.items.filter(item => item.forSale === true)
        .filter(item => item.approvedForSale === true)
        .filter(item => item.sold === false);

    return (
        <Container>
          <Header as="h2"
                  textAlign="center">List Stuff</Header>

          {(listings.length === 0) ?
              <Container className={'no-items-message'} textAlign={'center'}>
                <Header as={'h3'} icon>
                  <Icon name={'meh outline'}/>Sorry! No items were found.</Header>
              </Container> :
              <Card.Group itemsPerRow={4}>
                {this.props.items
                    .filter(item => item.forSale === true)
                    .filter(item => item.approvedForSale === true)
                    .filter(item => item.sold === false)
                    .slice((this.state.activePage - 1) * 20, this.state.activePage * 20)
                    .map((item, index) => <ItemItem key={index} item={item}/>)}
              </Card.Group>
          }
          <Divider/>
          <Container textAlign={'center'}>
            <Pagination
                defaultActivePage={1}
                ellipsisItem={{ content: <Icon name='ellipsis horizontal'/>, icon: true }}
                firstItem={{ content: <Icon name='angle double left'/>, icon: true }}
                lastItem={{ content: <Icon name='angle double right'/>, icon: true }}
                prevItem={{ content: <Icon name='angle left'/>, icon: true }}
                nextItem={{ content: <Icon name='angle right'/>, icon: true }}
                totalPages={Math.ceil(this.props.items
                    .filter(item => item.forSale === true)
                    .filter(item => item.approvedForSale === true)
                    .filter(item => item.sold === false).length / 20)}
                onPageChange={this.handleChange}
            />
          </Container>
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
  const documentGroup = match.params.group;
  const documentName = match.params.name;
  if (documentGroup === undefined) {
    return {
      items: Items.find({}).fetch(),
      ready: subscription.ready(),
    };
  }
  if (documentName === 'null') {
    return {
      items: Items.find({ categoryGroup: documentGroup }).fetch(),
      ready: subscription.ready(),
    };
  }
  if (documentName === 'search') {
    return {
      items: Items.find({
        $or: [{ name: { $regex: documentGroup, $options: 'i' } },
          { categoryGroup: { $regex: documentGroup, $options: 'i' } },
          { categoryName: { $regex: documentGroup, $options: 'i' } }],
      }).fetch(),
      ready: subscription.ready(),
    };
  }
  return {
    items: Items.find({ categoryName: documentName }).fetch(),
    ready: subscription.ready(),
  };
})(ListItem);
