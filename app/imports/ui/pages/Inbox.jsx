import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Divider, Segment, Button, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import EmailItem from '../components/EmailItem';
import { Contactus } from '../../api/mail/Contactus';
import { User } from '../../api/user/User';

class Inbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openSendEmail: false,
      sendTo: '',
      subject: '',
      content: '',
    };
  }

  // Function sets
  handleClose = () => {
    this.setState({ openSendEmail: false });
  };

  handleFormChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { subject, content } = this.state;
    const recipient = this.state.sendTo;
    const name = User.findOne().firstName;
    const createdAt = new Date();
    const beRead = false;
    const issueType = 'Reply';
    const email = Meteor.user().username;
      Contactus.insert({ name, subject, issueType, content, email, createdAt, beRead, recipient });
      swal('Success', 'Message is sent', 'success');
      this.handleClose();
  };

  render() {
    const inboxStyle = {
      width: '80%',
      height: '663.59px',
      margin: 'auto',
    };
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
      height: '663.59px',
      left: '10%',
      top: '10%',
      margin: 'auto',
    };
    return (

        <div>
          <div style={inboxStyle}>
            <Header as={'h1'}
                    textAlign={'center'}
                    content={'INBOX'}/>
            <Divider/>
            <div style={{ height: '80%', overflow: 'auto' }}>
              {this.props.emails.map((email, index) => <EmailItem email={email}
                                                                  inbox={this}
                                                                  key={index}/>)}
              {this.props.emails.length <= 0 ? <Header textAlign={'center'}
                                                       as={'h1'}
                                                       content={'There is no message for you'}/> : ''}
            </div>
          </div>

          {/* send email POPUP */}
          {this.state.openSendEmail ? <div style={popupStyle}>
            <Segment style={innerStyle}>
              <Button icon={'close'} floated={'right'} circular onClick={this.handleClose}/>
              <Header as={'h1'} textAlign={'center'} content={'SEND EMAIL'}/>
              <Divider/>
              <Form onSubmit={this.handleSubmit}>
                <Header content={`To: ${this.state.sendTo}`}/>
                <Form.Input required
                            label='Subject'
                            type='subject'
                            name='subject'
                            onChange={this.handleFormChange}
                            placeholder='Subject'/>
                <Form.TextArea style={{ maxHeight: 261, height: 261 }}
                               required
                               label='Content'
                               name='content'
                               onChange={this.handleFormChange}
                               type='content'/>
                <Form.Button content='Send' color={'blue'}/>
              </Form>
            </Segment>
          </div> : ''}
        </div>
    );
  }
}

/** Declare the types of all properties. */
Inbox.propTypes = {
  emails: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription = Meteor.subscribe('Email');
  const subscription2 = Meteor.subscribe('User');
  return {
    emails: Contactus.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
  })(Inbox);
