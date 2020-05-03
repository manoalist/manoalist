import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { User } from '../../api/user/User';

/** A simple static component to render some text for the landing page. */
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

/** Require an array of StudySessions in the props. */
UserAvatar.propTypes = {
  user: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Sessions.
  const subscription = Meteor.subscribe('User');
  return {
    user: User.findOne({}),
    ready: subscription.ready(),
  };
})(UserAvatar);
