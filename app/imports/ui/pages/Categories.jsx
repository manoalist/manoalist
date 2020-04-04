import React from 'react';
import { Header, Grid, Container, List, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

let searchData = 'all';
class Categories extends React.Component {

  search(data) {
    searchData = data;
  }

  render() {
    return (
        <Container>
        <Header as={'h1'}>Categories</Header>
          <Grid>
            <Grid.Row>
              <Grid.Column width={4}>
                <Header as={'h3'}><Link to={'/add'}>Community</Link></Header>
              </Grid.Column>
              <Grid.Column width={10}>
                <List horizontal>
                  <List.Item><Link to={'/add'} onClick={this.search('activities')}>activities</Link></List.Item>
                  <List.Item><Link to={'/add'}>artists</Link></List.Item>
                  <List.Item><Link to={'/add'}>childcare</Link></List.Item>
                  <List.Item><Link to={'/add'}>classes</Link></List.Item>
                  <List.Item><Link to={'/add'}>events</Link></List.Item>
                  <List.Item><Link to={'/add'}>general</Link></List.Item>
                  <List.Item><Link to={'/add'}>groups</Link></List.Item>
                  <List.Item><Link to={'/add'}>local news</Link></List.Item>
                  <List.Item><Link to={'/add'}>lost+found</Link></List.Item>
                  <List.Item><Link to={'/add'}>missed</Link></List.Item>
                  <List.Item><Link to={'/add'}>connections</Link></List.Item>
                  <List.Item><Link to={'/add'}>musicians</Link></List.Item>
                  <List.Item><Link to={'/add'}>pets</Link></List.Item>
                  <List.Item><Link to={'/add'}>politics</Link></List.Item>
                  <List.Item><Link to={'/add'}>rants&raves</Link></List.Item>
                  <List.Item><Link to={'/add'}>rideshare</Link></List.Item>
                  <List.Item><Link to={'/add'}>volunteers</Link></List.Item>
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
                  <List.Item><Link to={'/add'}>automotive</Link></List.Item>
                  <List.Item><Link to={'/add'}>beauty</Link></List.Item>
                  <List.Item><Link to={'/add'}>cell/mobile</Link></List.Item>
                  <List.Item><Link to={'/add'}>computer</Link></List.Item>
                  <List.Item><Link to={'/add'}>creative</Link></List.Item>
                  <List.Item><Link to={'/add'}>cycle</Link></List.Item>
                  <List.Item><Link to={'/add'}>event</Link></List.Item>
                  <List.Item><Link to={'/add'}>farm+garden</Link></List.Item>
                  <List.Item><Link to={'/add'}>financial</Link></List.Item>
                  <List.Item><Link to={'/add'}>household</Link></List.Item>
                  <List.Item><Link to={'/add'}>labor/move</Link></List.Item>
                  <List.Item><Link to={'/add'}>legal</Link></List.Item>
                  <List.Item><Link to={'/add'}>lessons</Link></List.Item>
                  <List.Item><Link to={'/add'}>marine</Link></List.Item>
                  <List.Item><Link to={'/add'}>pet</Link></List.Item>
                  <List.Item><Link to={'/add'}>real estate</Link></List.Item>
                  <List.Item><Link to={'/add'}>skilled trade</Link></List.Item>
                  <List.Item><Link to={'/add'}>sm biz ads</Link></List.Item>
                  <List.Item><Link to={'/add'}>travel/vac</Link></List.Item>
                  <List.Item><Link to={'/add'}>write/ed/tran</Link></List.Item>
                </List>
              </Grid.Column>
            </Grid.Row>
            <Divider hidden/>
          </Grid>
        </Container>
    );
  }
}
export default { Categories, searchData };
