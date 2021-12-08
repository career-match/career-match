import React from 'react';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { _ } from 'meteor/underscore';
import { Grid, Loader, Header, Segment, Form, Button, Confirm } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, SubmitField, TextField, LongTextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { updateStudentMethod } from '../../startup/both/Methods';
import { Interests } from '../../api/interests/Interests';
import { Addresses } from '../../api/address/Addresses';
import { Student } from '../../api/student/Student';
import { StudentAddress } from '../../api/student/StudentAddress';
import { StudentInterest } from '../../api/student/StudentInterest';
import { Company } from '../../api/company/Company';

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

/** Renders the Page for editing a single document. */
class EditStudentProfile extends React.Component {

  state = { open: false }

  open = () => this.setState({ open: true })

  close = () => this.setState({ open: false })

  submit(data) {
    Meteor.call(updateStudentMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Profile updated successfully', 'success');
      }
    });
  }

  delete() {
    Student.collection.remove(this.props.doc._id,
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Student deleted Successfully', 'success');
        }
      });
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    const email = Meteor.user().username;
    // Create the form schema for uniforms. Need to determine all interests and projects for muliselect list.
    const allInterests = _.pluck(Interests.collection.find().fetch(), 'name');
    const allAddresses = _.pluck(Addresses.collection.find().fetch(), 'name');
    const formSchema = makeSchema(allInterests, allAddresses);
    const bridge = new SimpleSchema2Bridge(formSchema);
    // Now create the model with all the user information.
    const interests = _.pluck(StudentInterest.collection.find({ name: email }).fetch(), 'interest');
    const addresses = _.pluck(StudentAddress.collection.find({ name: email }).fetch(), 'address');
    const company = Student.collection.findOne({ email });
    const model = _.extend({}, company, { interests, addresses });
    return (
      <Grid container centered id="edit-company-profile-page">
        <Grid.Column>
          <Header as="h2" textAlign="center">Edit Student Profile</Header>
          <AutoForm model={model} schema={bridge} onSubmit={data => this.submit(data)}>
            <Segment>
              <Form.Group widths={'equal'}>
                <TextField id='name' name='name' showInlineError={true} placeholder={'Name'}/>
                <TextField name='email' showInlineError={true} placeholder={'email'} disabled/>
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
                <MultiSelectField name='addresses' showInlineError={true} placeholder={'Address'}/>
              </Form.Group>
              <SubmitField id='home-page-submit' value='Update'/>
              <Button type="button" basic icon='trash' color='red' floated='right' onClick={this.open}/>
              <Confirm
                open={this.state.open}
                content='Do you want to delete your student profile?'
                onCancel={this.close}
                onConfirm={this.delete.bind(this)}
              />
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditStudentProfile.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const doc = Student.collection.findOne(documentId);
  const subscription = Meteor.subscribe(Student.userPublicationName);
  const subscription2 = Meteor.subscribe(StudentAddress.userPublicationName);
  const subscription3 = Meteor.subscribe(StudentInterest.userPublicationName);
  const subscription4 = Meteor.subscribe(Addresses.userPublicationName);
  const subscription6 = Meteor.subscribe(Interests.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready() && subscription6.ready();
  return {
    doc,
    ready,
  };
})(EditStudentProfile);
