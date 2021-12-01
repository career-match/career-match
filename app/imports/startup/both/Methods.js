import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Student } from '../../api/student/Student';
import { Company } from '../../api/company/Company';

const addRoleMethod = 'Roles.add';
const newAccount = 'Account.add';

const defaultStudent = { name: 'Name',
  address: 'Address',
  phone: 'Phone Number',
  description: 'Description',
  image: 'http://cdn.onlinewebfonts.com/svg/img_87237.svg',
  owner: '',
  interest: '' };
const defaultCompany = { name: 'Name',
  address: 'Address',
  phone: 'Phone Number',
  description: 'Description',
  image: 'http://cdn.onlinewebfonts.com/svg/img_87237.svg',
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
      defaultStudent._id = Meteor.userId();
      Student.collection.insert(defaultStudent);
    }
    if (role === 'company') {
      defaultCompany.owner = email;
      defaultCompany._id = Meteor.userId();
      Company.collection.insert(defaultCompany);
    }
  },
});

export { addRoleMethod, newAccount };
