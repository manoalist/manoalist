import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Items } from '../../api/item/Item';
import { Categories } from '../../api/category/Category';

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
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Categories.insert(data);
}

/** Initialize the collection if empty. */
if (Categories.find().count() === 0) {
  if (Meteor.settings.defaultCategory) {
    console.log('Creating default data.');
    Meteor.settings.defaultCategory.map(data => addCategories(data));
  }
}
