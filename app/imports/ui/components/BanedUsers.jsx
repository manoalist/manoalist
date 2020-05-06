import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Segment, Header, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { User } from '../../api/user/User';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class BanedUsers extends React.Component {
  restoreUser = () => {
    User.update({ _id: this.props.user._id }, { $set: { isBanned: 'true' } });
  };

  render() {
    return (
        <Segment>
          <Header as={'h4'}>
            {this.props.user.email}
            <Button floated='right' size='tiny' onClick={this.restoreUser}>Restore</Button>
            <Header.Subheader>
              {this.props.user.firstName} {this.props.user.lastName}
            </Header.Subheader>
            <Segment/>
          </Header>
        </Segment>
    );
  }
}

/** Require a document to be passed to this component. */
BanedUsers.propTypes = {
  user: PropTypes.array,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('UserAdmin');
  return {
    user: User.find({}).fetch(),
    ready: subscription.ready(),
  };
})(BanedUsers);
