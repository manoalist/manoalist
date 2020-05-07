import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import {
  Header,
  Grid,
  Icon,
  Container,
  Image,
  Divider,
  Segment,
  Button,
  Loader,
  Dropdown,
  Label,
  Form,
} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Items } from '../../api/item/Item';
import { Contactus } from '../../api/mail/Contactus';
import { User } from '../../api/user/User';
import AdminBan from '../components/AdminBan';
import AdminApproveItem from '../components/AdminApproveItem';
import EmailItem from '../components/EmailItem';
import BannedUsers from '../components/BannedUsers';

class HomeAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openInbox: false,
      openSendEmail: false,
      recipientError: false,
      openRestore: false,
      recipient: '',
      subject: '',
      content: '',
    };
    this.renderPage = this.renderPage.bind(this);
  }

  handleOpenInbox = () => {
    this.setState({ openInbox: true });
  };

  handleOpenSendEmail = () => {
    this.setState({ openSendEmail: true });
  };

  handleOpenRestore = () => {
    this.setState({ openRestore: true });
  };

  handleClose = () => {
    this.setState({ openInbox: false, openSendEmail: false });
  };

  handleCloseRestore = () => {
    this.setState({ openRestore: false });
  };

  handleSubmit = () => {
    const { recipient, subject, content } = this.state;
    const name = 'Admin';
    const createdAt = new Date();
    const beRead = false;
    const issueType = 'Notification';
    const email = Meteor.user().username;
    if (recipient === '') {
      this.setState({ recipientError: true });
    } else {
      Contactus.insert({ name, subject, issueType, content, email, createdAt, beRead, recipient });
      swal('Success', 'Message is sent', 'success');
      this.handleClose();
    }
  };

  handleFormChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Retrieving Item Data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
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
    const me = Meteor.user().username;
    const innerStyle = {
      position: 'absolute',
      width: '80%',
      height: '70%',
      left: '10%',
      top: '10%',
      margin: 'auto',
    };
    const popupStyle2 = {
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
    const innerStyle2 = {
      position: 'absolute',
      width: '50%',
      height: '500px',
      left: '25%',
      top: '10%',
      margin: 'auto',
    };
    const userOptions = [];
    User.find({}).fetch().map((user) => userOptions.push({ key: user._id, value: user.email, text: user.email }));
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
            <Grid columns={ 5 }
                  container>
              <Grid.Column as={NavLink} exact to={'/list'} textAlign={'center'}>
                <Icon name={'spy'} size={'huge'}/>
                <Header as={'h3'} content={'Monitor Items'}/>
              </Grid.Column>
              <Grid.Column textAlign={'center'} style={{ color: '#4183c4' }}
                           onClick={this.handleOpenRestore}>
                <Icon link name={'user doctor'} size={'huge'}/>
                <Header as={'h3'} content={'Baned Users'}/>
              </Grid.Column>
              <Grid.Column as={NavLink} exact to={'/addCate'} textAlign={'center'}>
                <Icon name={'add circle'} size={'huge'}/>
                <Header as={'h3'} content={'Create New Categories'}/>
              </Grid.Column>
              <Grid.Column textAlign={'center'} style={{ color: '#4183c4' }}
                           onClick={this.handleOpenSendEmail}>
                <Icon link name={'comment alternate outline'} size={'huge'}/>
                <Header as={'h3'} content={'Send Notification'}/>
              </Grid.Column>
              <Grid.Column textAlign={'center'} style={{ color: '#4183c4' }}
                           onClick={this.handleOpenInbox}>
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
                    .filter(item => item.owner !== me)
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
          {/* send notification POPUP */}
          {this.state.openSendEmail ? <div style={popupStyle}>
            <Segment style={innerStyle}>
              <Button icon={'close'} floated={'right'} circular onClick={this.handleClose}/>
              <Header as={'h1'} textAlign={'center'} content={'SEND EMAIL'}/>
              <Divider/>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field required label={'Recipient'}/>
                <Form.Field><Dropdown
                    fluid
                    name={'recipient'}
                    options={userOptions}
                    placeholder='User Email Address'
                    onChange={this.handleFormChange}
                    selection
                    search/>
                  {this.state.recipientError ? <Label pointing size={'large'}
                          prompt>
                    <Icon name={'warning circle'}/>
                    Please fill out this field
                  </Label> : ''}
                </Form.Field>
                <Form.Input required
                            label='Subject'
                            type='subject'
                            name='subject'
                            onChange={this.handleFormChange}
                            placeholder='Subject'/>
                <Form.TextArea style={{ maxHeight: 162, height: 162 }}
                               required
                               label='Content'
                               name='content'
                               onChange={this.handleFormChange}
                               type='content'/>
                <Form.Button content='Send' color={'blue'}/>
              </Form>
            </Segment>
          </div> : ''}
          {this.state.openRestore ? <div style={popupStyle2}>
            <Segment style={innerStyle2}>
              <Button icon={'close'}
                      floated={'right'}
                      circular
                      onClick={this.handleCloseRestore}/>
              <Header as={'h1'}
                      textAlign={'center'}
                      content={'Banned Users List'}/>
              <Divider/>
              <Segment.Group style={{ height: '80%', overflow: 'auto' }}>
                {this.props.users
                    .filter(user => user.isBanned === true)
                    .map((user, index) => <BannedUsers user={user} key={index}/>)}
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
  users: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription = Meteor.subscribe('Items');
  const subscription2 = Meteor.subscribe('Contactus');
  const subscription3 = Meteor.subscribe('UserAdmin');
  return {
    users: User.find({}).fetch(),
    items: Items.find({}).fetch(),
    emails: Contactus.find({ recipient: 'admin' }).fetch(),
    ready: subscription.ready() && subscription2.ready() && subscription3.ready(),
  };
})(HomeAdmin);
