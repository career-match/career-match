import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

const addRoleMethod = 'Roles.add';

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
});

export { addRoleMethod };
