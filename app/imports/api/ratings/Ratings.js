import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Ratings = new Mongo.Collection('Ratings');

/** Define a schema to specify the structure of each document in the collection. */
const RatingSchema = new SimpleSchema({
  raterEmail: String,
  raterImage: String,
  target: String,
  rating: Number,
  comment: String,
  createdAt: Date,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Ratings.attachSchema(RatingSchema);

/** Make the collection and schema available to other code. */
export { Ratings, RatingSchema };
