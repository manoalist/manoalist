import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const User = new Mongo.Collection('Users');

/** Define a schema to specify the structure of each document in the collection. */
const UserSchema = new SimpleSchema({
  id: String, // Account id
  firstName: String,
  lastName: String,
  description: String,
  image: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
User.attachSchema(UserSchema);

/** Make the collection and schema available to other code. */
export { User, UserSchema };
