import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/** Define a Mongo collection to hold the data. */
const Contactus = new Mongo.Collection('Contactus');

/** Define a schema to specify the structure of each document in the collection. */
const ContactusSchema = new SimpleSchema({
  name: String,
  subject: String,
  issueType: String,
  content: String,
  email: String,
  createdAt: Date,
  beRead: Boolean,
  recipient: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Contactus.attachSchema(ContactusSchema);

/** Make the collection and schema available to other code. */
export { Contactus, ContactusSchema };
