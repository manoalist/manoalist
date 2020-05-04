import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { User } from '../../api/user/User';

/** A simple component to render a user's profile pic for the nav bar. */
class UserAvatar extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active/>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Image avatar src={this.props.user.image}/>
    );
  }
}

/** Declare the types of all properties. */
UserAvatar.propTypes = {
  user: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription = Meteor.subscribe('User');
  return {
    user: User.findOne({}),
    ready: subscription.ready(),
  };
})(UserAvatar);
