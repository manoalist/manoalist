import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader, Divider, Input,
         Pagination, Icon, Breadcrumb, Grid, Dropdown } from 'semantic-ui-react';
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
      sortBy: 'createdAt',
      order: 'desc',
      search: '',
    };
  }

  handleChange = (e, data) => {
    this.setState({ activePage: data.activePage });
  };

  handleSearch = () => {
    /* eslint-env browser */
    if (this.state.search) {
      window.location.href = `${window.location.origin}/#/list/${this.state.search
        .replace(/\+/g, '%2B').replace(/\\/g, '%5C').replace(/\*/g, '%2A').replace(/\//g, '%2F')}/search`;
    }
  };

  handleInputChange = (e) => {
    this.setState({ search: e.target.value });
  };

  pressEnter = (event) => {
    if (event.keyCode === 13) {
      this.handleSearch();
    }
  };

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() :
        <Loader active>Getting data</Loader>;
  }

  handleDropdownChange = (event, data, dropdown) => {
    this.setState({ [dropdown]: data.value });
  };

  renderCards() {
    const sortItem = this.state.sortBy;

    return (this.props.items.sort((a, b) => {
      if (this.state.sortBy === 'createdAt') {
        if (this.state.order === 'asc') {
          if (a[sortItem].getTime() > b[sortItem].getTime()) {
            return 1;
          } if (a[sortItem].getTime() < b[sortItem].getTime()) {
            return -1;
          }
            return 0;
        }
          if (a[sortItem].getTime() > b[sortItem].getTime()) {
            return -1;
          } if (a[sortItem].getTime() < b[sortItem].getTime()) {
            return 1;
          }
            return 0;
      }
        if (this.state.order === 'asc') {
          if (a[sortItem] > b[sortItem]) {
            return 1;
          } if (a[sortItem] < b[sortItem]) {
            return -1;
          }
            return 0;
        }
          if (a[sortItem] > b[sortItem]) {
            return -1;
          } if (a[sortItem] < b[sortItem]) {
            return 1;
          }
            return 0;
    })
    .filter(item => item.forSale === true)
    .filter(item => item.approvedForSale === true)
    .filter(item => item.sold === false)
    .slice((this.state.activePage - 1) * 20, this.state.activePage * 20)
    .map((item, index) => <ItemItem key={index} item={item}/>));
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    const listings = this.props.items.filter(item => item.forSale === true)
        .filter(item => item.approvedForSale === true)
        .filter(item => item.sold === false);

    const filterOptions = [
      {
        key: 'Date Posted',
        text: 'Date Posted',
        value: 'createdAt',
      },
      {
        key: 'Price',
        text: 'Price',
        value: 'price',
      },
      {
        key: 'Quantity',
        text: 'Quantity',
        value: 'quantity',
      },
      {
        key: 'Popularity',
        text: 'Popularity',
        value: 'numberOfLike',
      },
    ];

    const sortBy = [
      {
        key: 'asc',
        text: 'Ascending',
        value: 'asc',
      },
      {
        key: 'desc',
        text: 'Descending',
        value: 'desc',
      },
    ];

    return (
        <Container textAlign={'center'}>
          <Breadcrumb size={'massive'}>
            <Breadcrumb.Section href={'#/list'}>All Items</Breadcrumb.Section>
            { this.props.group !== '' ? (<Breadcrumb.Divider/>) : ''}
            { this.props.group !== '' && this.props.name !== 'search' ?
                (<Breadcrumb.Section active={this.props.name === ''} href={`#/list/${this.props.group}/null`}>
                  {this.props.group}</Breadcrumb.Section>) : ''}
            { this.props.group !== '' && this.props.name === 'search' ?
                (<Breadcrumb.Section active={this.props.name === ''}>{this.props.group}</Breadcrumb.Section>) : ''}
            { this.props.name !== '' ? (<Breadcrumb.Divider/>) : ''}
            { this.props.name !== '' && this.props.name !== 'search' ?
                (<Breadcrumb.Section active link>{this.props.name}</Breadcrumb.Section>) : ''}
          </Breadcrumb>
          <Grid.Row textAlign={'center'} style={{ margin: '1em 0em' }}>
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
          </Grid.Row>
          <Grid.Row>
            <Grid columns={3} stackable>
              <Grid.Column textAlign={'left'} width={6} style={{ paddingTop: '2em' }}>
                <Input icon='search' placeholder='Search...'
                    onChange={this.handleInputChange} onKeyDown={ this.pressEnter }
                    style={{ width: '100%' }}/>
              </Grid.Column>
              <Grid.Column width={4} textAlign={'left'} floated={'right'}>
                <Grid.Row>
                  <label>Sort By</label>
                </Grid.Row>
                <Grid.Row>
                  <Dropdown
                    placeholder='Sort By'
                    selection
                    defaultValue='createdAt'
                    options={filterOptions}
                    onChange={(event, data) => this.handleDropdownChange(event, data, 'sortBy')}
                  />
                </Grid.Row>
              </Grid.Column>
              <Grid.Column width={4} textAlign={'left'}>
                <Grid.Row>
                  <label>Order</label>
                </Grid.Row>
                <Grid.Row>
                  <Dropdown
                    placeholder='Order'
                    selection
                    defaultValue='desc'
                    options={sortBy}
                    onChange={(event, data) => this.handleDropdownChange(event, data, 'order')}
                  />
                </Grid.Row>
              </Grid.Column>
            </Grid>
          </Grid.Row>
          <Divider/>
          {(listings.length === 0) ?
              <Container className={'no-items-message'} textAlign={'center'}>
                <Header as={'h3'} icon>
                  <Icon name={'meh outline'}/>Sorry! No items were found.</Header>
              </Container> :
              <Card.Group itemsPerRow={4}>
                { this.renderCards() }
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
  group: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Items');
  let documentGroup = match.params.group;
  const documentName = match.params.name;
  if (documentGroup === undefined) {
    return {
      items: Items.find({}).fetch(),
      ready: subscription.ready(),
      group: '',
      name: '',
    };
  }
  if (documentName === 'null') {
    return {
      items: Items.find({ categoryGroup: documentGroup }).fetch(),
      ready: subscription.ready(),
      group: documentGroup,
      name: '',
    };
  }
  if (documentName === 'search') {
    // Convert %encoded characters back to normal for searching in case it doesn't auto convert
    documentGroup = documentGroup.replace(/%2B/g, '+').replace(/%5C/g, '\\').replace(/%2A/g, '*').replace(/%2F/g, '/');
    return {
      items: Items.find({
        // eslint-disable-next-line no-useless-escape
        $or: [{ name: { $regex: documentGroup.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), $options: 'i' } },
          // eslint-disable-next-line no-useless-escape
          { categoryGroup: { $regex: documentGroup.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), $options: 'i' } },
          // eslint-disable-next-line no-useless-escape
          { categoryName: { $regex: documentGroup.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), $options: 'i' } }],
      }).fetch(),
      ready: subscription.ready(),
      group: documentGroup,
      name: 'search',
    };
  }
  return {
    items: Items.find({ categoryName: documentName }).fetch(),
    ready: subscription.ready(),
    group: documentGroup,
    name: documentName,
  };
})(ListItem);
