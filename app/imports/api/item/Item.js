import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Items = new Mongo.Collection('Items');

/** Define a schema to specify the structure of each document in the collection. */
const ItemSchema = new SimpleSchema({
  categoryGroup: String,
  categoryName: String,
  picture: String,
  name: String,
  quantity: Number,
  price: Number,
  owner: String,
  ownerImage: String,
  buyer: { type: String, defaultValue: '' },
  description: String,
  createdAt: Date,
  forSale: Boolean,
  approvedForSale: Boolean,
  sold: Boolean,
  flagged: Boolean,
  reportReason: String,
  numberOfLike: { type: Number, defaultValue: 0 },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Items.attachSchema(ItemSchema);

/** Make the collection and schema available to other code. */
export { Items, ItemSchema };
