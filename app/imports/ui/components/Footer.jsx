import React from 'react';
import {
  Image,
  Grid,
  List,
  Container,
  Divider,
  Icon,
  Header,
  Button,
} from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { margonTop: '15px', backgroundColor: '#D4D3D3' };
    return (
        <footer style={divStyle}>
          <Divider/>
            <Grid columns={3} container>
              <Grid.Column>
                <Image src={'/images/manoalist-logo.png'} size={'large'}/>
              </Grid.Column>
              <Grid.Column>
                <List size={'huge'}>
                <List.Item><a href={'/#/about'}>About US
                </a></List.Item>
                  <List.Item><a href={'/#'}>Home</a></List.Item>
                  <List.Item>
                    <a href={'https://manoalist.github.io/'}><Icon name={'github'}/>more information</a>
                  </List.Item>
              </List>
              </Grid.Column>
              <Grid.Column>
                <Header as={'h2'}>NOT A MEMBER?</Header>
                <Button content={'Register'} size={'huge'} color={'green'}/>
              </Grid.Column>
            </Grid>
            <Divider hidden/>
            <Container textAlign={'center'}><p>Department of Information and Computer Sciences <br/>
              University of Hawaii<br/>
              Honolulu, HI 96822</p></Container>
        </footer>
    );
  }
}

export default Footer;
