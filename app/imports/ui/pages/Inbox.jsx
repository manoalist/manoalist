import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import EmailItem from '../components/EmailItem';
import { Contactus } from '../../api/mail/Contactus';

class Inbox extends React.Component {
  render() {
    const innerStyle = {
      width: '80%',
      height: '663.59px',
      margin: 'auto',
    };
    return (

          <div style={innerStyle}>
            <Header as={'h1'}
                    textAlign={'center'}
                    content={'INBOX'}/>
            <Divider/>
            <div style={{ height: '80%', overflow: 'auto' }}>
              {this.props.emails.map((email, index) => <EmailItem email={email}
                                                                  key={index}/>)}
              {this.props.emails.length <= 0 ? <Header textAlign={'center'}
                                                       as={'h1'}
                                                       content={'There is no message for you'}/> : ''}
            </div>
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
  return {
    emails: Contactus.find({}).fetch(),
    ready: subscription.ready(),
  };
  })(Inbox);
