import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Student } from '../../api/student/Student';
import { Company } from '../../api/company/Company';
import { CompanyInterest } from '../../api/company/CompanyInterest';
import { CompanyAddress } from '../../api/company/CompanyAddress';

const addRoleMethod = 'Roles.add';
const newAccount = 'Account.add';
const updateCompanyMethod = 'Company.update';

Meteor.methods({
  'Company.update'({ name, address, phone, interests, description, image, role, email }) {
    Company.collection.update({ email }, { $set: { name, address, phone, interests, description, image, email, role } });
    CompanyAddress.collection.remove({ name: email });
    CompanyInterest.collection.remove({ name: email });
    interests.map(interest => CompanyInterest.collection.insert({ name: email, interest }));
    address.map(addresses => CompanyAddress.collection.insert({ name: email, addresses }));
  },
});

const defaultStudent = { name: 'Enter name here',
  address: 'Enter address here',
  phone: 'Enter phone number here',
  description: 'Describe yourself here',
  image: 'Add a link to an image of you here',
  owner: '',
  interest: '' };
const defaultCompany = { name: 'Enter name here',
  address: 'Enter address here',
  phone: 'Enter phone number here',
  description: 'Describe your company here',
  image: 'Add a link to your company logo here',
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

export { addRoleMethod, newAccount, updateCompanyMethod };
