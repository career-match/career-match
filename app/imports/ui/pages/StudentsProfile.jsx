import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader, Image, Label, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Link } from 'react-router-dom';
import { Student } from '../../api/student/Student';
import { StudentInterest } from '../../api/student/StudentInterest';
import { StudentAddress } from '../../api/student/StudentAddress';
import { Addresses } from '../../api/address/Addresses';
import { Interests } from '../../api/interests/Interests';

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

class StudentsProfile extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const studentEmails = _.pluck(Student.collection.find().fetch(), 'email');
    const studentProfiles = studentEmails.map(name => getStudentData(name));
    return (
      <Container id="find-students-page">
        <Header as="h2" textAlign="center"> List of Students</Header>
        <div className='ui fluid buttons'>
          <Button size='large' basic color="green">
            <Link to={`/edit-student-profile/${studentEmails._id}`}>Edit Your Profile</Link>
          </Button>
        </div>
        <Card.Group centered>
          {_.map(studentProfiles, (student, index) => <MakeCard key={index} student={student}/>)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
StudentsProfile.propTypes = {
  students: PropTypes.array.isRequired,
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
})(StudentsProfile);
