import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class CategoryItemItem extends React.Component {
  titleCase(str) {
    const res = str.toLowerCase().split(' ');
    for (let i = 0; i < res.length; i++) {
      res[i] = res[i].charAt(0).toUpperCase() + res[i].slice(1);
    }
    return res.join(' ');
  }

  render() {
    return (
    <Dropdown.Item as={NavLink} exact to={`/list/${this.props.category.group}/${this.props.category.name}`}>
      {this.titleCase(this.props.category.name)}</Dropdown.Item>
    );
  }
}

/** Require a document to be passed to this component. */
CategoryItemItem.propTypes = {
  category: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(CategoryItemItem);
