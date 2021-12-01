import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Company } from '../../api/company/Company';
import { Student } from '../../api/student/Student';
import { Interests } from '../../api/interests/Interests';
import { Address } from '../../api/address/Address';
import { CompanyInterest } from '../../api/company/CompanyInterest';
import { CompanyAddress } from '../../api/company/CompanyAddress';
import { StudentInterest } from '../../api/student/StudentInterest';
import { StudentAddress } from '../../api/student/StudentAddress';

/* eslint-disable no-console */
function createUser(email, password, role) {
  console.log(`  Creating user ${email} as ${role} user.`);
  const userID = Accounts.createUser({ username: email, email, password: 'foo' });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
  if (role === 'recruiter') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'recruiter');
  }
  if (role === 'student') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'student');
  }
}
/** Define an interest.  Has no effect if interest already exists. */
function addInterest(interest) {
  Interests.collection.update({ name: interest }, { $set: { name: interest } }, { upsert: true });
}

/** Define an interest.  Has no effect if interest already exists. */
function addAddress(addresses) {
  Address.collection.update({ name: addresses }, { $set: { name: addresses } }, { upsert: true });
}

/** Defines a new user and associated profile. Error if user already exists. */
function addCompany({ name, address, phone, interests, description, image, role, email }) {
  console.log(`Defining company ${name}`);
  createUser(email, role);
  // Define the user in the Meteor accounts package.
  // Create the profile.
  Company.collection.insert({ name, address, phone, description, image, email });
  // Add interests and projects.
  interests.map(interest => CompanyInterest.collection.insert({ companies: email, interest }));
  address.map(addresses => CompanyAddress.collection.insert({ company: email, addresses }));
  // Make sure interests are defined in the Interests collection if they weren't already.
  interests.map(interest => addInterest(interest));
  address.map(addresses => addAddress(addresses));
}

/** Defines a new user and associated profile. Error if user already exists. */
function addStudent({ name, address, phone, interests, description, image, role, email }) {
  console.log(`Defining student ${email}`);
  createUser(email, role);
  // Define the user in the Meteor accounts package.
  // Create the profile.
  Student.collection.insert({ name, address, phone, description, image, email });
  // Add interests and projects.
  interests.map(interest => StudentInterest.collection.insert({ student: email, interest }));
  address.map(addresses => StudentAddress.collection.insert({ student: email, addresses }));
  // Make sure interests are defined in the Interests collection if they weren't already.
  interests.map(interest => addInterest(interest));
  address.map(addresses => addAddress(addresses));
}

/** Initialize DB if it appears to be empty (i.e. no users defined.) */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultCompany && Meteor.settings.defaultStudent) {
    console.log('Creating the default company');
    Meteor.settings.defaultCompany.map(company => addCompany(company));
    console.log('Creating the default student');
    Meteor.settings.defaultStudent.map(student => addStudent(student));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}

/**
 * If the loadAssetsFile field in settings.development.json is true, then load the data in private/data.json.
 * This approach allows you to initialize your system with large amounts of data.
 * Note that settings.development.json is limited to 64,000 characters.
 * We use the "Assets" capability in Meteor.
 * For more info on assets, see https://docs.meteor.com/api/assets.html
 * User count check is to make sure we don't load the file twice, which would generate errors due to duplicate info.
 */
if ((Meteor.settings.loadAssetsFile) && (Meteor.users.find().count() < 7)) {
  const assetsFileName = 'data.json';
  console.log(`Loading data from private/${assetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  jsonData.company.map(company => addCompany(company));
  jsonData.student.map(student => addStudent(student));
}
