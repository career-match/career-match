import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Card, Image } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StudentItem extends React.Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Image
            floated='left'
            size='small'
            src={this.props.student.image}
          />
          <Card.Header>{this.props.student.name}</Card.Header>
          <Card.Meta>{this.props.student.address}</Card.Meta>
          <Card.Meta>{this.props.student.phone}</Card.Meta>
          <Card.Description>
            {this.props.student.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <p>Have experienced in: {this.props.student.interest}</p>
        </Card.Content>
        {/** Display the Edit link only if logged in as admin */
          Roles.userIsInRole(Meteor.userId(), 'admin') ?
            (<Card.Content extra>
              <Link to={`/edit-student-profile/${this.props.student._id}`}>Edit</Link>
            </Card.Content>) : ''
        }
      </Card>
    );
  }
}

// Require a document to be passed to this component.
StudentItem.propTypes = {
  student: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(StudentItem);
