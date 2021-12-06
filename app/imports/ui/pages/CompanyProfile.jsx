import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader, Image, Label, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Link } from 'react-router-dom';
import { Company } from '../../api/company/Company';
import { CompanyAddress } from '../../api/company/CompanyAddress';
import { CompanyInterest } from '../../api/company/CompanyInterest';
import { Addresses } from '../../api/address/Addresses';
import { Interests } from '../../api/interests/Interests';

function getCompanyData(email) {
  const data = Company.collection.findOne({ email });
  const interests = _.pluck(CompanyInterest.collection.find({ name: email }).fetch(), 'interest');
  const addresses = _.pluck(CompanyAddress.collection.find({ name: email }).fetch(), 'address');
  return _.extend({}, data, { interests, addresses });
}

/** Component for layout out a Profile Card. */
const MakeCard = (props) => (
  <Card>
    <Card.Content>
      <Image floated='right' size='mini' src={props.company.image}/>
      <Card.Header>{props.company.name}</Card.Header>
      <Card.Description>
        {props.company.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Header as='h5'>Interests</Header>
      {_.map(props.company.interests,
        (interest, index) => <Label key={index} size='tiny'>{interest}</Label>)}
    </Card.Content>
    <Card.Content extra>
      <Header as='h5'>Address</Header>
      {_.map(props.company.addresses, (addresses, index) => <Label key={index} size='tiny'>{addresses}</Label>)}
    </Card.Content>
  </Card>
);

MakeCard.propTypes = {
  company: PropTypes.object.isRequired,
};

class CompanyProfile extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const email = Meteor.user().username;
    const profileData = getCompanyData(email);
    return (
      <Container id="company-page">
        <Container id="company-profiles-page">
          <Card.Group centered>
            <div className='ui two buttons'>
              <Button basic color='black'>
                <Link className = 'edit link' to={`/edit-company-profile/${profileData._id}`}>Edit Your Company Profile</Link>
              </Button>
            </div>
            <MakeCard company={profileData}/>
          </Card.Group>
        </Container>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
CompanyProfile.propTypes = {
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Company.userPublicationName);
  const subscription2 = Meteor.subscribe(CompanyAddress.userPublicationName);
  const subscription3 = Meteor.subscribe(CompanyInterest.userPublicationName);
  const subscription4 = Meteor.subscribe(Addresses.userPublicationName);
  const subscription6 = Meteor.subscribe(Interests.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready() && subscription6.ready();
  // Get the Stuff documents
  return {
    ready,
  };
})(CompanyProfile);
