import React from 'react';
import { Button, Container, Grid, Header, Icon, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default class Landing extends React.Component {
  render() {
    // const topLandingStyle = { backgroundImage: 'url("https://i0.wp.com/www.hawaii.edu/news/wp-content/uploads/' +
    //       '2019/05/manoa-ranking-beautiful-affordable-schools.jpg?w=676&ssl=1")', height: '500px' };
    const topRightStyle = { color: 'white', fontSize: '30px', background: 'rgba(0, 0, 0, 0.4)' };
    return (
        <div>
          <Container className={'topLanding'} fluid>
            <Grid textAlign={'center'} style={{ paddingTop: '200px' }}>
              <Grid.Column width={3}>
                <Image src={'/images/manoalist-logo.png'} style={{ background: 'rgba(255, 255, 255, 0.4)' }}/>
              </Grid.Column>
              <Grid.Column width={3} textAlign={'left'}>
                <p style={topRightStyle}>Connecting campus</p>
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
              <Header as={'h3'}>You can sign in to our home page to see what is on the list.
                The items on the list is from other users. Contact the seller if you are
                interested to his/her item.</Header>
            </Grid.Column>
            <Grid.Column textAlign={'center'}
                         width={4}>
              <Icon name={'handshake outline'}
                    size={'huge'}/>
              <Header as={'h3'}>You can post a request to ask for items that no one post in the for sell list. </Header>
            </Grid.Column>
            <Grid.Column textAlign={'center'}
                         width={4}>
              <Icon name={'star'}
                    size={'huge'}/>
              <Header as={'h3'}>You can rating the seller after purchase and leave a comment for him/her so
                other buyers can review comments to see whether they can buy stuffs from this seller.</Header>
            </Grid.Column>
          </Grid>
          <Header as={'h3'} textAlign={'center'}>FOR BUYER</Header>
          <Grid textAlign="center"
                centered
                className={'landing'}>
            <Grid.Column width={4}
                         textAlign={'center'}>
              <Icon name={'send'}
                    size={'huge'}/>
              <Header as={'h3'}>You can post a item if you want to sell it. It will appears on the for
                sell list so buyers can view your items.</Header>
            </Grid.Column>
            <Grid.Column textAlign={'center'}
                         width={4}>
              <Icon name={'heart'}
                    size={'huge'}/>
              <Header as={'h3'}>You can view the list of request to see is there anything you can
                sell to those buyers in need.</Header>
            </Grid.Column>
            <Grid.Column textAlign={'center'}
                         width={4}>
              <Icon name={'check square'}
                    size={'huge'}/>
              <Header as={'h3'}>Check with buyer to make the deal in-person in campus.</Header>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}
