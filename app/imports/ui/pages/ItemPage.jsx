import React from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
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
  Select,
  Message, Comment, Container, Pagination,
} from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';
import { Items } from '../../api/item/Item';
import { User } from '../../api/user/User';
import { Ratings } from '../../api/ratings/Ratings';
import { Contacts } from '../../api/contacts/Contacts';
import RatingItem from '../components/RatingItem';
import { Contactus } from '../../api/mail/Contactus';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ItemPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buyerRating: 0,
      review: '',
      error: '',
      soldPopup: false,
      ratePopup: false,
      openSendEmail: false,
      soldError: '',
      buyer: '',
      activePage: 1,
      thumbnail: '',
      subject: '',
      content: '',
    };
    this.renderPage = this.renderPage.bind(this);
    this.setThumbnail = this.setThumbnail.bind(this);
  }

  setThumbnail(picture) {
    this.setState({ thumbnail: picture });
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
    this.setState({ soldPopup: true });
};

  handleCloseSold = () => {
    this.setState({ soldPopup: false, soldError: '', ratePopup: false, openSendEmail: false });
  };

  handleSelect = (e, data) => {
    this.setState({ buyer: data.value });
  };

  soldConfirm = () => {
    if (this.state.buyer === '') {
      this.setState({ soldError: 'You forgot to select the buyer.' });
    } else {
      Items.update({ _id: this.props.items._id.toString() },
          { $set: { buyer: this.state.buyer, sold: true } });
      swal('Success', 'The Item is sold!', 'success');
      this.handleCloseSold();
      this.setState({ ratePopup: true });
    }
  };

  // rate on change for both buyer rating and seller rating
  handleRating = (e, data) => {
    this.setState({ buyerRating: data.rating });
  };

  // comment on Change for both buyer and seller rating
  handleReview = (e, data) => {
    this.setState({ review: data.value });
  };

  handlePageChange = (e, data) => {
    this.setState({ activePage: data.activePage });
  };

  // send buy email to owner
  handleFormChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  banUser = () => {
    const thisUser = User.findOne({ email: this.props.items.owner });
    const currentId = this.props.items._id;
    const currentURL = `list/${this.props.items.categoryGroup}/${this.props.items.categoryName}`;
    if (!(User.findOne({}).email === this.props.items.owner)) {
      User.update({ _id: thisUser._id }, { $set: { isBanned: 'true' } }, (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          // eslint-disable-next-line no-undef
          swal('Success', 'User Banned', 'success').then(() => {
            // eslint-disable-next-line
            window.location.href = window.location.href.replace(`details/${currentId}`, `${currentURL}`);
            // eslint-disable-next-line no-undef
            window.location.reload();
          });
        }
      });
      Items.remove({ _id: this.props.items._id });
    } else {
      swal('Error', 'can not ban yourself', 'error');
    }
  };

  deleteItem = () => {
    const currentId = this.props.items._id;
    const currentURL = `list/${this.props.items.categoryGroup}/${this.props.items.categoryName}`;
    if (User.findOne({}).likedItems.includes(this.props.items._id)) {
      User.update({ _id: User.findOne({})._id },
          { $pull: { likedItems: this.props.items._id } });
    }
    Items.remove({ _id: this.props.items._id }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        // eslint-disable-next-line no-undef
        swal('Success', 'Item Deleted', 'success').then(() => {
          // eslint-disable-next-line
          window.location.href = window.location.href.replace(`details/${currentId}`, `${currentURL}`);
          // eslint-disable-next-line no-undef
          window.location.reload();
        });
      }
    });
  };

  eMail = () => {
    this.setState({ openSendEmail: true });
  };

  /**
   * Content removed for future implementation
   *
   * sms = () => {
   *  Contacts.insert({ itemId: this.props.items._id, buyer: User.findOne({}).email,
   *  seller: this.props.items.owner, contactDate: new Date() }, (error) => {
   *    if (error) {
   *      // eslint-disable-next-line no-undef
   *      swal('Error', error.message, 'error');
   *    } else {
   *      // eslint-disable-next-line no-undef
   *      swal('Success', 'Contact updated successfully', 'success');
   *    }
   *  });
   * };
   *
   */

  // submit rating to seller
  submit = () => {
    if (this.state.buyerRating === 0) {
      this.setState({ error: 'You forgot to rate!' });
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

  submitRateBuyer = () => {
    if (this.state.buyerRating === 0) {
      this.setState({ error: 'You forgot to rate!' });
    } else {
      Ratings.insert({ raterEmail: User.findOne({}).email, raterImage: User.findOne({}).image,
        target: this.props.items.buyer, rating: this.state.buyerRating,
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

  // send Email to buy item
  handleSendSubmit = () => {
    const { subject, content } = this.state;
    const recipient = this.props.items.owner;
    const name = User.findOne().firstName;
    const createdAt = new Date();
    const beRead = false;
    const issueType = 'Buy';
    const email = Meteor.user().username;
    Contactus.insert({ name, subject, issueType, content, email, createdAt, beRead, recipient }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Message is sent', 'success').then(() => {
          this.handleCloseSold();
          Contacts.insert({ itemId: this.props.items._id, buyer: User.findOne({}).email,
          seller: this.props.items.owner, contactDate: new Date() }, (error2) => {
            if (error2) {
              // eslint-disable-next-line no-undef
              swal('Error', error2.message, 'error');
            }
          });
        });
      }
    });
    swal('Success', 'Message is sent', 'success');
    this.handleCloseSold();
  };

  handleReport(id) {
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

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Retrieving Item Data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const images = this.props.items.picture.split(',:;').map((image) => (
        <Grid.Row key={image} style={{ cursor: 'pointer' }}>
          <Image className='item-preview' src={image} onClick={() => this.setThumbnail(image)}/>
        </Grid.Row>
      ));

    // list is a list of buyers that contacted the seller
    const list = _.uniq(_.pluck(Contacts.find({ itemId: this.props.items._id }).fetch(), 'buyer'));

    const buyers = [];

    list.map((i) => buyers.push({ key: i, value: i, text: i }));
    // change the array to object in ({'john@foo.com': 'john@foo.com'}) format
    // const buyers = Object.fromEntries(tempBuyer);
    const ratings = Ratings.find({}, { sort: { createdAt: -1 } }).fetch()
        .filter(rate => rate.target === this.props.items.owner);

    const ratingsForSeller = Ratings.find({ target: this.props.items.owner }).fetch();

    const averageRating =
        Math.round((ratingsForSeller.reduce((pre, cur) => pre + cur.rating, 0) / ratingsForSeller.length) * 100)
        / 100;

    const popupStyle = {
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      margin: 'auto',
      backgroundColor: 'rgba(0,0,0, 0.5)',
    };

    const innerStyle = {
      position: 'absolute',
      // width: '504px',
      width: '50%',
      left: '25%',
      top: '25%',
      margin: 'auto',
    };

    return (
          <Grid className='item-page'
                 container
                 relaxed='very'
                 columns={2}>
          <Grid.Column width={8}>
            <Grid className='item-pics-section'>
              <Grid.Row>
                <Grid centered
                      columns={2}>
                  <Grid.Column width={4}>
                    {images}
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <Image className='item-pic' fluid
                      src={this.state.thumbnail ? this.state.thumbnail : this.props.items.picture.split(',:;')[0]} />
                  </Grid.Column>
                </Grid>
              </Grid.Row>
            </Grid>
            <Divider/>
            <Grid.Row className='seller-section'>
              <Header as='h2'>SELLER</Header>
              <Header as='h3'>
                <Image className='user-pic'
                       circular
                       src={this.props.items.ownerImage}/>
                {this.props.items.owner}
              </Header>
              <Rating icon='star'
                      defaultRating={averageRating}
                      maxRating={5}
                      disabled/>
              {(Number.isNaN(averageRating)) ? <Label content={'0'} color={'yellow'} position={'right'}/> :
                  <Label content={averageRating} color={'yellow'} position={'right'}/>}
            </Grid.Row>
          </Grid.Column>

          <Grid.Column textAlign="left"
                       width={8}>
            <Button content={'report'} disabled={this.props.items.flagged}
                    color={'red'} onClick={() => this.handleReport(this.props.items._id)} floated={'right'}/>
            <Button icon='heart'
                    floated='right'
                    onClick={this.addLike}
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
              { this.props.items.sold ? <Header color={'red'} content={'This Item has been sold'}/>
              : <Grid.Row className='item-row'>
                <Header as="h4">CONTACT</Header>
                <Button color='black'
                        icon
                        labelPosition='right'
                        onClick={this.eMail}>
                  <Icon name='mail'/>
                  EMAIL
                </Button>
                    { /**
                     <Button color='black'
                     icon
                     labelPosition='right'
                     onClick={this.sms}>
                     <Icon name='mobile alternate'/>
                     TEXT
                     </Button>
                      */
                    }
              </Grid.Row>}
              <Grid.Row>
                {/** If user is owner, they can see edit and sold button */}
                {Meteor.user().username === this.props.items.owner ?
                    <Button floated={'left'}
                            color='green'
                            icon
                            labelPosition='right'
                            onClick={this.handleSold}
                            disabled={this.props.items.sold}>
                      <Icon name='dollar sign'/>
                      Sold
                    </Button> : ''}
                {Meteor.user().username === this.props.items.owner ?
                    <Button floated={'left'}
                            color='blue'
                            icon
                            labelPosition='right'
                            as={NavLink}
                            exact
                            to={`/editItem/${this.props.items._id}/${this.props.items.categoryGroup}`}>
                      <Icon name='edit'/>
                      Edit
                    </Button> : ''}
              </Grid.Row>
              <Grid.Row>
                {/** If user is admin, they can see delete and ban buttons */}
                {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                    <Button floated='left' color='red' labelPosition='right' onClick={
                      this.banUser} icon>
                      <Icon name='user circle outline'/>Ban User
                    </Button>
                ) : ''}
                {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                    <Button floated='left' labelPosition='right' onClick={
                      this.deleteItem} icon>
                      <Icon name='trash alternate'/>Delete
                    </Button>
                ) : ''}
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Row>

            {/** if user is buyer, they can see the rating form */}
            {Meteor.user().username === this.props.items.buyer ?
                <div>
                  <Segment><Header content={'Write a Review'}/>
                    <Rating icon='star'
                            defaultRating={0}
                            maxRating={5}
                            size={'massive'}
                            onRate={this.handleRating}/>
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

            {/**  Showing Comments for seller  */}
            {ratings.length > 0 ? <Comment.Group size={'big'}><Header content={'Reviews'}/>{ratings
                    .slice((this.state.activePage - 1) * 5, this.state.activePage * 5)
                    .map((rating) => <RatingItem rating={rating}
                                                        key={ratings.indexOf(rating)}/>)}
                  {ratings.length > 5 ? <Container textAlign={'center'}>
                    <Pagination
                        defaultActivePage={1}
                        ellipsisItem={{ content: <Icon name='ellipsis horizontal'/>, icon: true }}
                        firstItem={{ content: <Icon name='angle double left'/>, icon: true }}
                        lastItem={{ content: <Icon name='angle double right'/>, icon: true }}
                        prevItem={{ content: <Icon name='angle left'/>, icon: true }}
                        nextItem={{ content: <Icon name='angle right'/>, icon: true }}
                        totalPages={Math.ceil(ratings.length / 5)}
                        secondary
                        onPageChange={this.handlePageChange}
                    />
                  </Container> : ''}
                </Comment.Group>
                : <Header as={Container}
                          textAlign={'center'}>This user does not have ratings</Header>}
          </Grid.Row>

            {/** Sold Popup, ask to select buyer */}
            {this.state.soldPopup ? <div>
              <div style={popupStyle}/>
              <Segment style={innerStyle}>
                <Button icon={'close'}
                        floated={'right'} circular
                        onClick={this.handleCloseSold}/>
                <Header as={'h2'} textAlign={'center'}
                        content={'Sold Item'}/>
                <Header as={'h4'} content={`Item: ${this.props.items.name}`}/>
                <Divider/>
                <Header as={'h4'} content={`Price: $${this.props.items.price}`}/>
                <Divider/>
                <Select placeholder='Select buyer of this item' options={buyers} onChange={this.handleSelect} />
                <Header as={'h4'} content={'Buyer: '} floated={'left'}/>
                <Divider hidden/>
                {this.state.soldError ? <Message
                    error
                    content={this.state.soldError}/> : <Divider hidden/>}
                <Button attached={'bottom'} content={'Confirm'} onClick={this.soldConfirm}/>
              </Segment>
            </div> : ''}

            {/** Rate Popup, after sold user can rate buyer */}
            {this.state.ratePopup ? <div>
              <div style={popupStyle}/>
              <Segment style={innerStyle}>
                <Button icon={'close'}
                        floated={'right'} circular
                        onClick={this.handleCloseSold}/>
                <Header as={'h2'} textAlign={'center'}
                        content={'Rate Buyer'}/>
                <Header as={'h4'} content={`You can rate user: ${this.props.items.buyer}`}/>
                <Divider/>
                <Rating icon='star' defaultRating={0} maxRating={5} size={'massive'} onRate={this.handleRating}/>
                <Header as={'h4'} content={'Rating: '} floated={'left'}/>
                {this.state.error ? <Message
                    error
                    content={this.state.error}/> : ''}
                <Divider/>
                <Form onSubmit={this.submitRateBuyer}><Form.TextArea required
                                  label='Comment'
                                  name='comment'
                                  type='content'
                                  placeholder='Describe your experience...'
                                  onChange={this.handleReview}/>
                  <Form.Button
                      content='Submit'/>
                </Form>
              </Segment>
            </div> : ''}

            {/* send email POPUP */}
            {this.state.openSendEmail ? <div>
              <div style={popupStyle}/>
              <Segment style={innerStyle}>
                <Button icon={'close'} floated={'right'} circular onClick={this.handleCloseSold}/>
                <Header as={'h1'} textAlign={'center'} content={'SEND EMAIL'}/>
                <Divider/>
                <Form onSubmit={this.handleSendSubmit}>
                  <Header content={`To: ${this.props.items.owner}`}/>
                  <Form.Input required
                              label='Subject'
                              type='subject'
                              name='subject'
                              onChange={this.handleFormChange}
                              placeholder='Subject'/>
                  <Form.TextArea style={{ maxHeight: 261, height: 261 }}
                                 required
                                 label='Content'
                                 name='content'
                                 onChange={this.handleFormChange}
                                 type='content'/>
                  <Form.Button content='Send' color={'blue'}/>
                </Form>
              </Segment>
            </div> : ''}
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
  let subscription2;
  const subscription3 = Meteor.subscribe('Ratings');
  const subscription4 = Meteor.subscribe('Contacts');
  if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
    subscription2 = Meteor.subscribe('UserAdmin');
  } else {
    subscription2 = Meteor.subscribe('User');
  }
  return {
    items: Items.find({ _id: itemID }).fetch()[0],
    ready: subscription.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready(),
  };
})(ItemPage);
