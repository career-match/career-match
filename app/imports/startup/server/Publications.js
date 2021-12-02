import { Meteor } from 'meteor/meteor';
import { Company } from '../../api/company/Company';
import { Student } from '../../api/student/Student';
import { CompanyAddress } from '../../api/company/CompanyAddress';
import { CompanyInterest } from '../../api/company/CompanyInterest';
import { Interests } from '../../api/interests/Interests';
import { Address } from '../../api/address/Address';
import { StudentAddress } from '../../api/student/StudentAddress';
import { StudentInterest } from '../../api/student/StudentInterest';

Meteor.publish(Interests.userPublicationName, () => Interests.collection.find());
Meteor.publish(Address.userPublicationName, () => Address.collection.find());
Meteor.publish(CompanyAddress.userPublicationName, () => CompanyAddress.collection.find());
Meteor.publish(CompanyInterest.userPublicationName, () => CompanyInterest.collection.find());
Meteor.publish(StudentAddress.userPublicationName, () => StudentAddress.collection.find());
Meteor.publish(StudentInterest.userPublicationName, () => StudentInterest.collection.find());
Meteor.publish(Company.userPublicationName, () => Company.collection.find());
Meteor.publish(Student.userPublicationName, () => Student.collection.find());

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
