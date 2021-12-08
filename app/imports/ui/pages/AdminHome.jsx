import React from 'react';
import { Button, Grid } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Grid id="admin-home-page" textAlign='center' relaxed container>
        <Grid.Row>
          <h1>Welcome to Career Match</h1>
        </Grid.Row>
        <Grid.Row>
          <h2> Manage Student Profiles </h2>
        </Grid.Row>
        <Grid.Row>
          <Button id='find-students-button' attached='bottom' as='a' href='#/find-students'>Edit Students</Button>
        </Grid.Row>
        <Grid.Row>
          <h2>Manage Company Profiles</h2>
        </Grid.Row>
        <Grid.Row>
          <Button id='find-companies-button' attached='bottom' as='a' href='#/find-companies'>Edit Companies</Button>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Landing;
