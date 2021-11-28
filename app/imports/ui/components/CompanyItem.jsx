import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Card, Image } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class CompanyItem extends React.Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Image
            floated='left'
            size='small'
            src={this.props.company.image}
          />
          <Card.Header>{this.props.company.name}</Card.Header>
          <Card.Meta>{this.props.company.address}</Card.Meta>
          <Card.Meta>{this.props.company.phone}</Card.Meta>
          <Card.Description>
            {this.props.company.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <p>Looking for students who are experienced in: {this.props.company.interest}</p>
        </Card.Content>
        {/** Display the Edit link only if logged in as admin */
          Roles.userIsInRole(Meteor.userId(), 'admin') ?
            (<Card.Content extra>
              <Link to={`/edit-company-profile/${this.props.company._id}`}>Edit</Link>
            </Card.Content>) : ''
        }
      </Card>
    );
  }
}

// Require a document to be passed to this component.
CompanyItem.propTypes = {
  company: PropTypes.shape({
    company: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string,
    _id: PropTypes.string,
    description: PropTypes.string,
    interest: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(CompanyItem);
