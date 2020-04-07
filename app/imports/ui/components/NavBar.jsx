import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Header, Icon, Dropdown } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px', background: '#024731' };
    return (
        <Menu style={menuStyle}
              attached="top"
              borderless
              inverted>
          {this.props.currentUser ? (
              <Menu.Item as={NavLink}
                         activeClassName=""
                         exact
                         to="/home">
                <Header inverted
                        as='h1'>manoalist</Header>
              </Menu.Item>
          ) : (
              <Menu.Item as={NavLink}
                         activeClassName=""
                         exact
                         to="/">
                <Header inverted
                        as='h1'>manoalist</Header>
              </Menu.Item>
          )}
          {this.props.currentUser ? (
              [<Menu.Item as={NavLink}
                          activeClassName="active"
                          exact
                          to="/add"
                          key='add'>Add Stuff</Menu.Item>,
                <Menu.Item as={NavLink}
                           activeClassName="active"
                           exact
                           to="/list/all"
                           key='list'>List Stuff</Menu.Item>]
          ) : ''}
          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Menu.Item as={NavLink}
                         activeClassName="active"
                         exact
                         to="/admin"
                         key='admin'>Admin</Menu.Item>
          ) : ''}

          {this.props.currentUser === '' ? (
              <Menu.Item position="right"
                         as={NavLink}
                         activeClassName="active"
                         exact
                         to="/signin">
                <Icon name={'user'}/>
                sign in
              </Menu.Item>) : (
              <Menu.Item position="right">
                <Dropdown pointing={'top right'} icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item text="Profile" icon={'user circle'} as={NavLink} exact to="/list"/>
                    <Dropdown.Item icon="sign out"
                                   text="Sign Out"
                                   as={NavLink}
                                   exact
                                   to="/signout"/>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
          )}

          <Menu.Item fitted>
            {this.props.currentUser === '' ? (
                <Menu.Item as={NavLink}
                           activeClassName="active"
                           exact
                           to="/signup">
                  <Icon name={'add user'}/>
                  sign up
                </Menu.Item>) : ('')}
          </Menu.Item>
        </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
