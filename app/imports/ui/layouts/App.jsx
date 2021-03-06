import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import AddItem from '../pages/AddItem';
import NotFound from '../pages/NotFound';
import Landing from '../pages/Landing';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import Categories from '../pages/Categories';
import ListItem from '../pages/ListItem';
import Signin from '../pages/Signin';
import Home from '../pages/Home';
import HomeAdmin from '../pages/HomeAdmin';
import Profile from '../pages/Profile';
import ItemPage from '../pages/ItemPage';
import Contact from '../pages/Contact';
import AddCategory from '../pages/AddCategory';
import EditUserInfo from '../pages/EditUserInfo';
import AboutUs from '../pages/AboutUs';
import EditItem from '../pages/EditItem';
import Terms from '../pages/Terms';
import ChangePsword from '../pages/ChangePsword';
import Inbox from '../pages/Inbox';
import Likes from '../pages/Likes';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
        <Router>
            <div style={{ flex: '1 0 auto' }}>
              <NavBar/>
              <Switch>
                <Route exact path="/" component={Landing}/>
                <Route path="/signin" component={Signin}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/changepsword" component={ChangePsword}/>
                <Route path="/contact" component={Contact}/>
                <Route path="/terms" component={Terms}/>
                <Route path="/about" component={AboutUs}/>
                <ProtectedRoute path="/list/:group/:name" component={ListItem}/>
                <ProtectedRoute path="/list" component={ListItem}/>
                <ProtectedRoute path="/add" component={AddItem}/>
                <ProtectedRoute path="/cate" component={Categories}/>
                <ProtectedRoute path="/home" component={Home}/>
                <ProtectedRoute path="/profile" component={Profile}/>
                <ProtectedRoute path="/details/:_id" component={ItemPage}/>
                <ProtectedRoute path="/edit/:_id" component={EditUserInfo}/>
                <ProtectedRoute path="/editItem/:_id/:group" component={EditItem}/>
                <ProtectedRoute path="/inbox" component={Inbox}/>
                <ProtectedRoute path="/likes" component={Likes}/>
                <AdminProtectedRoute path="/admin" component={HomeAdmin}/>
                <AdminProtectedRoute path="/addCate" component={AddCategory}/>
                <ProtectedRoute path="/signout" component={Signout}/>
                <Route component={NotFound}/>
              </Switch>
            </div>
            <Footer/>
        </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
          (<Component {...props} />) :
          (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
      );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
          return (isLogged && isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default App;
