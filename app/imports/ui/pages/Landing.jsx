import React from 'react';
import { Button, Container, Grid, Header, Icon, Image, Tab, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default class Landing extends React.Component {
  render() {
    const panes = [
      {
        menuItem: (<Menu.Item key={'buyer'}><Header as={'h3'} content={'BUYER'}/></Menu.Item>),
        render: () => <Tab.Pane>
          <Grid textAlign="center" centered className={'landing'}>
            <Grid.Column width={4} textAlign={'center'}>
              <Icon name={'cart'} size={'huge'}/>
              <Header as={'h3'}>Sign in and start shopping!</Header>
            </Grid.Column>
            <Grid.Column textAlign={'center'} width={4}>
              <Icon name={'heart'} size={'huge'}/>
              <Header as={'h3'}>Like items and view it later! </Header>
            </Grid.Column>
            <Grid.Column textAlign={'center'} width={4}>
              <Icon name={'star'} size={'huge'}/>
              <Header as={'h3'}>Rate and leave a comment!</Header>
            </Grid.Column>
          </Grid>
        </Tab.Pane>,
      },
      {
        menuItem: (<Menu.Item key={'seller'}><Header as={'h3'} content={'SELLER'}/></Menu.Item>),
        render: () => <Tab.Pane>
          <Grid textAlign="center" centered className={'landing'}>
            <Grid.Column width={4} textAlign={'center'}>
              <Icon name={'send'} size={'huge'}/>
              <Header as={'h3'}>Post the item to sell!</Header>
            </Grid.Column>
            <Grid.Column textAlign={'center'} width={4}>
              <Icon name={'handshake outline'} size={'huge'}/>
              <Header as={'h3'}>Contact customers and sell items!</Header>
            </Grid.Column>
            <Grid.Column textAlign={'center'} width={4}>
              <Icon name={'dollar'} size={'huge'}/>
              <Header as={'h3'}>Meet buyer and close deal!</Header>
            </Grid.Column>
          </Grid>
        </Tab.Pane>,
      },
    ];
    return (
        <div style={{ paddingBottom: '60px' }}>
          <Container className={'topLanding'} textAlign={'center'} fluid style={{ marginTop: '-10px' }}>
            <Header as={'h1'} textAlign={'center'} style={{ paddingTop: '25px', fontSize: '50px' }}
                    inverted id='fancy-font'>Shop with Aloha</Header>
            <Image src={'/images/manoalist-circle.png'} size='small' centered/>
            <Button animated style={{ marginTop: '50px', color: 'white', backgroundColor: '#8EA4D2' }}
                    as={NavLink} exact to={'/signin'}>
              <Button.Content visible>Sign In</Button.Content>
              <Button.Content hidden><Icon name='arrow right' /></Button.Content>
            </Button>
          </Container>
          <Header as={'h2'} textAlign={'center'} style={{ paddingTop: '20px' }}>HOW IT WORKS</Header>
          <Container>
            <Tab menu={{ fluid: false, tabular: true }} menuPosition='left' panes={panes}/>
          </Container>
        </div>
    );
  }
}
