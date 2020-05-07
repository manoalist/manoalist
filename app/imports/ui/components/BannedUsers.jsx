import React from 'react';
import { Segment, Header, Button, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { User } from '../../api/user/User';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class BannedUsers extends React.Component {
  restoreUser = () => {
    User.update({ _id: this.props.user._id }, { $set: { isBanned: 'false' } });
  };

  render() {
    return (
        <Segment>
          <Header as={'h3'}>
            <Image
                floated='left'
                size='mini'
                src= {this.props.user.image}
                circular
            />
            {this.props.user.email}
            <Button floated='right' size='tiny' color={'green'} onClick={this.restoreUser}>Restore</Button>
            <Header.Subheader>
              {this.props.user.firstName} {this.props.user.lastName}
            </Header.Subheader>
          </Header>
        </Segment>
    );
  }
}

/** Require a document to be passed to this component. */
BannedUsers.propTypes = {
  user: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(BannedUsers);
