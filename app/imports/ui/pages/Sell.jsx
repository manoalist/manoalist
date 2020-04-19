import React from 'react';
import { Header, Grid, Container, List, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Sell extends React.Component {
  render() {
    return (
        <Container>
          <Header as={'h1'}>Categories</Header>
          <Grid>
            <Grid.Row>
              <Grid.Column width={4}>
                <Header as={'h3'}><Link to={'/list/all'}>For Sale</Link></Header>
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
    );
  }
}
export default Sell;
