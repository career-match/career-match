import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Company } from '../../api/company/Company';
import CompanyItem from '../components/CompanyItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListCompanies extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">List Companies</Header>
        <Card.Group centered>
          {this.props.companies.map((company, index) => <CompanyItem
            key={index}
            company={company} />)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListCompanies.propTypes = {
  companies: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Company.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const companies = Company.collection.find({}).fetch();
  return {
    companies,
    ready,
  };
})(ListCompanies);
