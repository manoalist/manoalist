import React from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Items } from '../../api/item/Item';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class AdminApproveItem extends React.Component {

  approveItem =() => Items.update({ _id: this.props.item._id.toString() }, { $set: { approvedForSale: 'true' } });

  deleteItem = () => Items.remove({ _id: this.props.item._id.toString() });

  render() {
    return (
      <Segment>
        <Header as='h4'>
          {this.props.item.name}
          <Button floated='right' color='green' size='tiny' onClick={this.approveItem}>Approve</Button>
          <Button floated='right' size='tiny' onClick={this.deleteItem}>Delete</Button>
          <Header.Subheader>
            {this.props.item.owner}
          </Header.Subheader>
        </Header>
      </Segment>
    );
  }
}

/** Require a document to be passed to this component. */
AdminApproveItem.propTypes = {
  item: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(AdminApproveItem);
