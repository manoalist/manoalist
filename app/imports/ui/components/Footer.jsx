import React from 'react';
import { Container, Grid, List, Icon, Header, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink, withRouter } from 'react-router-dom';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { marginTop: '15px', backgroundColor: '#024731', flexShrink: 0 };
    return (
        <footer style={divStyle}>
            <Grid columns={3} container style={{ marginTop: 0, marginBottom: 0 }}>
              <Grid.Column>
                <Header as={'h3'} inverted>Information</Header>
                <hr />
                <List size={'large'} inverted>
                <List.Item><a href={'/#/about'}><Icon name={'user secret'}/>About Us
                </a></List.Item>
                  <List.Item><a href={'/#/terms'}><Icon name={'privacy'}/>Terms & Conditions</a></List.Item>
                  <List.Item>
                    <a href={'https://manoalist.github.io/'}><Icon name={'github'}/>more information</a>
                  </List.Item>
              </List>
              </Grid.Column>

              <Grid.Column>
                <Header as={'h3'} inverted>Customer Service</Header>
                <hr />
                <List size={'large'} inverted>
                  <List.Item><a href={'/#/contact'}><Icon name={'mail'}/>Contact Us</a></List.Item>
                </List>
              </Grid.Column>

              <Grid.Column>
                {this.props.currentUser ? (
                  <Header as={'h3'} inverted>Welcome {this.props.currentUser}</Header>
                ) : (
                  <Container>
                  <Header as={'h3'} inverted>NOT A MEMBER?</Header>
                  <Button content={'Register'} size={'small'} color={'blue'} as={NavLink} exact to={'/signup'}/>
                  </Container>
                )}
              </Grid.Column>
            </Grid>
        </footer>
    );
  }
}

/** Declare the types of all properties. */
Footer.propTypes = {
  currentUser: PropTypes.string,
};

const FooterContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Footer);

export default withRouter(FooterContainer);
