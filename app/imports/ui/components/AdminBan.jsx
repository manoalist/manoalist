import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Segment, Header, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Items } from '../../api/item/Item';
import { User } from '../../api/user/User';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class AdminBan extends React.Component {
  deleteItem = () => Items.remove({ _id: this.props.item._id });

  restoreItem = () => {
    Items.update({ _id: this.props.item._id }, { $set: { flagged: 'false' } });
    Items.update({ _id: this.props.item._id }, { $set: { reportReason: 'None' } });
  };

  banUser = () => {
    const thisUser = User.findOne({ email: this.props.item.owner });
    User.update({ _id: thisUser._id }, { $set: { isBanned: 'true' } });
    Items.remove({ _id: this.props.item._id });
  };

  render() {
    return (
      <Segment>
        <Header as='h4'>
          {this.props.item.name}
          <Button floated='right' color='red' size='tiny' onClick={this.banUser}>Ban User</Button>
          <Button floated='right' size='tiny' onClick={this.deleteItem}>Delete</Button>
          <Button floated='right' size='tiny' onClick={this.restoreItem}>Restore</Button>
          <Header.Subheader>
            {this.props.item.owner}
          </Header.Subheader>
          <Header.Subheader>Reason:</Header.Subheader>
          <Segment content={this.props.item.reportReason}/>
        </Header>
      </Segment>
    );
  }
}

/** Require a document to be passed to this component. */
AdminBan.propTypes = {
  item: PropTypes.object.isRequired,
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
})(AdminBan);
