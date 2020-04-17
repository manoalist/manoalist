import React from 'react';
import { Image, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserInfo extends React.Component {
  render() {
    return (
        <Grid className='user-info'>
          <Grid.Row>
            <Grid stackable columns={ 'equal' }>
              <Grid.Column>
                <Grid.Row>
                  <Image src={ this.props.user.image } size='small'/>
                </Grid.Row>
              </Grid.Column>
              <Grid.Column>
                <Grid.Row style={ { marginBottom: '1em' } }>
                  <Grid.Row><h4>First Name</h4></Grid.Row>
                  <Grid.Row>{ this.props.user.firstName }</Grid.Row>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Row><h4>Last Name</h4></Grid.Row>
                  <Grid.Row>{ this.props.user.lastName }</Grid.Row>
                </Grid.Row>
              </Grid.Column>
            </Grid>
          </Grid.Row>
          <Grid.Row>
            <Grid.Row><h4>Description</h4></Grid.Row>
            <Grid.Row>{ this.props.user.description }</Grid.Row>
          </Grid.Row>
          <Grid.Row>
            <Grid.Row><h4>Phone Number</h4></Grid.Row>
            <Grid.Row>{ this.props.user.mobileNumber }</Grid.Row>
          </Grid.Row>
        </Grid>
    );
  }
}

/** Require a document to be passed to this component. */
UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(UserInfo);
