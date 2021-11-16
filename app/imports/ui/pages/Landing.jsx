import React from 'react';
import { Container, Header, Image, Grid } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div id="landing-page">
        <div className='landing-green-background'>
          <Container textAlign='center'>
            <Image src='/images/uhLogo.png' centered height="234"/>
            <Header style={{ paddingTop: '20px', color: 'white', fontSize: '36pt' }} as='h1'>
            Welcome to UH Career Match
            </Header>
            <Header style={{ paddingBottom: '20px', color: 'white' }} as='h3'>
            Companies can connect with UH Students for employment opportunities and Students can create profiles showing their interests.
            </Header>
          </Container>
        </div>
        <div className='landing-white-background'>
          <Header style={{ color: '#376551' }} as='h2' textAlign='center'>Publish your company and explore UH profiles... or Share your skills and match your interest with companies.</Header>
          <Grid container stackable columns='equal' textAlign='center'>
            <Grid.Column>
              <Image src="/images/companyhomepage-mockup.png"/>
            </Grid.Column>
            <Grid.Column>
              <Image src="/images/searchpage-mockup.png"/>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Landing;
