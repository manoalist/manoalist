import { Meteor } from 'meteor/meteor';
import { Items } from '../../api/item/Item';
import { Categories } from '../../api/category/Category';
import { User } from '../../api/user/User';

/* eslint-disable no-console */
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
function addItems(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Items.insert(data);
}

/** Initialize the collection if empty. */
if (Items.find().count() === 0) {
  if (Meteor.settings.defaultItems) {
    console.log('Creating default items.');
    Meteor.settings.defaultItems.map(data => addItems(data));
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
