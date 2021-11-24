import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Company } from '../../api/company/Company';
import { Student } from '../../api/student/Student';
/* eslint-disable no-console */

// Initialize the database with a default data document.
function addProfile(data) {
  console.log(`  Adding ${data.type} profile: ${data.name} (${data.owner})`);
  Profiles.collection.insert(data);
}

function addCompany(data) {
  console.log(`  Adding: ${data.company} (${data.owner})`);
  Company.collection.insert(data);
}

function addStudent(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Student.collection.insert(data);
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
