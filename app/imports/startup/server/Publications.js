import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Company } from '../../api/company/Company';
import { Student } from '../../api/student/Student';
import { CompanyAddress } from '../../api/company/CompanyAddress';
import { CompanyInterest } from '../../api/company/CompanyInterest';
import { Interest } from '../../api/interest/Interest';
import { Address } from '../../api/address/Address';
import { StudentAddress } from '../../api/student/StudentAddress';
import { StudentInterest } from '../../api/student/StudentInterest';

// Simplified Company publication.
// If logged in as student or admin, then publish all documents.
// Otherwise publish only profile owned by this user.
Meteor.publish(Company.userPublicationName, function () {
  if (this.userId) {
    if (Roles.userIsInRole(this.userId, 'student')
      || Roles.userIsInRole(this.userId, 'admin')) {
      return Company.collection.find();
    }
    const username = Meteor.users.findOne(this.userId).username;
    return Company.collection.find({ owner: username });
  }
  return this.ready();
});

// Simplified Student publication.
// If logged in as student or admin, then publish all documents.
// Otherwise publish only profile owned by this user.
Meteor.publish(Student.userPublicationName, function () {
  if (this.userId) {
    if (Roles.userIsInRole(this.userId, 'recruiter')
      || Roles.userIsInRole(this.userId, 'admin')) {
      return Student.collection.find();
    }
    const username = Meteor.users.findOne(this.userId).username;
    return Student.collection.find({ owner: username });
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

Meteor.publish(Interest.userPublicationName, () => Interest.collection.find());
Meteor.publish(Address.userPublicationName, () => Address.collection.find());
Meteor.publish(CompanyAddress.userPublicationName, () => CompanyAddress.collection.find());
Meteor.publish(CompanyInterest.userPublicationName, () => CompanyInterest.collection.find());
Meteor.publish(StudentAddress.userPublicationName, () => StudentAddress.collection.find());
Meteor.publish(StudentInterest.userPublicationName, () => StudentInterest.collection.find());
