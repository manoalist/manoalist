import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, Form, Grid, Header, Image, Message } from 'semantic-ui-react';
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
    this.state = {
      firstName: '', lastName: '', mobileNumber: '', email: '', password: '', confirm: '', redirectToReferer: false,
      errorEmail: false, errorPassword: false, errorConfirm: false, errorNumber: false, error: '',
    };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { firstName, lastName, mobileNumber, email, password, errorEmail, errorPassword, errorConfirm } = this.state;
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

    /** phone number validation */
    if (this.state.mobileNumber.length !== 10 || (!/^\d+$/.test(this.state.mobileNumber))) {
      this.setState({ errorNumber: true });
      this.setState({ error: 'Must be a valid phone number of 10 digits.' });
      return;
    }
    this.setState({ errorNumber: false });
    this.setState({ error: '' });

    /** UH email validation */
    if ((!/^([a-z0-9_-]+)@hawaii.edu$/.test(email))) {
      this.setState({ errorEmail: true });
      this.setState({ error: 'You must use an @hawaii.edu address.' });
      return;
    }
    this.setState({ errorEmail: false });
    this.setState({ error: '' });

    /** password length validation */
    if (this.state.password.length < 8) {
      this.setState({ errorPassword: true });
      this.setState({ error: 'Password must be at least 8 characters long.' });
      return;
    }
    this.setState({ errorPassword: false });
    this.setState({ error: '' });

    /** confirm password validation */
    if (this.state.confirm !== this.state.password) {
      this.setState({ error: 'Your passwords do not match.' });
      this.setState({ errorConfirm: true });
      return;
    }
    this.setState({ errorConfirm: false });
    this.setState({ error: '' });

    if ((errorEmail === false) && (errorPassword === false) && (errorConfirm === false) && (this.state.error === '') &&
        (this.state.errorNumber === false)
    ) {
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
                    firstName,
                    lastName,
                    mobileNumber,
                    email,
                    image: '/images/default-profile.jpg',
                    isBanned: false,
                  },
                  (error) => {
                    if (error) {
                      swal('Error', error.message, 'error');
                    } else {
                      this.setState({ error: '', redirectToReferer: true });
                    }
                  });
            }
          });
        }
      });
    }
  }

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/home' } };
    /** if correct authentication, redirect to from: page instead of signup screen */
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
        <div>
          <Container>
            <Image centered src={'/images/manoalist-circle.png'} style={{ marginTop: '30px' }} size={'tiny'}/>
            <Header as="h2" textAlign="center" style={{ color: '#024731', marginTop: '10px' }}>
              START BUYING + SELLING WITH OTHER STUDENTS TODAY!
            </Header>
            <Grid style={{ marginTop: '40px', marginBottom: '80px' }}
                  relaxed centered columns={'equal'}>
              <Grid.Column>
                <Image src={'/images/signup.jpg'}/>
              </Grid.Column>
              <Grid.Column>
                <Form onSubmit={this.submit} error>
                  <Form.Group widths={'equal'}>
                    <Form.Input
                        name={'firstName'}
                        label={'First Name'}
                        onChange={this.handleChange}
                        placeholder={'Please enter your first name.'}
                        error={this.state.errorFirstName}
                    />
                    <Form.Input
                        name={'lastName'}
                        label={'Last Name'}
                        onChange={this.handleChange}
                        placeholder={'Please enter your last name.'}
                        error={this.state.errorLastName}
                    />
                  </Form.Group>
                  <Form.Input
                      name={'mobileNumber'}
                      label={'Phone Number'}
                      icon={'mobile alternate'}
                      iconPosition={'left'}
                      onChange={this.handleChange}
                      placeholder={'8081234567'}
                      error={this.state.errorNumber}
                  />
                  <Form.Input
                      label="Email"
                      icon="mail"
                      iconPosition="left"
                      name="email"
                      type="email"
                      placeholder="youremail@hawaii.edu"
                      onChange={this.handleChange}
                      error={this.state.errorEmail}
                  />
                  <Form.Input
                      label="Password"
                      icon="lock"
                      iconPosition="left"
                      name="password"
                      placeholder="Must be at least 8 characters long."
                      type="password"
                      onChange={this.handleChange}
                      error={this.state.errorPassword}
                  />
                  <Form.Input
                      label="Confirm Password"
                      icon="lock"
                      iconPosition="left"
                      name="confirm"
                      placeholder="Confirm Password"
                      type="password"
                      onChange={this.handleChange}
                      error={this.state.errorConfirm}
                  />
                  <Form.Button fluid style={{ marginTop: '20px', color: 'white', backgroundColor: '#6DA172' }}
                               content="SIGN UP" type={'submit'}
                               disabled={!this.state.firstName || !this.state.lastName || !this.state.email ||
                               !this.state.mobileNumber || !this.state.password || !this.state.confirm}/>
                  Already have an account? <Link to="/signin">Login</Link>
                </Form>
                {this.state.error === '' ? ('') : (
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
