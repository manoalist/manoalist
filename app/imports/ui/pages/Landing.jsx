import React from 'react';
import { Button, Container, Divider, Grid, Header, Icon, Image, Tab, Menu, Step } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default class Landing extends React.Component {
  render() {
    // const topLandingStyle = { backgroundImage: 'url("https://i0.wp.com/www.hawaii.edu/news/wp-content/uploads/' +
    //       '2019/05/manoa-ranking-beautiful-affordable-schools.jpg?w=676&ssl=1")', height: '500px' };
    const topRightStyle = { color: 'white', fontSize: '30px', background: 'rgba(0, 0, 0, 0.4)' };
    const panes = [
      {
        menuItem: (<Menu.Item key={'buyer'}><Header as={'h1'} content={'FOR BUYER'}/></Menu.Item>),
        render: () => <Tab.Pane>
          <Grid textAlign="center"
                centered
                className={'landing'}>
            <Grid.Column width={4}
                         textAlign={'center'}>
              <Icon name={'cart'}
                    size={'huge'}/>
              <Header as={'h2'}>Sign in to our home page and start shopping!</Header>
            </Grid.Column>
            <Grid.Column textAlign={'center'}
                         width={4}>
              <Icon name={'heart'}
                    size={'huge'}/>
              <Header as={'h2'}>Like items so you can view it later. </Header>
            </Grid.Column>
            <Grid.Column textAlign={'center'}
                         width={4}>
              <Icon name={'star'}
                    size={'huge'}/>
              <Header as={'h2'}>Please rate and leave a comment for seller after purchase</Header>
            </Grid.Column>
          </Grid>
        </Tab.Pane>,
      },
      {
        menuItem: (<Menu.Item key={'seller'}><Header as={'h1'} content={'FOR SELLER'}/></Menu.Item>),
        render: () => <Tab.Pane>
          <Grid textAlign="center"
                centered
                className={'landing'}>
            <Grid.Column width={4}
                         textAlign={'center'}>
              <Icon name={'send'}
                    size={'huge'}/>
              <Header as={'h2'}>Post the item that you want to sell on our item list.</Header>
            </Grid.Column>
            <Grid.Column textAlign={'center'}
                         width={4}>
              <Icon name={'handshake outline'}
                    size={'huge'}/>
              <Header as={'h2'}>Wait customers contact you and promote your product.</Header>
            </Grid.Column>
            <Grid.Column textAlign={'center'}
                         width={4}>
              <Icon name={'dollar'}
                    size={'huge'}/>
              <Header as={'h2'}>Meet buyer and close deal in-person in campus.</Header>
            </Grid.Column>
          </Grid>
        </Tab.Pane>,
      },
    ];
    return (
        <div>
          <Container className={'topLanding'} fluid>
            <Grid textAlign={'center'} style={{ paddingTop: '200px' }}>
              <Grid.Column width={3}>
                <Image src={'/images/manoalist-logo.png'} style={{ background: 'rgba(255, 255, 255, 0.4)' }}/>
              </Grid.Column>
              <Grid.Column width={3} textAlign={'left'}>
                <p style={topRightStyle}>Connecting campus</p>
                <Button content={'Sign In'} floated={'left'} as={NavLink} exact to={'/signin'}/>
              </Grid.Column>
            </Grid>
          </Container>

          <Header as={'h2'} textAlign={'center'}>HOW IT WORKS</Header>
          <Divider/>
          <Divider/>
          <Container>
            <Tab
              menu={{ fluid: false, tabular: true }}
              menuPosition='left'
              panes={panes}/>
          </Container>
        </div>
    );
  }
}
