import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Segment, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import UserInfo from '../components/UserInfo';
import { User } from '../../api/user/User';

/** Renders the Page for adding a document. */
class Profile extends React.Component {

  renderPage() {
    return (
        <Grid columns={2} className='profile-page'>
          <Grid.Column width={4}>
            <Segment>
                <UserInfo user={this.props.user}></UserInfo>
            </Segment>
          </Grid.Column>
          <Grid.Column width={12}>
              <Grid.Row className='profile-dashboard'>
                  <Segment>
                      <Grid>
                        <Grid.Row centered>
                            <h3>Dashboard</h3>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid columns={'equal'}>
                                <Grid.Column textAlign='center'>
                                    <Grid.Row>
                                        <h4>Items for Sale</h4>
                                    </Grid.Row>
                                    <Grid.Row>
                                        0
                                    </Grid.Row>
                                </Grid.Column>
                                <Grid.Column textAlign='center'>
                                    <Grid.Row>
                                        <h4>Items Watched</h4>
                                    </Grid.Row>
                                    <Grid.Row>
                                        0
                                    </Grid.Row>
                                </Grid.Column>
                                <Grid.Column textAlign='center'>
                                    <Grid.Row>
                                        <h4>Items Bought</h4>
                                    </Grid.Row>
                                    <Grid.Row>
                                        0
                                    </Grid.Row>
                                </Grid.Column>
                            </Grid>
                        </Grid.Row>
                      </Grid>
                  </Segment>
              </Grid.Row>
              <Grid.Row className='ratings-box'>
                  <Segment>
                      <Grid>
                          <Grid.Row centered>
                            <h3>Ratings</h3>
                          </Grid.Row>
                          <Grid.Row centered>
                            There are no ratings for you.
                          </Grid.Row>
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
    user: PropTypes.object.isRequired,
    ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe('User');
    return {
      user: User.find({}).fetch()[0], // Should only by the current user
      ready: subscription.ready(),
    };
})(Profile);
