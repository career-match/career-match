import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Company } from '../../api/company/Company';
import { Student } from '../../api/student/Student';
/* eslint-disable no-console */

function addCompany(data) {
  console.log(`  Adding: ${data.company} (${data.owner})`);
  const doc = data;
  doc._id = Accounts.findUserByEmail(data.owner).userId();
  Company.collection.insert(doc);
}

function addStudent(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  const doc = data;
  doc._id = Accounts.findUserByEmail(data.owner).userId();
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
