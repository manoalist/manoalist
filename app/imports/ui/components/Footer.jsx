import React from 'react';
import { Container, Image, Grid, List, Divider, Icon, Header, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { marginTop: '15px', backgroundColor: '#D4D3D3' };
    return (
        <footer style={divStyle}>
          <Divider/>
            <Grid columns={3} container>
              <Grid.Column>
                <Image src={'/images/manoalist-logo.png'} size={'medium'}/>
              </Grid.Column>
              <Grid.Column>
                <List size={'large'}>
                <List.Item><a href={'/#/about'}>About US
                </a></List.Item>
                  <List.Item><a href={'/#'}>Home</a></List.Item>
                  <List.Item>
                    <a href={'https://manoalist.github.io/'}><Icon name={'github'}/>more information</a>
                  </List.Item>
              </List>
              </Grid.Column>
              <Grid.Column>
                {this.props.currentUser ? (
                  <Header as={'h3'}>Welcome {this.props.currentUser}</Header>
                ) : (
                  <Container>
                  <Header as={'h3'}>NOT A MEMBER?</Header>
                  <Button content={'Register'} size={'huge'} color={'green'}/>
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
