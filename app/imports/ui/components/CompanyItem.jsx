import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

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
          <Card.Header>{this.props.company.company}</Card.Header>
          <Card.Meta>{this.props.company.address}</Card.Meta>
          <Card.Meta>{this.props.company.phone}</Card.Meta>
          <Card.Description>
            {this.props.company.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <p>Looking for students who are experienced in: {this.props.company.condition}</p>
        </Card.Content>
        <Card.Content extra>
          <Link to={`/edit/${this.props.company._id}`}>Edit</Link>
        </Card.Content>
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
