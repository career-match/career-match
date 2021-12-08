import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px', backgroundColor: '#00502F' };
    return (
      <Menu style={menuStyle} attached='top' borderless inverted>
        <Menu.Item id="navbar-landing" as={NavLink} activeClassName='' exact to='/'>
          <Header inverted as='h1'>Career Match</Header>
        </Menu.Item>
        {/** Display the Find Students link if logged in as a recruiter or admin */
          Roles.userIsInRole(Meteor.userId(), 'student') ?
            (<Menu.Item id="navbar-view-students-profile" as={NavLink} activeClassName="active" exact to="/view-students-profile">
              My Student Profile
            </Menu.Item>) : ''
        }
        {/** Display the Find Students link if logged in as a recruiter or admin */
          Roles.userIsInRole(Meteor.userId(), 'recruiter') ?
            (<Menu.Item id="navbar-view-companies-profile" as={NavLink} activeClassName="active" exact to="/view-companies-profile">
              My Company Profile
            </Menu.Item>) : ''
        }
        {/** Display the Find Companies link if logged in as a student or admin */
          Roles.userIsInRole(Meteor.userId(), 'student') ||
          Roles.userIsInRole(Meteor.userId(), 'admin') ?
            (<Menu.Item id="navbar-find-companies" as={NavLink} activeClassName="active" exact to="/find-companies">
              Find Companies
            </Menu.Item>) : ''
        }
        {/** Display the Find Students link if logged in as a recruiter or admin */
          Roles.userIsInRole(Meteor.userId(), 'recruiter') ||
          Roles.userIsInRole(Meteor.userId(), 'admin') ?
            (<Menu.Item id="navbar-find-students" as={NavLink} activeClassName="active" exact to="/find-students">
              Find Students
            </Menu.Item>) : ''
        }
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Dropdown id="login-dropdown" text="Login" pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

// Declare the types of all properties.
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
