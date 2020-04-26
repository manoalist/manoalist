import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Categories } from '../../api/category/Category';
import { User } from '../../api/user/User';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.insert(data);
}

/** Initialize the collection if empty. */
if (Stuffs.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

/** Initialize the database with a default data document. */
function addUser(data) {
  console.log(`  Adding: ${data.email}`);
  User.insert(data);
}

/** Initialize the collection if empty. */
if (User.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultUsers.map(data => addUser(data));
  }
}

/** Initialize the database with a default data document. */
function addCategories(data) {
  console.log(`  Adding: ${data.group} (${data.name})`);
  Categories.insert(data);
}

/** Initialize the collection if empty. */
if (Categories.find().count() === 0) {
  if (Meteor.settings.defaultCategory) {
    console.log('Creating default data.');
    Meteor.settings.defaultCategory.map(data => addCategories(data));
  }
}
