import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react';

/**
 * Landing page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
export default class Landing extends React.Component {

  /** Initialize component state with properties for login and redirection. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  /** Handle Landing submission using Meteor's account mechanism. */
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

  /** Render the signin form. */
  render() {
    // if correct authentication, direct to page category
    if (this.state.redirectToReferer) {
      return <Redirect to="/add"/>;
    }
    // Otherwise return the Login form.
    return (
        <Grid textAlign="center" centered className={'landing'}>
          <Grid.Column width={4}>
            <Header as="h2" textAlign="center">
              Login to your account
            </Header>
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Form.Input
                  label="Email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="E-mail address"
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
                <Form.Button content="Submit"/>
              </Segment>
            </Form>
            <Message>
              <Link to="/signup">Click here to Register</Link>
            </Message>
            {this.state.error === '' ? (
              ''
            ) : (
              <Message
                error
                header="Login was not successful"
                content={this.state.error}
              />
            )}
          </Grid.Column>
          <Grid.Column width={2}/>
          <Grid.Column width={4} textAlign={'center'}>
            <Icon name={'cart'} size={'huge'}/>
            <Header as={'h3'}>Plenty of items waiting you to discover. Numbers of categories,
              here has everything you want, everything you need. Shop Right Now!</Header>
          </Grid.Column>
          <Grid.Column textAlign={'center'} width={4}>
            <Icon name={'handshake outline'} size={'huge'}/>
            <Header as={'h3'}>This is a friendly platform for UH students to facilitate buying and selling
              of student-related goods and services. Users must be UH students,
              faculty, or staff<br/>Sign in to start shopping!</Header>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Landing.propTypes = {
  location: PropTypes.object,
};
