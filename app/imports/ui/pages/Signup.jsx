import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { Accounts } from 'meteor/accounts-base';
import { User } from '../../api/user/User';


/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', confirm: '', error: '', redirectToReferer: false,
      errorEmail: '', errorPassword: '' };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value }, () => this.validateInput(name, value));
  };

  validateInput(fieldName, value) {
    switch (fieldName) {
      case 'email':
        if (!/^([a-z0-9_-]+)@hawaii.edu$/.test(value)) {
          this.setState({ errorEmail: 'your email is not a valid uh email: username@hawaii.edu' });
        } else {
          this.setState({ errorEmail: '' });
        }
        break;
      case 'password':
        if (value.length < 8) {
          this.setState({ errorPassword: 'your password is too short, at least 8 characters long' });
        } else {
          this.setState({ errorPassword: '' });
        }
        break;
      default:
        break;
    }
  }

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password } = this.state;
    const writeup =
        `Terms of Use ("Terms")
Last updated: (April 16th, 2020)

Please read these Terms of Use ("Terms", "Terms of Use") carefully before using the http://manoalist.meteorapp.com 
website (the "Service") operated by UH Manoa ("us", "we", or "our").

Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These 
Terms apply to all visitors, users and others who access or use the Service.

By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms 
then you may not access the Service.

Termination

We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason 
whatsoever, including without limitation if you breach the Terms.

All provisions of the Terms which by their nature should survive termination shall survive termination, including, 
without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.

Content
Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, 
or other material ("Content").`;
    if (this.state.password !== this.state.confirm) {
      this.setState({ error: 'Password does not match your confirmation' });
    }
    if (this.state.password === this.state.confirm
        && this.state.errorEmail === '' && this.state.errorPassword === '') {
      swal({
        title: 'Terms of Use',
        text: writeup,
        closeOnClickOutside: false,
        closeOnEsc: false,
        buttons: {
          cancel: {
            text: 'Decline',
            value: false,
            visible: true,
            closeModal: true,
          },
          confirm: {
            text: 'I Agree',
            value: true,
            visible: true,
            closeModal: true,
          },
        },
      }).then((value) => {
        if (value) {
          Accounts.createUser({ email, username: email, password }, (err) => {
            if (err) {
              this.setState({ error: err.reason });
            } else {
              swal('Congrats!', 'Your account has been created.', 'success');
              User.insert({
                email,
                image: '/images/default-profile.jpg',
                isBanned: false,
              },
              (error) => {
                if (error) {
                  swal('Error', error.message, 'error');
                }
              });
              this.setState({ error: '', redirectToReferer: true });
            }
          });
        }
      });
    }
  };

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/home' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
        <div style={{ backgroundColor: '#fafafa' }}>
      <Container>
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column style={{ marginTop: '65px', marginBottom: '100px' }}>
            <Form onSubmit={this.submit} error>
              <Segment stacked>
                <Header as="h2" textAlign="center" style={{ color: '#024731', marginBottom: '25px' }}>
                  Create Account
                </Header>
                <Image src={'/images/manoalist-logo.png'} size={'medium'} style={{ marginTop: '15px' }} centered/>
                <Form.Input
                  label="email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="XXXX@hawaii.edu"
                  onChange={this.handleChange}
                />
                {this.state.errorEmail === '' ? ('') : (
                    <Message error content={this.state.errorEmail}/>)}
                <Form.Input
                  label="Password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                />
                {this.state.errorPassword === '' ? ('') : (
                    <Message error content={this.state.errorPassword}/>)}
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

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('User');
  return {
    ready: subscription.ready(),
  };
})(Signup);
