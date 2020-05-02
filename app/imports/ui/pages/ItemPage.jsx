import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Loader, Grid, Image, Button, Divider, Icon, Rating, Label } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Items } from '../../api/item/Item';
import { User } from '../../api/user/User';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ItemPage extends React.Component {
  addLike = () => {
    if (!User.findOne({}).likedItems.includes(this.props.items._id)) {
      Items.update({ _id: this.props.items._id.toString() },
          { $set: { numberOfLike: this.props.items.numberOfLike + 1 } });
      User.update({ _id: User.findOne({})._id },
          { $push: { likedItems: this.props.items._id } });
    } else {
      Items.update({ _id: this.props.items._id.toString() },
          { $set: { numberOfLike: this.props.items.numberOfLike - 1 } });
      User.update({ _id: User.findOne({})._id },
          { $pull: { likedItems: this.props.items._id } });
    }
  };

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Retrieving Item Data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Grid className='item-page' container relaxed='very' columns={2}>
          <Grid.Column width={8}>
            <Grid className='item-pics-section'>
              <Grid.Row>
                <Grid centered columns={2}>
                  <Grid.Column width={4}>
                    <Grid.Row>
                      <Image className='item-preview' src={'https://mk0lemarkfrqvciop01u.kinstacdn.com' +
                      '/wp-content/uploads/Your-Image-Here-1.jpg'}/>
                    </Grid.Row>
                    <Grid.Row>
                      <Image className='item-preview' src={'https://mk0lemarkfrqvciop01u.kinstacdn.com' +
                      '/wp-content/uploads/Your-Image-Here-1.jpg'}/>
                    </Grid.Row>
                    <Grid.Row>
                      <Image className='item-preview' src={'https://mk0lemarkfrqvciop01u.kinstacdn.com' +
                      '/wp-content/uploads/Your-Image-Here-1.jpg'}/>
                    </Grid.Row>
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <Image className='item-pic' src={this.props.items.picture} fluid/>
                  </Grid.Column>
                </Grid>
              </Grid.Row>
            </Grid>
            <Divider/>
            <Grid.Row className='seller-section'>
              <Header as='h2'>SELLER</Header>
              <Header as='h3'>
                <Image className='user-pic' circular
                       src={this.props.items.ownerImage}/>
                {this.props.items.owner}
              </Header>
              <Rating icon='star' defaultRating={4} maxRating={5}/>
            </Grid.Row>
          </Grid.Column>

          <Grid.Column textAlign="left" width={8}>
            <Button icon='heart' floated='right' onClick={this.addLike}
                    label={{ basic: true, color: 'red', pointing: 'left', content: this.props.items.numberOfLike }}
                    color={User.findOne({}).likedItems.includes(this.props.items._id) ? 'red' : null}/>
            <Grid>
              <Grid.Row>
                <Header as='h1'>{this.props.items.name}</Header>
                <Label color='black'>{this.props.items.categoryGroup}</Label>
                <Label color='black'>{this.props.items.categoryName}</Label>
                <Header as='h1'>${this.props.items.price}</Header>
              </Grid.Row>
              <Grid.Row className='item-row'>
                <Header as='h4'>{this.props.items.quantity} available</Header>
              </Grid.Row>
              <Grid.Row className='item-row'>
                <Header as="h4">DESCRIPTION</Header>
                <Header.Subheader>{this.props.items.description}</Header.Subheader>
              </Grid.Row>
              <Grid.Row className='item-row'>
                <Header as="h4">CONTACT</Header>
                <Button color='black' icon labelPosition='right'>
                  <Icon name='mail'/>
                  EMAIL
                </Button>
                <Button color='black' icon labelPosition='right'>
                  <Icon name='mobile alternate'/>
                  TEXT
                </Button>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require an array of Items documents in the props. */
ItemPage.propTypes = {
  items: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  // Get access to Items and User documents.
  const itemID = match.params._id;
  const subscription = Meteor.subscribe('Items');
  const subscription2 = Meteor.subscribe('User');
  return {
    items: Items.find({ _id: itemID }).fetch()[0],
    ready: subscription.ready() && subscription2.ready(),
  };
})(ItemPage);
