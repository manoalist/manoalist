import React from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class CategoryItem extends React.Component {
  render() {
    return (
        <Dropdown.Item text={this.props.category.group}>
          <Menu>
            <Menu.Item>
            {this.props.category.name}
            </Menu.Item>
          </Menu>
        </Dropdown.Item>
    );
  }
}

/** Require a document to be passed to this component. */
CategoryItem.propTypes = {
  category: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(CategoryItem);
