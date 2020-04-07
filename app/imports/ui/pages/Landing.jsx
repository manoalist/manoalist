import React from 'react';
import { Button, Container, Grid, Header, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/**
 * Landing page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
export default class Landing extends React.Component {
  render() {
    // const topLandingStyle = { backgroundImage: 'url("https://i0.wp.com/www.hawaii.edu/news/wp-content/uploads/' +
    //       '2019/05/manoa-ranking-beautiful-affordable-schools.jpg?w=676&ssl=1")', height: '500px' };
    const topRightStyle = { color: 'white', fontSize: '24px', background: 'rgba(0, 0, 0, 0.4)' };
    return (
        <div>
          <Container className={'topLanding'} fluid>
            <Grid textAlign={'center'} style={{ paddingTop: '200px' }}>
              <Grid.Column width={3}><Icon inverted name={'box'}
                       size={'huge'}/></Grid.Column>
              <Grid.Column width={3} textAlign={'left'}>
                <p style={topRightStyle}>Slogan: here is an slogan</p>
                <Button content={'Sign Up'} floated={'left'} as={NavLink} exact to={'/signup'}/>
              </Grid.Column>
            </Grid>
          </Container>

          <Header as={'h2'} textAlign={'center'}>HOW IT WORKS</Header>
          <Header as={'h3'} textAlign={'center'}>FOR SELLER</Header>
          <Grid textAlign="center"
                centered
                className={'landing'}>
            <Grid.Column width={4}
                         textAlign={'center'}>
              <Icon name={'cart'}
                    size={'huge'}/>
              <Header as={'h3'}>Plenty of items waiting you to discover. Numbers
                of categories,
                here has everything you want, everything you need. Shop Right
                Now!</Header>
            </Grid.Column>
            <Grid.Column textAlign={'center'}
                         width={4}>
              <Icon name={'handshake outline'}
                    size={'huge'}/>
              <Header as={'h3'}>This is a friendly platform for UH students to
                facilitate buying and selling
                of student-related goods and services. Users must be UH
                students,
                faculty, or staff<br/>Sign in to start shopping!</Header>
            </Grid.Column>
            <Grid.Column textAlign={'center'}
                         width={4}>
              <Icon name={'handshake outline'}
                    size={'huge'}/>
              <Header as={'h3'}>This is a friendly platform for UH students to
                facilitate buying and selling
                of student-related goods and services. Users must be UH
                students,
                faculty, or staff<br/>Sign in to start shopping!</Header>
            </Grid.Column>
          </Grid>
          <Header as={'h3'} textAlign={'center'}>FOR BUYER</Header>
          <Grid textAlign="center"
                centered
                className={'landing'}>
            <Grid.Column width={4}
                         textAlign={'center'}>
              <Icon name={'cart'}
                    size={'huge'}/>
              <Header as={'h3'}>Plenty of items waiting you to discover. Numbers
                of categories,
                here has everything you want, everything you need. Shop Right
                Now!</Header>
            </Grid.Column>
            <Grid.Column textAlign={'center'}
                         width={4}>
              <Icon name={'handshake outline'}
                    size={'huge'}/>
              <Header as={'h3'}>This is a friendly platform for UH students to
                facilitate buying and selling
                of student-related goods and services. Users must be UH
                students,
                faculty, or staff<br/>Sign in to start shopping!</Header>
            </Grid.Column>
            <Grid.Column textAlign={'center'}
                         width={4}>
              <Icon name={'handshake outline'}
                    size={'huge'}/>
              <Header as={'h3'}>This is a friendly platform for UH students to
                facilitate buying and selling
                of student-related goods and services. Users must be UH
                students,
                faculty, or staff<br/>Sign in to start shopping!</Header>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}
