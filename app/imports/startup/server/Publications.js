import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Company } from '../../api/company/Company';
import { Student } from '../../api/student/Student';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Student.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Student.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Company.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Company.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Company.studentPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'student')) {
    return Company.collection.find();
  }
  return this.ready();
});

Meteor.publish(Student.recruiterPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'recruiter')) {
    return Student.collection.find();
  }
  return this.ready();
});

Meteor.publish(Student.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Student.collection.find();
  }
  return this.ready();
});

Meteor.publish(Company.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Company.collection.find();
  }
  return this.ready();
});

Meteor.publish(Company.recruiterPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'recruiter')) {
    return Company.collection.find();
  }
  return this.ready();
});

Meteor.publish(Student.studentPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'student')) {
    return Student.collection.find();
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
