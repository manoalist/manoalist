import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Icon, Dropdown, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
import { Categories } from '../../api/category/Category';
import CategoryItem from './CategoryItem';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  getGroup(category, array) {
    const temp = category.group;
    let isInArray = false;
    for (let i = 0; i < array.length; i++) {
      if (array[i] === temp) {
        isInArray = true;
      }
    }
    if (!isInArray) {
      array.push(temp);
    }
    array.sort();
  }

  render() {
    const menuStyle = { marginBottom: '10px', background: '#024731' };
    const array = [];
    this.props.categories.map((category) => this.getGroup(category, array));
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
                <Image src={'/images/manoalist-white.png'} size={'small'}/>
              </Menu.Item>
          ) : (
              <Menu.Item as={NavLink}
                         activeClassName=""
                         exact
                         to="/">
                <Image src={'/images/manoalist-white.png'} size={'small'}/>
              </Menu.Item>
          )}
          {this.props.currentUser ? (
              [
                <Menu.Item position={'right'}
                           key={'shopping'}>
                  <Dropdown text={'Shopping'}
                            className={'link item'}
                            position={'right'}
                            key={'browse'}>
                    <Dropdown.Menu className={'firstMenu'}>
                      {array.map((group) => <CategoryItem key={array.indexOf(group)} group={group}/>)}
                    </Dropdown.Menu>

                  </Dropdown>
                </Menu.Item>,
                <Menu.Item as={NavLink}
                           activeClassName="active"
                           exact
                           to="/add"
                           key='add'>Sell</Menu.Item>]
          ) : ''}
          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Menu.Item as={NavLink}
                         activeClassName="active"
                         exact
                         to="/admin"
                         key='admin'>Admin</Menu.Item>
          ) : ''}

          {this.props.currentUser === '' ? (
              <Menu.Item position={'right'}
                         as={NavLink}
                         activeClassName="active"
                         exact
                         to="/signin">
                <Icon name={'user'}/>
                Sign In
              </Menu.Item>) : (
              <Menu.Item>
                <Dropdown pointing={'top right'}
                          icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item text="Profile"
                                   icon={'user circle'}
                                   as={NavLink}
                                   exact
                                   to="/profile"/>
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
                  Sign Up
                </Menu.Item>) : ('')}
          </Menu.Item>
        </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
  categories: PropTypes.array.isRequired,
};

const subscription = Meteor.subscribe('Categories');
/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
  categories: Categories.find({}).fetch(),
  ready: subscription.ready(),
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
