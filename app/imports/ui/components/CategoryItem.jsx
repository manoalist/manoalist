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
    const names = Categories.find({ group: this.props.group }).fetch();
    return (
        <Dropdown.Item>
          <a style={{ color: 'black' }} href={`#/list/${this.props.group}/null`}>{this.props.group}</a>
          <Dropdown>
            <Dropdown.Menu>
              {names.map((category) => <CategoryItemItem key={category._id} category={category}/>)}
            </Dropdown.Menu>
          </Dropdown>
        </Dropdown.Item>

    );
  }
}

/** Require a document to be passed to this component. */
CategoryItem.propTypes = {
  group: PropTypes.string.isRequired,
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
