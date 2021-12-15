import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { addRoleMethod } from '../../startup/both/Methods';
import { Company } from '../../api/company/Company';
import { Student } from '../../api/student/Student';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /* Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { name: '', email: '', password: '', role: '', error: '', redirectToReferer: false };
  }

  /* Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  handleChange2 = (e, { value }) => {
    this.setState({ value });
    this.setState({ role: value });
  }

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { name, email, password, role } = this.state;
    Accounts.createUser({ email, username: email, password, role }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        Meteor.call(addRoleMethod, this.state);
        swal('You have registered successfully.');
        this.setState({ error: '', redirectToReferer: true });
      }
    });
    // Create a profile in the appropriate collection
    if (role === 'student') {
      console.log('created empty student profile');
      Student.collection.insert({ name, email, role });
    } else if (role === 'recruiter') {
      console.log('created empty company profile');
      Company.collection.insert({ name, email, role });
    }
  }

  /* Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <Container id="signup-page">
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Register your account
            </Header>
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Form.Input
                  label="Name"
                  id="signup-form-name"
                  icon="user"
                  iconPosition="left"
                  name="name"
                  type="name"
                  placeholder="Full Name"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Email"
                  id="signup-form-email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  id="signup-form-password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                />
                <Form.Group inline>
                  <label>Role</label>
                  <Form.Radio
                    label='Student'
                    name='role'
                    value='student'
                    checked={this.state.value === 'student'}
                    onChange={this.handleChange2}
                  />
                  <Form.Radio
                    label='Recruiter'
                    name='role'
                    value='recruiter'
                    checked={this.state.value === 'recruiter'}
                    onChange={this.handleChange2}
                  />
                </Form.Group>
                <Form.Button id="signup-form-submit" content="Submit"/>
              </Segment>
            </Form>
            <Message>
              Already have an account? Login <Link to="/signin">here</Link>
            </Message>
            {this.state.error === '' ? (
              ''
            ) : (
              <Message
                error
                header="Registration was not successful"
                content={this.state.error}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

/* Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
