import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Header, Grid, Icon, Container, Image, Divider, Segment } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Items } from '../../api/item/Item';
import AdminBan from '../components/AdminBan';
import AdminApproveItem from '../components/AdminApproveItem';

class HomeAdmin extends React.Component {
  render() {
    return (
        <div>
          <Image src={'/images/manoalist-circle.png'}
                 size={'small'}
                 centered/>
          <Header as={'h2'}
                  content={'Administrator Page'}
                  textAlign={'center'}/>
          <Divider hidden/>
          <Container style={{ verticalAlign: 'middle' }}>
            <Grid columns={ 3 }
                  container>
              <Grid.Column as={NavLink} exact to={'/list'} textAlign={'center'}>
                <Icon name={'spy'} size={'huge'}/>
                <Header as={'h3'} content={'Monitor Items'}/>
              </Grid.Column>
              <Grid.Column as={NavLink} exact to={'/list'} textAlign={'center'}>
                <Icon name={'add circle'} size={'huge'}/>
                <Header as={'h3'} content={'Create New Categories'}/>
              </Grid.Column>
              <Grid.Column as={NavLink} exact to={'/list'} textAlign={'center'}>
                <Icon name={'comment alternate outline'} size={'huge'}/>
                <Header as={'h3'} content={'Send Notification'}/>
              </Grid.Column>
            </Grid>
            <Divider hidden/>
            <Grid columns={2}>
              <Grid.Column floated='left' width={6}>
                <Header dividing>Reported Items</Header>
                <Segment.Group raised>
                  {this.props.items
                    .filter(item => item.sold === false)
                    .filter(item => item.flagged === true)
                    .map((item, index) => <AdminBan key={index} item={item}/>)}
                </Segment.Group>
              </Grid.Column>
              <Grid.Column floated='right' width={10}>
                <Header dividing>Items Pending Approval</Header>
                <Segment.Group raised>
                  {this.props.items
                    .filter(item => item.forSale === true)
                    .filter(item => item.approvedForSale === false)
                    .map((item, index) => <AdminApproveItem key={index} item={item}/>)}
                </Segment.Group>
              </Grid.Column>
            </Grid>
          </Container>
        </div>
    );
  }
}

HomeAdmin.propTypes = {
  ready: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription = Meteor.subscribe('Items');
  return {
    items: Items.find({}).fetch(),
    ready: subscription.ready(),
  };
})(HomeAdmin);
