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
        <div className='landing-white-background'>
          <Header style={{ color: '#376551' }} as='h2' textAlign='center'>First, Register your account by either signing up as a Student or a Company.</Header>
          <Grid container stackable columns='equal' textAlign='center'>
            <Grid.Column>
              <Image src="/images/sign-upPageS.png"/>
              <Image src="/images/sign-upPageC.png"/>
            </Grid.Column>
          </Grid>
        </div>
        <div className='landing-white-background'>
          <Header style={{ color: '#376551' }} as='h2' textAlign='center'>As a Student, you can create and edit your profile from the student homepage. You will then be directed to the edit page, where you can store your information. </Header>
          <Grid container stackable columns='equal' textAlign='center'>
            <Grid.Column>
              <Image src="/images/studentLand.png"/>
              <Image src="/images/addStudentProfile.png"/>
            </Grid.Column>
          </Grid>
        </div>
        <div className='landing-white-background'>
          <Header style={{ color: '#376551' }} as='h2' textAlign='center'>As a Company, you can also create and edit your profile from the Company homepage. You will then be directed to the edit page, where you can store your information. </Header>
          <Grid container stackable columns='equal' textAlign='center'>
            <Grid.Column>
              <Image src="/images/compLand.png"/>
              <Image src="/images/addComp.png"/>
            </Grid.Column>
          </Grid>
        </div>
        <div className='landing-white-background'>
          <Header style={{ color: '#376551' }} as='h2' textAlign='center'>As a Student, you can find companies using the Find Companies button in the top menu. There, Students can filter their search results by their interests. </Header>
          <Grid container stackable columns='equal' textAlign='center'>
            <Grid.Column>
              <Image src="/images/findComp.png"/>
              <Image src="/images/findCompFilter.png"/>
            </Grid.Column>
          </Grid>
        </div>
        <div className='landing-white-background'>
          <Header style={{ color: '#376551' }} as='h2' textAlign='center'>Similar, Companies have the ability to search for students using the
            Find Students button in the top menu. There Companies can also filter students based on interests.</Header>
          <Grid container stackable columns='equal' textAlign='center'>
            <Grid.Column>
              <Image src="/images/findStu.png"/>
              <Image src="/images/findStuFilter.png"/>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Landing;
