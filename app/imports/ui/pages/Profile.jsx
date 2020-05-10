import React from 'react';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import { Grid, Comment, Loader, Header, Segment, Container, Statistic,
  Rating, Progress, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import UserInfo from '../components/UserInfo';
import HomeItem from '../components/HomeItem';
import { User } from '../../api/user/User';
import { Items } from '../../api/item/Item';
import { Ratings } from '../../api/ratings/Ratings';
import RatingItem from '../components/RatingItem';

/** Renders the Page for adding a document. */
class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showForSale: false, showBought: false };

    this.displayItems = this.displayItems.bind(this);
    this.displayBought = this.displayBought.bind(this);
    this.filterUserItems = this.filterUserItems.bind(this);
    this.filterBoughtItems = this.filterBoughtItems.bind(this);
    this.renderDashboard = this.renderDashboard.bind(this);
  }

  displayItems() {
    if (this.state.showBought) this.setState({ showBought: false });
    const forSale = this.state.showForSale;
    this.setState({ showForSale: !forSale });
  }

  displayBought() {
    if (this.state.showForSale) this.setState({ showForSale: false });
    const bought = this.state.showBought;
    this.setState({ showBought: !bought });
  }

  filterUserItems(isSold) {
    return _.filter(this.props.items, item => item.owner === this.props.user.email &&
                                              item.sold === isSold);
  }

  filterBoughtItems(isSold) {
    return _.filter(this.props.items, item => item.buyer === this.props.user.email &&
        item.sold === isSold);
  }

  renderDashboard() {
    return (
        <Grid.Row className='profile-dashboard'>
            <Segment>
                <Grid>
                    <Grid.Row centered>
                        <h3>Dashboard</h3>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid columns={'equal'}>
                            <Grid.Column textAlign='center' onClick={this.displayItems}>
                                <Grid.Row>
                                    <h4>Items for Sale</h4>
                                </Grid.Row>
                                <Grid.Row>
                                    { this.filterUserItems(false).length}
                                </Grid.Row>
                            </Grid.Column>
                            <Grid.Column textAlign='center' onClick={this.displayBought}>
                                <Grid.Row>
                                    <h4>Items Bought</h4>
                                </Grid.Row>
                                <Grid.Row>
                                  { this.filterBoughtItems(true).length}
                                </Grid.Row>
                            </Grid.Column>
                        </Grid>
                    </Grid.Row>
                    { this.state.showForSale &&
                        <Grid.Row columns={8}>
                                {
                                this.filterUserItems(false).map((item, index) => <HomeItem key={index} item={item}/>)
                                }
                        </Grid.Row>
                    }
                  { this.state.showBought &&
                  <Grid.Row columns={8}>
                    {
                      this.filterBoughtItems(true).map((item, index) => <HomeItem key={index} item={item}/>)
                    }
                  </Grid.Row>
                  }
                </Grid>
            </Segment>
        </Grid.Row>
    );
  }

  renderPage() {
    const ratings = Ratings.find({}, { sort: { createdAt: -1 } }).fetch()
        .filter(rate => rate.target === this.props.user.email);

    const avgRatings = (Math.round((ratings
            .reduce((pre, cur) => pre + cur.rating, 0)
        / ratings.length) * 10) / 10);

    return (
        <Grid columns={2} className='profile-page'>
          <Grid.Column width={4}>
            <Segment>
                <UserInfo user={this.props.user}/>
            </Segment>
          </Grid.Column>
          <Grid.Column width={12}>
              { this.renderDashboard() }
              <Grid.Row className='ratings-box'>
                  <Segment>
                  <Grid>
                    <Grid.Row centered>
                      <h3>Ratings</h3>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <h3>{ratings.length} User Ratings</h3>
                        {ratings.length > 0 ? <Comment.Group size={'big'}>{ratings
                            .map((rating, index) => <RatingItem rating={rating}
                                                                key={index}/>)}
                        </Comment.Group>
                        : <Header as={Container}
                                  textAlign={'center'}>There is no rating for you</Header>}
                      </Grid.Column>
                      <Grid.Column>
                        <Statistic>
                          <Statistic.Label>Average Rating</Statistic.Label>
                          <Statistic.Value>
                            {(Number.isNaN(avgRatings)) ? '0' : avgRatings.toString()}
                          </Statistic.Value>
                        </Statistic>
                        <Rating maxRating={5}
                                   defaultRating={avgRatings}
                                   icon='star'
                                   style={{ marginLeft: '1em' }}
                                   size='massive'
                                   disabled/>
                      <List><List.Item>
                            <h3>5 Star</h3>
                              <Progress
                                  percent={(Math.round((ratings.filter(rating => rating.rating === 5).length
                                      / ratings.length) * 100) / 100) * 100}
                                  inverted color='red' progress size={'medium'}/>
                                   </List.Item>
                          <List.Item>
                            <h3>4 Star</h3>
                            <Progress
                                percent={(Math.round((ratings.filter(rating => rating.rating === 4).length
                                / ratings.length) * 100) / 100) * 100} inverted color='orange' progress/>
                          </List.Item>
                          <List.Item>
                            <h3>3 Star</h3>
                            <Progress
                                percent={(Math.round((ratings.filter(rating => rating.rating === 3).length
                                / ratings.length) * 100) / 100) * 100} inverted color='yellow' progress/>
                          </List.Item>
                          <List.Item>
                            <h3>2 Star</h3>
                            <Progress
                                percent={(Math.round((ratings.filter(rating => rating.rating === 2).length
                                / ratings.length) * 100) / 100) * 100} inverted color='olive' progress/>
                          </List.Item>
                          <List.Item>
                            <h3>1 Star</h3>
                            <Progress
                                percent={(Math.round((ratings.filter(rating => rating.rating === 1).length
                                / ratings.length) * 100) / 100) * 100} inverted color='green' progress/>
                          </List.Item>
                        </List>
                      </Grid.Column></Grid.Row>
                  </Grid>
                </Segment>
              </Grid.Row>
          </Grid.Column>
        </Grid>
    );
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting Profile Data</Loader>;
  }

}

/** Ensure that the React Router location object is available in case we need to redirect. */
Profile.propTypes = {
    user: PropTypes.object,
    items: PropTypes.array.isRequired,
    ratings: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
    const subscription = Meteor.subscribe('User');
    const subscription2 = Meteor.subscribe('Items');
    const subscription3 = Meteor.subscribe('Ratings');
    return {
      user: User.find({}).fetch()[0], // Should only by the current user
      items: Items.find({}).fetch(),
      ratings: Ratings.find({}, { sort: { createdAt: -1 } }).fetch(),
      ready: subscription.ready() && subscription2 && subscription3.ready(),
    };
})(Profile);
