import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import ListCompanies from '../pages/ListCompanies';
import ListStudents from '../pages/ListStudents';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import Search from '../pages/Search';
import AdminHome from '../pages/AdminHome';
import CompanyHome from '../pages/CompanyHome';
import AddCompany from '../pages/AddCompany';
import AddStudent from '../pages/AddStudent';
import StudentHome from '../pages/StudentHome';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <Switch>
            <HomeRoute exact path="/" component={Landing}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/signout" component={Signout}/>
            <Route path="/search" component={Search}/>
            <RecruiterProtectedRoute path="/company" component={CompanyHome}/>
            <StudentProtectedRoute path="/student" component={StudentHome}/>
            <ProtectedRoute path="/companies" component={ListCompanies}/>
            <ProtectedRoute path="/students" component={ListStudents}/>
            <RecruiterProtectedRoute path="/addcompanies" component={AddCompany}/>
            <StudentProtectedRoute path="/addstudent" component={AddStudent}/>
            <AdminProtectedRoute path="/admin" component={AdminHome}/>
            <Route component={NotFound}/>
          </Switch>
          <Footer/>
        </div>
      </Router>
    );
  }
}

/**
 * HomeRoute
 * Checks for Meteor login to route to the appropriate home page.
 * @param {any} { component: Component, ...rest }
 */
const HomeRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      const isStudent = Roles.userIsInRole(Meteor.userId(), 'student');
      const isCompany = Roles.userIsInRole(Meteor.userId(), 'recruiter');
      if (isAdmin) return (<Redirect to={{ pathname: '/admin', state: { from: props.location } } }/>);
      if (isStudent) return (<Redirect to={{ pathname: '/student', state: { from: props.location } } }/>);
      if (isCompany) return (<Redirect to={{ pathname: '/company', state: { from: props.location } } }/>);
      return (<Component {...props} />);
    }}
  />
);

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
 * StudentProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and student role before routing to the requested page, otherwise goes to signin page.
 * Admin is also allowed access.
 * @param {any} { component: Component, ...rest }
 */
const StudentProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isStudent = Roles.userIsInRole(Meteor.userId(), 'student');
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      return (isLogged && (isStudent || isAdmin)) ?
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

const RecruiterProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isRecruiter = Roles.userIsInRole(Meteor.userId(), 'recruiter');
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      return (isLogged && (isRecruiter || isAdmin)) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

HomeRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each AdminProtectedRoute.
RecruiterProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

StudentProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
