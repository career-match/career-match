import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Company } from '../../api/company/Company';
import { Student } from '../../api/student/Student';
/* eslint-disable no-console */

function addCompany(data) {
  const doc = data;
  doc._id = Accounts.findUserByUsername(data.owner)._id;
  console.log(`  Adding: ${data.name} (${data.owner}:${doc._id})`);
  Company.collection.insert(doc);
}

function addStudent(data) {
  const doc = data;
  doc._id = Accounts.findUserByUsername(data.owner)._id;
  console.log(`  Adding: ${data.name} (${data.owner}:${doc._id})`);
  Student.collection.insert(doc);
}

if (Company.collection.find().count() === 0) {
  if (Meteor.settings.defaultCompany) {
    console.log('Creating default company.');
    Meteor.settings.defaultCompany.map(data => addCompany(data));
  }
}

if (Student.collection.find().count() === 0) {
  if (Meteor.settings.defaultStudent) {
    console.log('Creating default student.');
    Meteor.settings.defaultStudent.map(data => addStudent(data));
  }
}
