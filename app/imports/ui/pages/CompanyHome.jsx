import React from 'react';
import { Grid, Button } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class CompanyHome extends React.Component {
  render() {
    return (
      <Grid id="company-home-page" textAlign='center' relaxed container>
        <Grid.Row>
          <h1>Welcome to Career Match</h1>
        </Grid.Row>
        <Grid.Row>
          <h2>Add Company</h2>
        </Grid.Row>
        <Grid.Row>
          <h4>Add your company to our Career Match.</h4>
        </Grid.Row>
        <Grid.Row>
          <Button attached='bottom'>Add Company</Button>
        </Grid.Row>
        <Grid.Row>
          <h2>Explore Users</h2>
        </Grid.Row>
        <Grid.Row>
          <h4>Search users who has experience and interests that your company&apos;s looking for.</h4>
        </Grid.Row>
        <Grid.Row>
          <Button attached='bottom'>Find People</Button>
        </Grid.Row>
      </Grid>
    );
  }
}

export default CompanyHome;
