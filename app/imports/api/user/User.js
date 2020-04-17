import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const User = new Mongo.Collection('User');

/** Define a schema to specify the structure of each document in the collection. */
const UserSchema = new SimpleSchema({
  email: String, // Account id
  firstName: { type: String, defaultValue: '' },
  lastName: { type: String, defaultValue: '' },
  description: { type: String, defaultValue: '' },
  image: String,
  mobileNumber: { type: String, defaultValue: '' },
  carrier: { type: String, defaultValue: '' },
  isBanned: Boolean,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
User.attachSchema(UserSchema);

/** Make the collection and schema available to other code. */
export { User, UserSchema };
