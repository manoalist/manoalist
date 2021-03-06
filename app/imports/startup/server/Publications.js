import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Items } from '../../api/item/Item';
import { Categories } from '../../api/category/Category';
import { User } from '../../api/user/User';
import { Contactus } from '../../api/mail/Contactus';
import { Ratings } from '../../api/ratings/Ratings';
import { Contacts } from '../../api/contacts/Contacts';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('User', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return User.find({ email: username });
  }
  return this.ready();
});


/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('UserAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return User.find();
  }
  return this.ready();
});

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Items', function publish() {
  if (this.userId) {
    return Items.find({});
  }
  return this.ready();
});

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Contacts', function publish() {
  if (this.userId) {
    return Contacts.find({});
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user. */
Meteor.publish('Categories', function publish() {
  return Categories.find();
});

/** This subscription publishes all documents regardless of user. */
Meteor.publish('Contactus', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Contactus.find({ recipient: 'admin' });
  }
  return this.ready();
});

Meteor.publish('Email', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Contactus.find({ recipient: username });
  }
  return this.ready();
});

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Ratings', function publish() {
  if (this.userId) {
    return Ratings.find({});
  }
  return this.ready();
});
