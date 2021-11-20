import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profile/Profile';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListStudents extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">List Students</Header>
        <Card centered>
          <Card.Content>
            <Image
              floated='right'
              size='large'
              src={'https://www.eurocircuits.com/wp-content/uploads/Student-icon.jpg'}
            />
            <Card.Header>John Doe</Card.Header>
            <Card.Meta>1234 Aloha Way</Card.Meta>
            <Card.Description>
              Studied At University of Hawaii at Manoa.
            </Card.Description>
          </Card.Content>
        </Card>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListStudents.propTypes = {
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Profile documents
  const profiles = Profiles.collection.find({}).fetch();
  return {
    profiles,
    ready,
  };
})(ListStudents);
