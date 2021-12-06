import React from 'react';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { _ } from 'meteor/underscore';
import swal from 'sweetalert';
import { AutoForm, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import { Header, Loader, Form, Grid, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Addresses } from '../../api/address/Addresses';
import { Interests } from '../../api/interests/Interests';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { addStudentMethod } from '../../startup/both/Methods';
import { Student } from '../../api/student/Student';
import { StudentAddress } from '../../api/student/StudentAddress';
import { StudentInterest } from '../../api/student/StudentInterest';

const makeSchema = (allInterests, allAddresses) => new SimpleSchema({
  name: { type: String, label: 'Name', optional: true },
  phone: { type: String, label: 'Contact', optional: true },
  description: { type: String, label: 'Description', optional: true },
  image: { type: String, label: 'Image URL', optional: true },
  email: { type: String, label: 'Email', optional: true },
  interests: { type: Array, label: 'Interests', optional: true },
  'interests.$': { type: String, allowedValues: allInterests },
  addresses: { type: Array, label: 'Address', optional: true },
  'addresses.$': { type: String, allowedValues: allAddresses },
});

class AddStudentProfile extends React.Component {

  submit(data, formRef) {
    Meteor.call(addStudentMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Profile added successfully', 'success').then(() => formRef.reset());
      }
    });
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    let fRef = null;
    const allInterests = _.pluck(Interests.collection.find().fetch(), 'name');
    const allAddresses = _.pluck(Addresses.collection.find().fetch(), 'name');
    const formSchema = makeSchema(allInterests, allAddresses);
    const bridge = new SimpleSchema2Bridge(formSchema);
    return (
      <Grid container centered id="add-student-profile-page">
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Student Profile</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <Form.Group widths={'equal'}>
                <TextField id='name' name='name' showInlineError={true} placeholder={'Name'}/>
                <TextField name='email' showInlineError={true} placeholder={'email'}/>
              </Form.Group>
              <Form.Group widths={'equal'}>
                <TextField name='phone' showInlineError={true} placeholder={'Contact Number'}/>
              </Form.Group>
              <LongTextField id='description' name='description' placeholder='Description'/>
              <Form.Group widths={'equal'}>
                <TextField name='image' showInlineError={true} placeholder={'URL to image'}/>
              </Form.Group>
              <Form.Group widths={'equal'}>
                <MultiSelectField name='interests' showInlineError={true} placeholder={'Interests'}/>
                <MultiSelectField name='addresses' showInlineError={true} placeholder={'Addresses'}/>
              </Form.Group>
              <SubmitField id='home-page-submit' value='Update'/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require an array of Stuff documents in the props.
AddStudentProfile.propTypes = {
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
})(AddStudentProfile);
