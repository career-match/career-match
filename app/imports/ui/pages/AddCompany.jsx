import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Company } from '../../api/company/Company';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  company: String,
  address: String,
  description: String,
  phone: String,
  image: String,
  interest: {
    type: String,
    allowedValues: ['css', 'design', 'html', 'ia', 'javascript', 'meteor', 'node', 'python', 'react', 'ruby', 'ui'],
    defaultValue: 'css',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddCompany extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { company, address, phone, description, interest, image } = data;
    const owner = Meteor.user().username;
    Company.collection.insert({ company, address, phone, description, interest, image, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Company</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='company'/>
              <TextField name='address'/>
              <TextField name='phone'/>
              <TextField name='image'/>
              <LongTextField name='description'/>
              <SelectField name='interest'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddCompany;
