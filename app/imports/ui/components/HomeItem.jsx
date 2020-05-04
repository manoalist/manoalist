import React from 'react';
import { Image, Grid, Container, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class HomeItem extends React.Component {
  render() {
    return (
        <Grid.Column textAlign={'center'}>
          <Link to={`/details/${this.props.item._id}`}>
            <Container style={{ height: '100px' }}>
              <Image centered
                    src={this.props.item.picture.split(',:;')[0]}
                    style={{ maxHeight: '100px' }}/>
            </Container>
            <Header as={'h4'}>{this.props.item.name}</Header>
          </Link>
        </Grid.Column>
    );
  }
}

/** Require a document to be passed to this component. */
HomeItem.propTypes = {
  item: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(HomeItem);
