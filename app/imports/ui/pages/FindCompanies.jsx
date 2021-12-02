import React from 'react';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader, Image, Label, Segment } from 'semantic-ui-react';
import { AutoForm, SubmitField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Company } from '../../api/company/Company';
import { CompanyInterest } from '../../api/company/CompanyInterest';
import { CompanyAddress } from '../../api/company/CompanyAddress';
import { Address } from '../../api/address/Address';
import MultiSelectField from '../forms/controllers/MultiSelectField';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allInterests) => new SimpleSchema({
  interest: { type: Array, label: 'Interest', optional: true },
  'interest.$': { type: String, allowedValues: allInterests },
});

function getCompanyData(name) {
  const data = Company.collection.findOne({ name });
  console.log(data);
  const interests = _.pluck(CompanyInterest.collection.find({ name: name }).fetch(), 'interest');
  const addresses = _.pluck(CompanyAddress.collection.find({ name: name }).fetch(), 'addresses');
  return _.extend({ }, data, { interests, addresses });
}

/** Component for layout out a Profile Card. */
const MakeCard = (props) => (
  <Card>
    <Card.Content>
      <Image floated='right' size='mini' src={props.company.image} />
      <Card.Header>{props.company.name}</Card.Header>
      <Card.Description>
        {props.company.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      {_.map(props.company.interest,
        (interest, index) => <Label key={index} size='tiny'>{interest}</Label>)}
    </Card.Content>
    <Card.Content extra>
      <Header as='h5'>Address</Header>
      {_.map(props.company.addresses, (address, index) => <Image key={index} size='mini' src={address}/>)}
    </Card.Content>
  </Card>
);

MakeCard.propTypes = {
  company: PropTypes.object.isRequired,
};

class FindCompanies extends React.Component {

  constructor(props) {
    super(props);
    this.state = { interest: [] };
  }

  submit(data) {
    this.setState({ interest: data.interest || [] });
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const allInterests = _.pluck(CompanyInterest.collection.find().fetch(), 'interest');
    const formSchema = makeSchema(allInterests);
    const bridge = new SimpleSchema2Bridge(formSchema);
    const interestNames = _.pluck(CompanyInterest.collection.find({ interest: { $in: this.state.interest } }).fetch(), 'interest');
    const companyData = _.uniq(interestNames).map(name => getCompanyData(name));
    const companyData2 = _.filter(companyData, function (companyprofile) {
      console.log(companyprofile);
      return companyprofile.role === 'company';
    });
    return (
      <Container id="filter-page">
        <AutoForm schema={bridge} onSubmit={data => this.submit(data)} >
          <Segment>
            <MultiSelectField id='interest' name='interest' showInlineError={true} placeholder={'Interest'}/>
            <SubmitField id='submit' value='Submit'/>
          </Segment>
        </AutoForm>
        <Card.Group style={{ paddingTop: '10px' }}>
          {_.map(companyData2, (name, index) => <MakeCard key={index} name={name}/>)}
        </Card.Group>
        <Container id="find-students-page">
          <Header as="h2" textAlign="center">Find Companies</Header>
          <Card.Group centered>
            {this.props.companies.map((company, index) => <MakeCard
              key={index}
              company={company} />)}
          </Card.Group>
        </Container>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
FindCompanies.propTypes = {
  companies: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Company.userPublicationName);
  const subscription2 = Meteor.subscribe(CompanyAddress.userPublicationName);
  const subscription3 = Meteor.subscribe(CompanyInterest.userPublicationName);
  const subscription4 = Meteor.subscribe(Address.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready();
  // Get the Stuff documents
  const companies = Company.collection.find({}).fetch();
  return {
    companies,
    ready,
  };
})(FindCompanies);
