import React from 'react';
import { Comment, Segment, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Displays the user's average rating and comments */
class Ratings extends React.Component {
  render() {
    return (
        <Segment>
            <Rating icon='star' defaultRating={this.props.rating.rating} disabled={true}/>
            <Comment>
              <Comment.Author>
                {/* not sure if this is right */}
                {this.props.rating._id}
              </Comment.Author>
              <Comment.Text>
                {this.props.rating.comment}
              </Comment.Text>
            </Comment>
        </Segment>
    );
  }
}

Ratings.propTypes = {
  rating: PropTypes.object.isRequired,
};

export default withRouter(Ratings);
