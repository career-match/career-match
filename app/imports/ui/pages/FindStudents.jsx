import React from 'react';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader, Image, Label, Segment } from 'semantic-ui-react';
import { AutoForm, SubmitField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { StudentInterest } from '../../api/student/StudentInterest';
import { StudentAddress } from '../../api/student/StudentAddress';
import { Addresses } from '../../api/address/Addresses';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { Interests } from '../../api/interests/Interests';
import { Student } from '../../api/student/Student';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allInterests) => new SimpleSchema({
  interest: { type: Array, label: 'Interest', optional: true },
  'interest.$': { type: String, allowedValues: allInterests },
});

function getStudentData(email) {
  const data = Student.collection.findOne({ email });
  const interests = _.pluck(StudentInterest.collection.find({ name: email }).fetch(), 'interest');
  const addresses = _.pluck(StudentAddress.collection.find({ name: email }).fetch(), 'address');
  return _.extend({}, data, { interests, addresses });
}

/** Component for layout out a Profile Card. */
const MakeCard = (props) => (
  <Card>
    <Card.Content>
      <Image floated='right' size='mini' src={props.student.image}/>
      <Card.Header>{props.student.name}</Card.Header>
      <Card.Description>
        <Header as='h5'>Contact Number</Header>
        {props.student.phone}
      </Card.Description>
      <Card.Description>
        {props.student.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Header as='h5'>Interests</Header>
      {_.map(props.student.interests,
        (interest, index) => <Label key={index} size='tiny'>{interest}</Label>)}
    </Card.Content>
    <Card.Content extra>
      <Header as='h5'>Address</Header>
      {_.map(props.student.addresses, (addresses, index) => <Label key={index} size='tiny'>{addresses}</Label>)}
    </Card.Content>
  </Card>
);

MakeCard.propTypes = {
  student: PropTypes.object.isRequired,
};

class FindStudents extends React.Component {

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
    const allInterestsofStudent = _.pluck(StudentInterest.collection.find().fetch(), 'interest');
    const allInterests = _.uniq(allInterestsofStudent);
    const formSchema = makeSchema(allInterests);
    const bridge = new SimpleSchema2Bridge(formSchema);
    const interestNames = _.pluck(StudentInterest.collection.find({ interest: { $in: this.state.interest } }).fetch(), 'name');
    const studentData = _.uniq(interestNames).map(name => getStudentData(name));
    const studentEmails = _.pluck(Student.collection.find().fetch(), 'email');
    const studentProfiles = studentEmails.map(name => getStudentData(name));
    return (
      <Container id="filter-page">
        <Header as="h2" textAlign="center">Find Students</Header>
        <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
          <Segment>
            <MultiSelectField id='interest' name='interest' showInlineError={true} placeholder={'Interest'}/>
            <SubmitField id='submit' value='Submit'/>
          </Segment>
        </AutoForm>
        <Card.Group style={{ paddingTop: '10px' }}>
          {_.map(studentData, (student, index) => <MakeCard key={index} student={student}/>)}
        </Card.Group>
        <Container id="find-students-page">
          <Header className="list-of-company-header" as="h2" textAlign="center"> List of Students</Header>
          <Card.Group centered>
            {_.map(studentProfiles, (student, index) => <MakeCard key={index} student={student}/>)}
          </Card.Group>
        </Container>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
FindStudents.propTypes = {
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Student.userPublicationName);
  const subscription2 = Meteor.subscribe(StudentAddress.userPublicationName);
  const subscription3 = Meteor.subscribe(StudentInterest.userPublicationName);
  const subscription4 = Meteor.subscribe(Addresses.userPublicationName);
  const subscription6 = Meteor.subscribe(Interests.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready() && subscription6.ready();
  // Get the Stuff documents
  const students = Student.collection.find({}).fetch();
  return {
    students,
    ready,
  };
})(FindStudents);
