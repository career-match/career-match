import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Card, Image, Button, Label, Header } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class CompanyItem extends React.Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Image floated='right' size='mini' src={this.props.company.image}/>
          <Card.Header>{this.props.company.name}</Card.Header>
          <Card.Description>
            {this.props.company.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {_.map(this.props.company.interests,
            (interest, index) => <Label key={index} size='tiny'>{interest}</Label>)}
        </Card.Content>
        <Card.Content extra>
          <Header as='h5'>Address</Header>
          {_.map(this.props.company.addresses, (addresses, index) => <Label key={index} size='tiny'>{addresses}</Label>)}
        </Card.Content>
        {/** Display the Edit link only if logged in as admin */
          Roles.userIsInRole(Meteor.userId(), 'admin') ||
          Roles.userIsInRole(Meteor.userId(), 'recruiter') ?
            (<Card.Content extra>
              <div className='ui two buttons'>
                <Button basic color='black'>
                  <Link to={`/edit-company-profile/${this.props.company._id}`}>Edit</Link>
                </Button>
              </div>
            </Card.Content>) : ''
        }
      </Card>
    );
  }
}

// Require a document to be passed to this component.
CompanyItem.propTypes = {
  company: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(CompanyItem);
