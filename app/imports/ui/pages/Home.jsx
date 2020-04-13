import React from 'react';
import {
  Container,
  Segment,
  Grid,
  Header,
  Input,
  Image,
  Divider,
} from 'semantic-ui-react';
import { NavLink, Redirect } from 'react-router-dom';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWords: '',
      directToList: false,
    };
  }

  handleClick() {
    if (this.state.searchWords !== '') {
      this.setState({ directToList: true });
    }
  }

  handleInputChange = (e) => {
    this.setState({ searchWords: e.target.value });
  };

  pressEnter = (event) => {
    if (event.keyCode === 13) {
      this.handleClick();
    }
  };

  render() {
    if (this.state.directToList) {
      return <Redirect to={`/list/${this.state.searchWords}/search`}/>;
    }
    return (
        <div>
          <Container className={'topLanding'}
                     fluid
                     textAlign={'center'}
                     style={{ marginTop: '-10px' }}>
            <Image src={'/images/manoalist-logo.png'}
                   size={'huge'}
                   centered/>
            <Input className={'searchInput'}
                   size='large'
                   icon='search'
                   placeholder='Search...'
                   onChange={this.handleInputChange}
                   onKeyDown={ this.pressEnter }/>
          </Container>
          <Container>
            <Divider hidden/>
            <Header as={'h2'}>New Listings</Header>
            <Segment><Grid columns={5}>
              <Grid.Column>
                <Image src={'http://clipart-library.com/img/2008785.jpg'}
                       size={'small'}/>
              </Grid.Column>
              <Grid.Column>
                <Image src={'http://clipart-library.com/img/2008785.jpg'}
                       size={'small'}/>
              </Grid.Column>
              <Grid.Column>
                <Image src={'http://clipart-library.com/img/2008785.jpg'}
                       size={'small'}/>
              </Grid.Column>
              <Grid.Column>
                <Image src={'http://clipart-library.com/img/2008785.jpg'}
                       size={'small'}/>
              </Grid.Column>
              <Grid.Column textAlign={'center'}
                           verticalAlign={'middle'}
                           as={NavLink}
                           exact
                           to={'/list'}>
                <Header as="h2"
                        content={'SEE ALL'}/>
              </Grid.Column>
            </Grid>
            </Segment>
          </Container>
          <Divider hidden/>
          <Container>
            <Divider hidden/>
            <Header as={'h2'}>POPULAR</Header>
            <Segment><Grid columns={5}>
              <Grid.Column>
                <Image src={'http://clipart-library.com/img/2008785.jpg'}
                       size={'small'}/>
              </Grid.Column>
              <Grid.Column>
                <Image src={'http://clipart-library.com/img/2008785.jpg'}
                       size={'small'}/>
              </Grid.Column>
              <Grid.Column>
                <Image src={'http://clipart-library.com/img/2008785.jpg'}
                       size={'small'}/>
              </Grid.Column>
              <Grid.Column>
                <Image src={'http://clipart-library.com/img/2008785.jpg'}
                       size={'small'}/>
              </Grid.Column>
              <Grid.Column textAlign={'center'}
                           verticalAlign={'middle'}
                           as={NavLink}
                           exact
                           to={'/list'}>
                <Header as="h2"
                        content={'SEE ALL'}/>
              </Grid.Column>
            </Grid>
            </Segment>
          </Container>
          <Divider hidden/>
        </div>
    );
  }
}
