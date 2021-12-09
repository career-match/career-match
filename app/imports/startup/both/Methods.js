import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Student } from '../../api/student/Student';
import { Company } from '../../api/company/Company';
import { CompanyInterest } from '../../api/company/CompanyInterest';
import { CompanyAddress } from '../../api/company/CompanyAddress';
import { StudentInterest } from '../../api/student/StudentInterest';
import { StudentAddress } from '../../api/student/StudentAddress';

const addRoleMethod = 'Roles.add';
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

Meteor.methods({
  'Roles.add'({ role }) {
    console.log(role);
    if (role === 'student') {
      Roles.createRole(role, { unlessExists: true });
      Roles.addUsersToRoles([Meteor.userId()], 'student', null);
    }
    if (role === 'recruiter') {
      Roles.createRole(role, { unlessExists: true });
      Roles.addUsersToRoles([Meteor.userId()], 'recruiter', null);
    }
  },
});

const addCompanyMethod = 'Companies.add';

/** Creates a new project in the Projects collection, and also updates ProfilesProjects and ProjectsInterests. */
Meteor.methods({
  'Companies.add'({ name, addresses, phone, interests, description, image, role, email }) {
    Company.collection.insert({ name, phone, description, image, role, email });
    CompanyInterest.collection.remove({ name: email });
    CompanyAddress.collection.remove({ name: email });
    interests.map(interest => CompanyInterest.collection.insert({ name: email, interest }));
    addresses.map(address => CompanyAddress.collection.insert({ name: email, address }));
  },
});

const addStudentMethod = 'Students.add';

/** Creates a new project in the Projects collection, and also updates ProfilesProjects and ProjectsInterests. */
Meteor.methods({
  'Students.add'({ name, addresses, phone, interests, description, image, role, email }) {
    Student.collection.insert({ name, phone, description, image, role, email });
    StudentInterest.collection.remove({ name: email });
    StudentAddress.collection.remove({ name: email });
    interests.map(interest => StudentInterest.collection.insert({ name: email, interest }));
    addresses.map(address => StudentAddress.collection.insert({ name: email, address }));
  },
});

const deleteCompanyMethod = 'Company.delete';

/** Creates a new project in the Projects collection, and also updates ProfilesProjects and ProjectsInterests. */
Meteor.methods({
  'Company.delete'({ email }) {
    Company.collection.remove({ email: email });
    CompanyInterest.collection.remove({ name: email });
    CompanyAddress.collection.remove({ name: email });
  },
});

const deleteStudentMethod = 'Student.delete';

/** Creates a new project in the Projects collection, and also updates ProfilesProjects and ProjectsInterests. */
Meteor.methods({
  'Student.delete'({ email }) {
    Student.collection.remove({ email: email });
    StudentInterest.collection.remove({ name: email });
    StudentAddress.collection.remove({ name: email });
  },
});

export { addRoleMethod, updateCompanyMethod, updateStudentMethod, addCompanyMethod, addStudentMethod, deleteCompanyMethod, deleteStudentMethod };
