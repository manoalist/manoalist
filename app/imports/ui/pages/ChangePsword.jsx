import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, Form, Grid, Header, Message, Segment, Image } from 'semantic-ui-react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

/**
 * reset component is similar to signup component, but we create a new user instead.
 */
class ChangePsword extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { curPassword: '', newPassword: '', confirm: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  /** Handle reset submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { curPassword, newPassword } = this.state;
    if (this.state.newPassword !== this.state.confirm) {
      this.setState({ error: 'New password does not match. Please double check.', redirectToReferer: false });
    } else if (this.state.newPassword.length < 8) {
      this.setState({ error: 'New password requires at 8 characters.', redirectToReferer: false });
    } else if (this.state.curPassword === this.state.newPassword) {
      this.setState({ error: 'New password cannot be same as the the current password.',
        redirectToReferer: false });
    } else {
      Accounts.changePassword(curPassword, newPassword, (err) => {
        if (err) {
          this.setState({ error: err.reason });
        } else {
          this.setState({ error: '', redirectToReferer: true });
          swal('Success!', 'Please Login with your new password', 'success');
        }
      });
    }
  };

  /** Display the reset form. Redirect to home page after successful registration and login. */
  render() {
    if (this.state.redirectToReferer) {
        return <Redirect to={'/signout'}/>;
    }
    return (
        <div style={{ backgroundColor: '#fafafa' }}>
          <Container>
            <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
              <Grid.Column style={{ marginTop: '65px', marginBottom: '100px' }}>
                <Form onSubmit={this.submit}>

                  <Segment stacked>
                    <Header as="h1" textAlign="center" style={{ color: '#024731', marginBottom: '25px' }}>
                      Change Password
                    </Header>
                    <div style={{ marginBottom: '15px' }}>
                      <Image src={'/images/manoalist-circle.png'} size={'tiny'} centered/>
                    </div>
                    <Form.Input
                        label="Current Password"
                        icon="user"
                        iconPosition="left"
                        name="curPassword"
                        type="password"
                        placeholder="Current Password"
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        label="New Password"
                        icon="lock"
                        iconPosition="left"
                        name="newPassword"
                        placeholder="New Password"
                        type="password"
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        label="Confirm New Password"
                        icon="lock"
                        iconPosition="left"
                        name="confirm"
                        placeholder="Confirm New Password"
                        type="password"
                        onChange={this.handleChange}
                    />
                    <Form.Button style={{ color: 'white', backgroundColor: '#024731' }} content="Change"/>

                    No account? <Link to="/signup"> Sign Up!</Link>

                  </Segment>

                </Form>

                {this.state.error === '' ? (
                    ''
                ) : (
                    <Message
                        error
                        header="Reset was not successful"
                        content={this.state.error}
                    />
                )}
              </Grid.Column>
            </Grid>
          </Container>
        </div>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
ChangePsword.propTypes = {
  location: PropTypes.object,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Accounts');
  return {
    ready: subscription.ready(),
  };
})(ChangePsword);
