import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import CategoryItemItem from './CategoryItemItem';
import { Categories } from '../../api/category/Category';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class CategoryItem extends React.Component {
  render() {
    return (
          <Dropdown.Item>
        <Dropdown text={this.props.category.group} pointing={'left'}>
        <Dropdown.Menu>
          {this.props.categories.map((category) => <CategoryItemItem key={category._id} category={category} />)}
        </Dropdown.Menu>
        </Dropdown>
          </Dropdown.Item>

    );
  }
}

/** Require a document to be passed to this component. */
CategoryItem.propTypes = {
  category: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
};
const subscription = Meteor.subscribe('Categories');
/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const CategoryItemContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
  categories: Categories.find({}).fetch(),
  ready: subscription.ready(),
}))(CategoryItem);
/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(CategoryItemContainer);
