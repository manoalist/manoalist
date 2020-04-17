import React from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class AdminBan extends React.Component {
  render() {
    return (
      <Segment>
        <Header as='h4'>
          {this.props.item.name}
          <Button floated='right' color='red' size='tiny'>Ban User</Button>
          <Button floated='right' size='tiny'>Delete</Button>
          <Header.Subheader>
            {this.props.item.owner}
          </Header.Subheader>
        </Header>
      </Segment>
    );
  }
}

/** Require a document to be passed to this component. */
AdminBan.propTypes = {
  item: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(AdminBan);
