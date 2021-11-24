import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Student } from '../../api/student/Student';
import StudentItem from '../components/StudentItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListStudents extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container id="list-students-page">
        <Header as="h2" textAlign="center">List Students</Header>
        <Card.Group centered>
          {this.props.students.map((student, index) => <StudentItem
            key={index}
            student={student} />)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListStudents.propTypes = {
  students: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Student.userPublicationName);
  const subscription2 = Meteor.subscribe(Student.adminPublicationName);
  const subscription3 = Meteor.subscribe(Student.recruiterPublicationName);
  const subscription4 = Meteor.subscribe(Student.studentPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready();
  // Get the Stuff documents
  const students = Student.collection.find({}).fetch();
  return {
    students,
    ready,
  };
})(ListStudents);
