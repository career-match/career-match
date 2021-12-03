import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Student } from '../../api/student/Student';
import { Company } from '../../api/company/Company';
import { CompanyInterest } from '../../api/company/CompanyInterest';
import { CompanyAddress } from '../../api/company/CompanyAddress';
import { StudentInterest } from '../../api/student/StudentInterest';
import { StudentAddress } from '../../api/student/StudentAddress';

const addRoleMethod = 'Roles.add';
const newAccount = 'Account.add';
const updateCompanyMethod = 'Company.update';
const updateStudentMethod = 'Student.update';

Meteor.methods({
  'Company.update'({ name, addresses, phone, interests, description, image, role, email }) {
    Company.collection.update({ email }, { $set: { name, addresses, phone, interests, description, image, email, role } });
    CompanyAddress.collection.remove({ name: email });
    CompanyInterest.collection.remove({ name: email });
    interests.map(interest => CompanyInterest.collection.insert({ name: email, interest }));
    addresses.map(address => CompanyAddress.collection.insert({ name: email, address }));
  },
});

Meteor.methods({
  'Student.update'({ name, addresses, phone, interests, description, image, role, email }) {
    Student.collection.update({ email }, { $set: { name, addresses, phone, interests, description, image, email, role } });
    StudentAddress.collection.remove({ name: email });
    StudentInterest.collection.remove({ name: email });
    interests.map(interest => StudentInterest.collection.insert({ name: email, interest }));
    addresses.map(address => StudentAddress.collection.insert({ name: email, address }));
  },
});

const defaultStudent = { name: 'Enter name here',
  phone: 'Enter phone number here',
  description: 'Describe yourself here',
  image: 'Add a link to an image of you here',
  address: '',
  owner: '',
  interest: '' };
const defaultCompany = { name: 'Enter name here',
  phone: 'Enter phone number here',
  description: 'Describe your company here',
  image: 'Add a link to your company logo here',
  address: '',
  owner: '',
  interest: '' };

Meteor.methods({
  'Roles.add'({ role }) {
    console.log(role);
    if (role === 'student') {
      Roles.createRole(role, { unlessExists: true });
      Roles.addUsersToRoles([Meteor.userId()], 'student', null);
    }
    if (role === 'company') {
      Roles.createRole(role, { unlessExists: true });
      Roles.addUsersToRoles([Meteor.userId()], 'recruiter', null);
    }
  },

  'Account.add'({ role, email }) {
    if (role === 'student') {
      defaultStudent.owner = email;
      Student.collection.insert(defaultStudent);
    }
    if (role === 'company') {
      defaultCompany.owner = email;
      Company.collection.insert(defaultCompany);
    }
  },
});

export { addRoleMethod, newAccount, updateCompanyMethod, updateStudentMethod };
