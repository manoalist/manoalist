import React from 'react';
import { Comment, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Displays the user's average rating and comments */
class RatingItem extends React.Component {
  render() {
    return (
            <Comment>
              <Comment.Avatar as={'a'} src={this.props.rating.raterImage}/>
              <Comment.Content>
                <Rating icon='star' defaultRating={this.props.rating.rating} maxRating={5} disabled/>
                <Comment.Author>
                  {this.props.rating.raterEmail}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{this.props.rating.createdAt.toLocaleDateString('en-US')}</div>
                </Comment.Metadata>
                <Comment.Text>
                  {this.props.rating.comment}
                </Comment.Text>
              </Comment.Content>
            </Comment>
    );
  }
}

RatingItem.propTypes = {
  rating: PropTypes.object.isRequired,
};

export default withRouter(RatingItem);
