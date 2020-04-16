import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import User from '../components/User';


/** Renders the Page for adding a document. */
class Profile extends React.Component {

  render() {
    return (
        <Grid columns={2} className='profile-page'>
          <Grid.Column width={4}>
            <Segment>
                <User></User>
            </Segment>
          </Grid.Column>
          <Grid.Column width={12}>
              <Grid.Row className='profile-dashboard'>
                  <Segment>
                      <Grid>
                        <Grid.Row centered>
                            Dashboard
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column textAlign='center' width={8}>
                                <Grid.Row>
                                    Items for Sale
                                </Grid.Row>
                                <Grid.Row>
                                    0
                                </Grid.Row>
                            </Grid.Column>
                            <Grid.Column textAlign='center' width={8}>
                                <Grid.Row>
                                    Items Bought
                                </Grid.Row>
                                <Grid.Row>
                                    0
                                </Grid.Row> 
                            </Grid.Column>
                        </Grid.Row>
                      </Grid>
                  </Segment>
              </Grid.Row>
              <Grid.Row className='ratings-box'>
                  <Segment>
                      <Grid>
                          <Grid.Row centered>
                            Ratings
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
}

export default Profile;
