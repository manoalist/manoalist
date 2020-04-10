import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';


/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', confirm: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password } = this.state;
    if (this.state.password === this.state.confirm) {
    Accounts.createUser({ email, username: email, password }, (err) => {

      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
} else {
      this.setState({ error: 'Password does not match your confirmation' });
    }
  };

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/add' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
        <div style={{ backgroundColor: '#fafafa' }}>
      <Container>
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column style={{ marginTop: '65px', marginBottom: '100px' }}>
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Header as="h2" textAlign="centered" style={{ color: '#024731', marginBottom: '25px' }}>
                  Create Account
                </Header>
                <Image src={'/images/manoalist-logo.png'} size={'medium'} style={{ marginTop: '15px' }} centered/>
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
                <Form.Input
                    label="Confirm Password"
                    icon="lock"
                    iconPosition="left"
                    name="confirm"
                    placeholder="Confirm Password"
                    type="password"
                    onChange={this.handleChange}
                />
                <Form.Button color={'green'} content="Sign up"/>
                Already have an account? <Link to="/signin">Login</Link>
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
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
