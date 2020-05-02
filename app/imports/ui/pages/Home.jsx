import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Segment, Grid, Header, Input, Image, Divider, Loader } from 'semantic-ui-react';
import { NavLink, Redirect } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Items } from '../../api/item/Item';
import HomeItem from '../components/HomeItem';

class Home extends React.Component {
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
    return (this.props.ready) ? this.renderPage() :
        <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const newList = Items.find({}, { limit: 4, sort: { createdAt: -1 } }).fetch();
    const popularList = Items.find({}, { limit: 4, sort: { numberOfLike: -1 } }).fetch();
    if (this.state.directToList) {
      return <Redirect to={`/list/${this.state.searchWords}/search`}/>;
    }
    return (
        <div>
          <Container className={'topLanding'} fluid textAlign={'center'}
                     style={{ paddingTop: '25px', marginTop: '-10px' }}>
            <Image src={'/images/manoalist-circle.png'} size={'small'} centered/>
            <Input className={'searchInput'} size='large' icon='search' placeholder='Search...'
                   onChange={this.handleInputChange} onKeyDown={ this.pressEnter }
                   style={{ marginTop: '25px' }}/>
          </Container>
          <Container>
            <Divider hidden/>
            <Header as='h2'>New Listings</Header>
            <Segment><Grid columns={5}>
              {newList.map((item, index) => <HomeItem key={index} item={item}/>)}
              <Grid.Column textAlign={'center'} verticalAlign={'middle'} as={NavLink} exact to={'/list'}>
                <Header as="h2" content={'SEE ALL'}/>
              </Grid.Column>
            </Grid>
            </Segment>
          </Container>
          <Divider hidden/>
          <Container>
            <Divider hidden/>
            <Header as='h2'>POPULAR</Header>
            <Segment><Grid columns={5}>
              {popularList.map((item, index) => <HomeItem key={index} item={item}/>)}
              <Grid.Column textAlign={'center'} verticalAlign={'middle'} as={NavLink} exact to={'/list'}>
                <Header as="h2" content={'SEE ALL'}/>
              </Grid.Column>
            </Grid>
            </Segment>
          </Container>
          <Divider hidden/>
        </div>
    );
  }
}
Home.propTypes = {
  ready: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Items');
  return {
    items: Items.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Home);
