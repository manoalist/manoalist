import React from 'react';
import { Header, Grid, Container, List, Divider, Input, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    const inputStyle = { borderRadius: '100%' };
    return (
        <div>
          <Container fluid className={'topLanding'} textAlign={'center'}>
            <Image src={'/images/exampleLogo.png'} size={'small'} style={{ marginLeft: '45%', marginBottom: '20px' }}/>
            <Input className={'searchInput'} size='huge' action={{ icon: 'search' }} actionPosition={'left'}
                   placeholder='Search...' style={inputStyle}/>
          </Container>
          <Container>
          <Header as={'h1'}>Categories</Header>
          <Grid>
            <Grid.Row>
              <Grid.Column width={4}>
                <Header as={'h3'}><Link to={'/list/all'}>For
                  Sale</Link></Header>
              </Grid.Column>
              <Grid.Column width={10}>
                <List horizontal>
                  <List.Item><Link to={'/list/Basket'}>basket</Link></List.Item>
                  <List.Item><Link to={'/list/Bicycle'}>bicycle</Link></List.Item>
                </List>
              </Grid.Column>
            </Grid.Row>
            <Divider hidden/>

            <Grid.Row>
              <Grid.Column width={4}>
                <Header as={'h3'}><Link to={'/add'}>Service</Link></Header>
              </Grid.Column>
              <Grid.Column width={10}>
                <List horizontal>
                </List>
              </Grid.Column>
            </Grid.Row>
            <Divider hidden/>
          </Grid>
        </Container>
        </div>
    );
  }
}
export default Home;
