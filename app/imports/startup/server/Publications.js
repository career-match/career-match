import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Profiles } from '../../api/profile/Profile';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Profiles.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Profiles.collection.find({ owner: username });
  }
  return this.ready();
});

// Student profile publication.
// Publish all student profiles.
Meteor.publish(Profiles.studentPublicationName, function () {
  return Profiles.collection.find({ type: 'student' });
});

// Company profile publication.
// Publish all company profiles.
Meteor.publish(Profiles.companyPublicationName, function () {
  return Profiles.collection.find({ type: 'company' });
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Profiles.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Profiles.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
