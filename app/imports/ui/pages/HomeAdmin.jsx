import React from 'react';
import {
  Header,
  Grid,
  Icon,
  Container,
  Image,
  Divider,
  Segment,
} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default class HomeAdmin extends React.Component {
  render() {
    const adminStyle = { backgroundColor: '#BBF7AA' };
    const text = 'admin@foo.com create a item at Apr 13 2020';
    return (
        <div>
          <Header as={'h2'}
                  content={'Welcome! Administrators!'}
                  textAlign={'center'}/>
          <Image src={'/images/manoalist-logo.png'}
                 size={'huge'}
                 centered/>
          <Divider hidden/>
          <Container style={{ height: '500px', verticalAlign: 'middle'}}>
            <Grid columns={3}
                  container>
              <Grid.Column as={NavLink}
                           exact
                           to={'/list'}
                           textAlign={'center'}
                           style={adminStyle}>
                <Icon name={'spy'}
                      size={'massive'}/>
                <Header as={'h3'}
                        content={'Monitor Items '}/>
              </Grid.Column>
              <Grid.Column as={NavLink}
                           exact
                           to={'/list'}
                           textAlign={'center'}>
                <Icon name={'add circle'}
                      size={'massive'}/>
                <Header as={'h3'}
                        content={'Create new categories'}/>
              </Grid.Column>
              <Grid.Column as={NavLink}
                           exact
                           to={'/list'}
                           textAlign={'center'}
                           style={adminStyle}>
                <Icon name={'comment alternate outline'}
                      size={'massive'}/>
                <Header as={'h3'}
                        content={'Send notification'}/>
              </Grid.Column>
            </Grid>
            <Divider hidden/>
            <Segment.Group textAlign={'center'} style={{ height: '300px', width: '400px', overflow: 'auto' }}>
              <Segment>{text}<br/></Segment>
              <Segment>{text}<br/></Segment>
              <Segment>{text}<br/></Segment>
              <Segment>{text}<br/></Segment>
              <Segment>{text}<br/></Segment>
              <Segment>{text}<br/></Segment>
              <Segment>{text}<br/></Segment>
              <Segment>{text}<br/></Segment>
              <Segment>{text}<br/></Segment>
              <Segment>{text}<br/></Segment>
              <Segment>{text}<br/></Segment>
            </Segment.Group>
          </Container>
        </div>
    );
  }
}
