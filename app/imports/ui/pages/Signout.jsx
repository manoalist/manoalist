import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header } from 'semantic-ui-react';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    Meteor.logout();
    setTimeout(() => {
      if (window.location.href.includes('signout')) {
        window.location.href = window.location.href.replace('signout','');
      }
    }, 2000);
    return (
      <Header as="h2" textAlign="center">
        <p>You are signed out. Redirecting to home page...</p>
      </Header>
    );
  }
}
