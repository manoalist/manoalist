import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Loader, Grid, Image, Button, Divider, Icon, Rating, Label } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Items } from '../../api/item/Item';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ItemPage extends React.Component {

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
                    <Image className='item-pic' src={this.props.items[0].picture} fluid/>
                  </Grid.Column>
                </Grid>
              </Grid.Row>
            </Grid>
            <Divider/>
            <Grid.Row className='seller-section'>
              <Header as='h2'>SELLER</Header>
              <Header as='h3'>
                <Image className='user-pic' circular
                       src={this.props.items[0].ownerImage}/>
                {this.props.items[0].owner}
              </Header>
              <Rating icon='star' defaultRating={4} maxRating={5}/>
            </Grid.Row>
          </Grid.Column>

          <Grid.Column textAlign="left" width={8}>
            <Button toggle icon='heart' color='red' inverted circular floated='right'/>
            <Grid>
              <Grid.Row>
                <Header as='h1'>{this.props.items[0].name}</Header>
                <Label color='black'>{this.props.items[0].categoryGroup}</Label>
                <Label color='black'>{this.props.items[0].categoryName}</Label>
                <Header as='h1'>${this.props.items[0].price}</Header>
              </Grid.Row>
              <Grid.Row className='item-row'>
                <Header as='h4'>{this.props.items[0].quantity} available</Header>
              </Grid.Row>
              <Grid.Row className='item-row'>
                <Header as="h4">DESCRIPTION</Header>
                <Header.Subheader>{this.props.items[0].description}</Header.Subheader>
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
  items: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  // Get access to Items and User documents.
  const itemID = match.params._id;
  const subscription = Meteor.subscribe('Items');
  return {
    items: Items.find({ _id: itemID }).fetch(),
    ready: subscription.ready(),
  };
})(ItemPage);
