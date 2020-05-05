import React from 'react';
import PropTypes from 'prop-types';
import { Roles } from 'meteor/alanning:roles';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment, Image } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';

/**
 * Signin component is similar to signup component, but we create a new user instead.
 */
class Signin extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  /** Handle Signin submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  };

  /** Display the signup form. Redirect to home page after successful registration and login. */
  render() {
    const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
    const { from } = this.props.location.state || { from: { pathname: '/home' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      if (isAdmin) {
        return <Redirect to={'/admin'}/>;
      }
        return <Redirect to={from}/>;
    }
    return (
      <div style={{ backgroundColor: '#fafafa' }}>
        <Container>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column style={{ marginTop: '65px', marginBottom: '100px' }}>
              <Form onSubmit={this.submit}>

                <Segment stacked>
                  <Header as="h1" textAlign="center" style={{ color: '#024731', marginBottom: '25px' }}>
                    Log In
                  </Header>
                  <div style={{ marginBottom: '15px' }}>
                  <Image src={'/images/manoalist-circle.png'} size={'tiny'} centered/>
                  </div>
                  <Form.Input
                      label="Username"
                      icon="user"
                      iconPosition="left"
                      name="email"
                      type="email"
                      placeholder="Username or E-mail address"
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="Password"
                      icon="lock"
                      iconPosition="left"
                      name="password"
                      placeholder="Password"
                      type="password"
                      onChange={this.handleChange}
                  />
                  <Form.Button style={{ color: 'white', backgroundColor: '#024731' }} content="Log in"/>

                    No account? <Link to="/signup"> Sign Up!</Link>

                </Segment>

              </Form>

              {this.state.error === '' ? (
                  ''
              ) : (
                  <Message
                      error
                      header="Registration was not successful"
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
Signin.propTypes = {
  location: PropTypes.object,
};

export default Signin;
