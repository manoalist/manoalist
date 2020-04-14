import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class CategoryItemItem extends React.Component {
  render() {
    return (
    <Dropdown.Item>{this.props.category.name}</Dropdown.Item>

    );
  }
}

/** Require a document to be passed to this component. */
CategoryItemItem.propTypes = {
  category: PropTypes.object.isRequired,
  previous: PropTypes.string.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(CategoryItemItem);
