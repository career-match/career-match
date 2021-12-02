import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Company } from '../../api/company/Company';
import { Student } from '../../api/student/Student';

/* eslint-disable no-console */

function createUser(email, password, role) {
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
  });
  console.log(`  Creating user ${email} as ${role} user. UserID: ${userID}.`);
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
  if (role === 'recruiter') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'recruiter');
    // Add default company profile if found
    const profile = Meteor.settings.defaultCompany.find((p) => email === p.owner);
    if (profile !== undefined) {
      profile._id = userID;
      Company.collection.insert(profile);
      console.log(`    Adding profile: ${profile.name} (${profile.owner}:${profile._id})`);
    }
  }
  if (role === 'student') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'student');
    // Add default student profile if found
    const profile = Meteor.settings.defaultStudent.find((p) => email === p.owner);
    if (profile !== undefined) {
      profile._id = userID;
      Student.collection.insert(profile);
      console.log(`    Adding profile: ${profile.name} (${profile.owner}:${profile._id})`);
    }
  }
}

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map(({ email, password, role }) => createUser(email, password, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
