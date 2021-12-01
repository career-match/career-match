import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Button } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class CompanyHome extends React.Component {
  render() {
    return (
      <Grid id="company-home-page" textAlign='center' relaxed container>
        <Grid.Row>
          <h1>Welcome to Career Match</h1>
          <h2> As a recruiter, Career Match will allow you to create your company profile to help you match with students.</h2>
        </Grid.Row>
        <Grid.Row>
          <h2>Getting Started</h2>
        </Grid.Row>
        <Grid.Row>
          <h4>Create a profile where you can add your company&apos;s interests, skills, location, and a link to your portfolio for students to view.</h4>
        </Grid.Row>
        <Grid.Row>
          <Button id='edit-company-profile-button' attached='bottom' as='a' href={`/edit-company-profile/${Meteor.userId()}`}>Add/Edit Company</Button>
        </Grid.Row>
        <Grid.Row>
          <h2>Explore Users</h2>
        </Grid.Row>
        <Grid.Row>
          <h4>Search users who has experience and interests that your company&apos;s looking for.</h4>
        </Grid.Row>
        <Grid.Row>
          <Button attached='bottom' as='a' href='#/find-students'>Find Students</Button>
        </Grid.Row>
      </Grid>
    );
  }
}

export default CompanyHome;
