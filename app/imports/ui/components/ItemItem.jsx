import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Card, Image, Container, Button, Loader, Label, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { NavLink } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Items } from '../../api/item/Item';
import { User } from '../../api/user/User';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ItemItem extends React.Component {

  handleClick = () => this.reportItem(this.props.item._id);

  handleDelete = () => {
    swal({
      title: 'Delete',
      text: 'Are you sure you want to delete this item?',
      buttons: {
        cancel: 'Cancel',
        confirm: 'Delete',
      },
    }).then((value) => {
      if (value) {
        Items.remove({ _id: this.props.item._id });
      }
    });
  };

  reportItem(id) {
    swal({
      title: 'Report',
      text: 'Please provide the reason for reporting\n(no more than 100 words):',
      content: 'input',
      buttons: {
        cancel: 'Cancel',
        confirm: 'Report',
      },
    }).then((value) => {
      let str = value;
      if (value !== null) {
        str = str.replace(/(^\s*)|(\s*$)/gi, '');
        str = str.replace(/[ ]{2,}/gi, ' ');
        str = str.replace(/\n /, '\n');
        if (str.split(' ').length <= 100) {
          Items.update({ _id: id.toString() }, { $set: { flagged: 'true' } });
          Items.update({ _id: id.toString() }, { $set: { reportReason: value } });
          swal('Success', 'Report Successfully! We will deal it as soon as possible.', 'success');
        } else {
          swal('Error', 'Input cannot exceed 100 words', 'error');
        }
      }
    });
  }

  addLike = () => {
    if (!User.findOne({}).likedItems.includes(this.props.item._id)) {
      Items.update({ _id: this.props.item._id.toString() },
          { $set: { numberOfLike: this.props.item.numberOfLike + 1 } });
      User.update({ _id: User.findOne({})._id },
          { $push: { likedItems: this.props.item._id } });
    } else {
      Items.update({ _id: this.props.item._id.toString() },
          { $set: { numberOfLike: this.props.item.numberOfLike - 1 } });
      User.update({ _id: User.findOne({})._id },
          { $pull: { likedItems: this.props.item._id } });
    }
  };

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Retrieving Item Data</Loader>;
  }

  renderPage() {
    return (
        <Card centered>
          {Roles.userIsInRole(Meteor.userId(), 'admin') ?
              <Label corner={'right'} color={'red'}>
                <Icon style={{ cursor: 'pointer' }} link name={'close'} onClick={this.handleDelete}/>
              </Label>
              : ''}
          <Container style={{ height: '300px' }} as={NavLink} exact to={`/details/${this.props.item._id}`}>
            <Image centered
                   src={this.props.item.picture.split(',:;')[0]}
                   style={{ maxHeight: '300px' }}/>
          </Container>
            <Card.Content>
              <Card.Header as={NavLink} exact to={`/details/${this.props.item._id}`}>
                {this.props.item.name}</Card.Header>
              <Card.Meta>price: ${this.props.item.price}</Card.Meta>
              <Card.Meta>quantity: {this.props.item.quantity}</Card.Meta>
              <Card.Description>{this.props.item.description}</Card.Description>
              <Card.Meta>post at {this.props.item.createdAt.toLocaleDateString('en-US')}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
              Contact Information: {this.props.item.owner}
            </Card.Content>
          <Card.Content extra>
            <Button content={'report'} disabled={this.props.item.flagged}
                    color={'red'} onClick={this.handleClick} floated={'left'}/>
            <Button toggle icon={'heart'}
                    color={User.findOne({}).likedItems.includes(this.props.item._id) ? 'red' : null}
                    label={{ basic: true, pointing: 'left', content: this.props.item.numberOfLike }}
                    floated={'right'} onClick={this.addLike}/>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
ItemItem.propTypes = {
  item: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('User');
  return {
    ready: subscription.ready(),
  };
})(ItemItem);
