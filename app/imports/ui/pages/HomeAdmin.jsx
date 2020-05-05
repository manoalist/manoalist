import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Header, Grid, Icon, Container, Image, Divider, Segment, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Items } from '../../api/item/Item';
import AdminBan from '../components/AdminBan';
import AdminApproveItem from '../components/AdminApproveItem';
import { Contactus } from '../../api/mail/Contactus';
import EmailItem from '../components/EmailItem';
import { User } from '../../api/user/User';

class HomeAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openInbox: false,
    };
  }

  handleOpenInbox = () => {
    this.setState({ openInbox: true });
  };

  handleClose = () => {
    this.setState({ openInbox: false });
  };

  render() {
    const popupStyle = {
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      margin: 'auto',
      backgroundColor: 'rgba(0,0,0, 0.5)',
    };

    const innerStyle = {
      position: 'absolute',
      width: '80%',
      height: '70%',
      left: '10%',
      top: '10%',
      margin: 'auto',
    };
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
            <Grid columns={ 4 }
                  container>
              <Grid.Column as={NavLink} exact to={'/list'} textAlign={'center'}>
                <Icon name={'spy'} size={'huge'}/>
                <Header as={'h3'} content={'Monitor Items'}/>
              </Grid.Column>
              <Grid.Column as={NavLink} exact to={'/addCate'} textAlign={'center'}>
                <Icon name={'add circle'} size={'huge'}/>
                <Header as={'h3'} content={'Create New Categories'}/>
              </Grid.Column>
              <Grid.Column as={NavLink} exact to={'/list'} textAlign={'center'}>
                <Icon name={'comment alternate outline'} size={'huge'}/>
                <Header as={'h3'} content={'Send Notification'}/>
              </Grid.Column>
              <Grid.Column textAlign={'center'} style={{ color: '#4183c4' }} onClick={this.handleOpenInbox}>
                <Icon link name={'envelope'} size={'huge'}/>
                <Header as={'h3'} content={'Inbox'}/>
              </Grid.Column>
            </Grid>
            <Divider hidden/>
            <Grid columns={2}>
              <Grid.Column floated='left' width={8}>
                <Header dividing>Reported Items</Header>
                <Segment.Group raised>
                  {this.props.items
                    .filter(item => item.sold === false)
                    .filter(item => item.flagged === true)
                    .filter(item => item.owner != User.findOne( {}).email)
                    .map((item, index) => <AdminBan key={index} item={item}/>)}
                </Segment.Group>
              </Grid.Column>
              <Grid.Column floated='right' width={8}>
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


          {this.state.openInbox ? <div style={popupStyle}>
            <Segment style={innerStyle}>
              <Button icon={'close'}
                      floated={'right'}
                      circular
                      onClick={this.handleClose}/>
              <Header as={'h1'}
                      textAlign={'center'}
                      content={'INBOX'}/>
              <Divider/>
              <Segment.Group style={{ height: '80%', overflow: 'auto' }}>
                {this.props.emails.map((email, index) => <EmailItem email={email} key={index}/>)}
                {this.props.emails.length <= 0 ? <Header textAlign={'center'} as={'h1'}
                                                         content={'There is no message for you'}/> : ''}
              </Segment.Group>
            </Segment>
          </div> : ''}
        </div>
    );
  }
}

HomeAdmin.propTypes = {
  ready: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  emails: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription = Meteor.subscribe('Items');
  const subscription2 = Meteor.subscribe('Contactus');
  const subscription3 = Meteor.subscribe('User');
  return {
    items: Items.find({}).fetch(),
    emails: Contactus.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready() && subscription3.ready(),
  };
})(HomeAdmin);
