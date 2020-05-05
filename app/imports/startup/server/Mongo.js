import { Meteor } from 'meteor/meteor';
import { Items } from '../../api/item/Item';
import { Categories } from '../../api/category/Category';
import { User } from '../../api/user/User';
import { Ratings } from '../../api/ratings/Ratings';
import { Contacts } from '../../api/contacts/Contacts';
// import { Contactus } from '../../api/mail/Contactus';

/* eslint-disable no-console */
/** Initialize the database with a default data document. */
function addUser(data) {
  console.log(`  Adding: ${data.email}`);
  User.insert(data);
}

/** Initialize the collection if empty. */
if (User.find().count() === 0) {
  if (Meteor.settings.defaultUsers) {
    console.log('Creating default data.');
    Meteor.settings.defaultUsers.map(data => addUser(data));
  }
}

/** Initialize the database with a default data document. */
function addItems(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Items.insert(data);
}

/** Initialize the database with a default data document. */
function addCategories(data) {
  console.log(`  Adding: ${data.group} (${data.name})`);
  Categories.insert(data);
}

/** Initialize the database with a default data document. */
// function addContactus(data) {
//   console.log(`  Adding: ${data.firstName} (${data.lastName})`);
//   Contactus.insert(data);
// }

/** Initialize the database with a default data document. */
function addRatings(data) {
  console.log(`  Adding: ${data.rating}`);
  Ratings.insert(data);
}

/** Initialize the database with a default data document. */
function addContacts(data) {
  Contacts.insert(data);
}

/** Initialize the collection if empty. */
if (Ratings.find().count() === 0) {
  if (Meteor.settings.defaultRatings) {
    console.log('Creating default ratings.');
    Meteor.settings.defaultRatings.map(data => addRatings(data));
  }
}

/** Initialize the collection if empty. */
if (Contacts.find().count() === 0) {
  if (Meteor.settings.defaultRatings) {
    console.log('Creating default contacts.');
    Meteor.settings.defaultContacts.map(data => addContacts(data));
  }
}

/** Load Assets File. */
if (Meteor.settings.loadAssetsFile) {
  const assetsFileName = 'data.json';
  console.log(`Loading data from private/${assetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  if (Items.find().count() === 0) {
    jsonData.defaultItems.map(data => addItems(data));
  }
  if (Categories.find().count() === 0) {
    jsonData.defaultCategory.map(data => addCategories(data));
  }
  // if (Contactus.find().count() === 0) {
  //   jsonData.defaultContactus.map(data => addContactus(data));
  // }
}
