import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';

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
        <Card centered>
          <Card.Content>
            <Image
              floated='right'
              size='large'
              src={'https://yt3.ggpht.com/ytc/AKedOLQR6CdQxBvU0Ye8hUpCyMc6HMwoMivl_vad_YmjZg=s900-c-k-c0x00ffffff-no-rj'}
            />
            <Card.Header>Apple</Card.Header>
            <Card.Meta>One Apple Park Way, Cupertino, CA 95014</Card.Meta>
            <Card.Description>
              Apple Inc. designs, manufactures and markets smartphones, personal computers, tablets, wearables and accessories, and sells a variety of related services. The Companies products
              include iPhone, Mac, iPad, and Wearables, Home and Accessories. iPhone is the Companies line of smartphones based on its iOS operating system
            </Card.Description>
          </Card.Content>
        </Card>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListCompanies.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Stuffs.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const stuffs = Stuffs.collection.find({}).fetch();
  return {
    stuffs,
    ready,
  };
})(ListCompanies);
