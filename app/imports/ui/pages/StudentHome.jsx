import React from 'react';
import { Button, Grid } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Grid id='student-home-page' textAlign='center' relaxed container>
        <Grid.Row>
          <h1>Welcome to Career Match</h1>
          <h2>As a student, Career Match will allow you to create and customize your own profile to help you match with companies. We work with many businesses and corporations locally and out of state to help find the job that is right for you.</h2>
        </Grid.Row>
        <Grid.Row>
          <h1>Getting Started</h1>
        </Grid.Row>
        <Grid.Row>
          <h4> Create a profile where you can add your interests, skills, location, and a link to your portfolio for companies to view.</h4>
        </Grid.Row>
        <Grid.Row>
          <Button id='student-edit-profile-button' color='#00502F' attached='bottom' as='a' href='#/edit/:_id'>Create/Edit Profile</Button>
        </Grid.Row>
        <Grid.Row>
          <h1>Browse Companies</h1>
        </Grid.Row>
        <Grid.Row>
          <h4>Search for companies that match your experience and interests</h4>
        </Grid.Row>
        <Grid.Row>
          <Button id='find-companies-button' color='#00502F' attached='bottom' as='a' href='#/companies'>Find Companies</Button>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Landing;
