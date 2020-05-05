import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Contacts = new Mongo.Collection('Contacts');

/** Define a schema to specify the structure of each document in the collection. */
const ContactsSchema = new SimpleSchema({
  itemId: String,
  buyer: String,
  seller: String,
  contactDate: Date,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Contacts.attachSchema(ContactsSchema);

/** Make the collection and schema available to other code. */
export { Contacts, ContactsSchema };
