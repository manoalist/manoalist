import React from 'react';
import { Meteor } from 'meteor/meteor';
import {
  Header,
  Loader,
  Grid,
  Image,
  Button,
  Divider,
  Icon,
  Rating,
  Label,
  Segment,
  Form,
  Message, Comment, Container,
} from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import swal from 'sweetalert';
import { Items } from '../../api/item/Item';
import { User } from '../../api/user/User';
import { Ratings } from '../../api/ratings/Ratings';
import RatingItem from '../components/RatingItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ItemPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buyerRating: 0,
      review: '',
      error: '',
    };
  }

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

  handleSold = () => {
    // list is a list of buyers, need to change when issue-122 done, so this warning is fine
    const list = ['john@foo.com', 'jack@hawaii.edu', 'rose@hawaii.edu'];
    const tempBuyer = [];
    list.map((i) => tempBuyer.push([i, i]));
    // change the array to object in ({'john@foo.com': 'john@foo.com'}) format
    const buyers = Object.fromEntries(tempBuyer);
    Swal.fire({
      title: 'Sold Item',
      text: 'Select Your item Buyer ',
      input: 'select',
      inputOptions: buyers,
      showCancelButton: true,
      inputPlaceholder: 'Select a user',
    }).then((result) => {
      if (result.value) {
        Items.update({ _id: this.props.items._id.toString() },
            { $set: { buyer: result.value, sold: true } });
        Swal.fire('Success', 'The Item is sold!', 'success');
      } else if (result.value === '') {
        Swal.fire('Error', 'Sold canceled. You did not select a user', 'error');
      }
    });
};

  handleRating = (e, data) => {
    this.setState({ buyerRating: data.rating });
  };

  handleReview = (e, data) => {
    this.setState({ review: data.value });
  };

  submit = () => {
    if (this.state.buyerRating === 0) {
      this.setState({ error: 'You forget to rate!' });
    } else {
      Ratings.insert({ raterEmail: User.findOne({}).email, raterImage: User.findOne({}).image,
        target: this.props.items.owner, rating: this.state.buyerRating,
        comment: this.state.review, createdAt: new Date() }, (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          // eslint-disable-next-line no-undef
          swal('Success', 'Rating successfully', 'success').then(() => window.location.reload());
        }
      });
    }
  };

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Retrieving Item Data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const ratings = Ratings.find({}, { sort: { createdAt: -1 } }).fetch()
        .filter(rate => rate.target === this.props.items.owner);
    const ratingsForSeller = Ratings.find({ target: this.props.items.owner }).fetch();
    const averageRating =
        Math.round((ratingsForSeller.reduce((pre, cur) => pre + cur.rating, 0) / ratingsForSeller.length) * 100) / 100;
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
              <Rating icon='star' defaultRating={averageRating} maxRating={5} disabled/>
              <Label content={averageRating} color={'yellow'} position={'right'}/>
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
          <Grid.Row>
            {Meteor.user().username === this.props.items.owner ?
                <Button floated={'right'} color='red' icon labelPosition='right'
                        onClick={this.handleSold} disabled={this.props.items.sold}>
                  <Icon name='dollar sign'/>
                  Sold
                </Button> : ''}
            {Meteor.user().username === this.props.items.owner ?
                <Button floated={'right'} color='blue' icon labelPosition='right'
                        as={NavLink} exact to={`/editItem/${this.props.items._id}`}><Icon name='edit'/>
                  Edit
                </Button> : ''}
          </Grid.Row>
          <Grid.Row>
            {Meteor.user().username === this.props.items.buyer ?
                <div>
                  <Segment><Header content={'Write a Review'}/>
                    <Rating icon='star'
                            defaultRating={0}
                            maxRating={5}
                            size={'massive'} onRate={this.handleRating}/>
                    {this.state.error ? <Message
                        error
                        content={this.state.error}
                    /> : ''}
                            <Form onSubmit={this.submit}>
                              <Form.TextArea required
                                             label='Comment'
                                             name='comment'
                                             type='content'
                                             placeholder='Describe your experience...'
                                             onChange={this.handleReview}
                              />
                              <Form.Field
                                  control={Button}
                                  content='Submit'
                              />
                            </Form>
                  </Segment>
                </div>
                : ''}
            {ratings.length > 0 ? <Comment.Group size={'big'}>{ratings
                    .map((rating, index) => <RatingItem rating={rating} key={index}/>)}
                </Comment.Group>
                : <Header as={Container} textAlign={'center'}>There is no rating for you</Header>}
          </Grid.Row>
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
  const subscription3 = Meteor.subscribe('Ratings');
  return {
    items: Items.find({ _id: itemID }).fetch()[0],
    ready: subscription.ready() && subscription2.ready() && subscription3.ready(),
  };
})(ItemPage);
